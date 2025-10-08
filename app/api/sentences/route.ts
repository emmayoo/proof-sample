import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/lib/supabaseClient'

// 문장 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const homeworkId = searchParams.get('homework_id')

    let query = supabase.from('sentences').select('*').order('created_at', { ascending: false })

    // homework_id가 있으면 해당 숙제의 문장만, 없으면 전체 문장 조회
    if (homeworkId) {
      query = query.eq('homework_id', homeworkId)
    }

    const { data, error } = await query

    if (error) {
      console.error('문장 조회 오류:', error)
      return NextResponse.json({ error: 'Failed to fetch sentences' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('문장 조회 중 오류:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// 문장 저장
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { homework_id, sentence, context } = body

    if (!homework_id || !sentence) {
      return NextResponse.json({ error: 'homework_id and sentence are required' }, { status: 400 })
    }

    // 중복 체크
    const { data: existingSentence } = await supabase
      .from('sentences')
      .select('id')
      .eq('homework_id', homework_id)
      .eq('sentence', sentence.trim())
      .single()

    if (existingSentence) {
      return NextResponse.json({ error: 'Sentence already exists' }, { status: 409 })
    }

    const { data, error } = await supabase
      .from('sentences')
      .insert([
        {
          homework_id,
          sentence: sentence.trim(),
          context: context || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('문장 저장 오류:', error)
      return NextResponse.json({ error: 'Failed to save sentence' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('문장 저장 중 오류:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// 문장 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error } = await supabase.from('sentences').delete().eq('id', id)

    if (error) {
      console.error('문장 삭제 오류:', error)
      return NextResponse.json({ error: 'Failed to delete sentence' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('문장 삭제 중 오류:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
