import Link from 'next/link'

import { ArrowLeft, Calendar, FileText } from 'lucide-react'

import { supabase } from '@/lib/supabaseClient'

import SolutionSection from './SolutionSection'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function PostPage({ params }: PageProps) {
  const { id } = await params

  const { data: post, error } = await supabase.from('homeworks').select('*').eq('id', id).single()

  // 풀이 조회
  const { data: solution } = await supabase
    .from('homework_solutions')
    .select('*')
    .eq('homework_id', id)
    .single()

  if (error || !post) {
    return (
      <div className="mx-auto max-w-4xl p-6">
        <div className="py-12 text-center">
          <FileText size={48} className="mx-auto mb-4 text-gray-300" />
          <h2 className="mb-2 text-xl font-semibold text-gray-600">숙제를 찾을 수 없습니다</h2>
          <p className="mb-6 text-gray-500">요청하신 숙제가 존재하지 않거나 삭제되었습니다.</p>
          <Link
            href="/main/homework"
            className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl p-6">
      {/* 헤더 */}
      <div className="mb-6">
        <Link
          href="/main/homework"
          className="mb-4 inline-flex items-center font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로 돌아가기
        </Link>

        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h1 className="mb-2 text-3xl font-bold text-gray-900">{post.title}</h1>
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="mr-2 h-4 w-4" />
              {new Date(post.created_at).toLocaleDateString('ko-KR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="rounded-lg border bg-white p-8 shadow-sm">
        <div className="prose prose-lg max-w-none">
          <div
            className="leading-relaxed text-gray-800"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </div>

      {/* 풀이 섹션 */}
      <SolutionSection homeworkId={id} solution={solution} />
    </div>
  )
}
