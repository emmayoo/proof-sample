'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { ArrowLeft, Save, Bold, Italic, List, ListOrdered, Quote } from 'lucide-react'

import { supabase } from '@/lib/supabaseClient'

export default function NewPostPage() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p></p>',
    immediatelyRender: false,
  })

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    const html = editor?.getHTML() || ''
    if (html === '<p></p>') {
      alert('내용을 입력해주세요.')
      return
    }

    setIsSubmitting(true)

    try {
      const { error } = await supabase.from('homeworks').insert([{ title, content: html }])
      if (error) {
        alert('오류: ' + error.message)
      } else {
        alert('저장되었습니다!')
        // 목록 페이지로 이동 (SSR로 최신 데이터 자동 로드)
        router.push('/main/homework')
      }
    } catch (error) {
      alert('저장 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (title.trim() || editor?.getHTML() !== '<p></p>') {
      if (confirm('작성 중인 내용이 있습니다. 정말 취소하시겠습니까?')) {
        router.push('/main/homework')
      }
    } else {
      router.push('/main/homework')
    }
  }

  return (
    <div className="mx-auto flex h-screen max-w-4xl flex-col p-6">
      {/* 헤더 */}
      <div className="mb-6 flex-shrink-0">
        <button
          onClick={handleCancel}
          className="mb-4 flex items-center font-medium text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          목록으로 돌아가기
        </button>
        <h1 className="text-2xl font-bold">새 숙제 추가</h1>
      </div>

      {/* 메인 폼 */}
      <div className="flex flex-1 flex-col rounded-lg border bg-white p-6 shadow-sm">
        <div className="flex flex-1 flex-col space-y-6">
          {/* 제목 입력 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              제목 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-3 text-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="숙제 제목을 입력하세요"
              disabled={isSubmitting}
            />
          </div>

          {/* 에디터 툴바 */}
          <div className="flex flex-1 flex-col">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              내용 <span className="text-red-500">*</span>
            </label>
            <div className="flex flex-1 flex-col overflow-hidden rounded-lg border border-gray-300">
              {/* 툴바 */}
              <div className="flex flex-shrink-0 items-center space-x-1 border-b border-gray-200 bg-gray-50 p-2">
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBold().run()}
                  className={`rounded p-2 hover:bg-gray-200 ${
                    editor?.isActive('bold') ? 'bg-gray-200' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  <Bold size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleItalic().run()}
                  className={`rounded p-2 hover:bg-gray-200 ${
                    editor?.isActive('italic') ? 'bg-gray-200' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  <Italic size={16} />
                </button>
                <div className="mx-1 h-6 w-px bg-gray-300" />
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleBulletList().run()}
                  className={`rounded p-2 hover:bg-gray-200 ${
                    editor?.isActive('bulletList') ? 'bg-gray-200' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  <List size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => editor?.chain().focus().toggleOrderedList().run()}
                  className={`rounded p-2 hover:bg-gray-200 ${
                    editor?.isActive('orderedList') ? 'bg-gray-200' : ''
                  }`}
                  disabled={isSubmitting}
                >
                  <ListOrdered size={16} />
                </button>
              </div>

              {/* 에디터 */}
              <div className="flex-1 overflow-auto p-4">
                <EditorContent
                  editor={editor}
                  className="ProseMirror prose prose-sm h-full max-w-none focus:outline-none [&_.ProseMirror]:min-h-full [&_.ProseMirror]:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex flex-shrink-0 justify-end space-x-3">
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span>취소</span>
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !title.trim()}
              className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />
              <span>{isSubmitting ? '저장 중...' : '저장'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
