import { NextRequest, NextResponse } from 'next/server'

import { supabase } from '@/lib/supabaseClient'

// 단어장 조회
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const homeworkId = searchParams.get('homework_id')

    let query = supabase.from('vocabularies').select('*').order('created_at', { ascending: false })

    // homework_id가 있으면 해당 숙제의 단어만, 없으면 전체 단어 조회
    if (homeworkId) {
      query = query.eq('homework_id', homeworkId)
    }

    const { data, error } = await query

    if (error) {
      console.error('단어장 조회 오류:', error)
      return NextResponse.json({ error: 'Failed to fetch vocabulary' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('단어장 조회 중 오류:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// 단어장에 단어 추가
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { homework_id, word, meaning, context } = body

    if (!homework_id || !word) {
      return NextResponse.json({ error: 'homework_id and word are required' }, { status: 400 })
    }

    // 중복 체크
    const { data: existingWord } = await supabase
      .from('vocabularies')
      .select('id')
      .eq('homework_id', homework_id)
      .eq('word', word.trim())
      .single()

    if (existingWord) {
      return NextResponse.json({ error: 'Word already exists in vocabulary' }, { status: 409 })
    }

    const { data, error } = await supabase
      .from('vocabularies')
      .insert([
        {
          homework_id,
          word: word.trim(),
          meaning: meaning || null,
          context: context || null,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('단어장 추가 오류:', error)
      return NextResponse.json({ error: 'Failed to add word to vocabulary' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('단어장 추가 중 오류:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// 단어장에서 단어 삭제
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'id is required' }, { status: 400 })
    }

    const { error } = await supabase.from('vocabularies').delete().eq('id', id)

    if (error) {
      console.error('단어장 삭제 오류:', error)
      return NextResponse.json({ error: 'Failed to delete word from vocabulary' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('단어장 삭제 중 오류:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
