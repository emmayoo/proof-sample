'use client'

import { useState, useEffect } from 'react'

import { Trash2, BookOpen, Calendar } from 'lucide-react'

interface VocabularyItem {
  id: string
  word: string
  meaning: string | null
  context: string | null
  created_at: string
  homework_id: string
}

export default function VocabPage() {
  const [vocabList, setVocabList] = useState<VocabularyItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // 전체 단어장 데이터 불러오기
  useEffect(() => {
    const fetchAllVocab = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/vocabulary')
        if (response.ok) {
          const result = await response.json()
          setVocabList(result.data || [])
        } else {
          setError('단어장을 불러오는데 실패했습니다.')
        }
      } catch (error) {
        console.error('단어장 불러오기 오류:', error)
        setError('단어장을 불러오는데 실패했습니다.')
      } finally {
        setLoading(false)
      }
    }

    fetchAllVocab()
  }, [])

  // 단어 삭제
  const handleDeleteWord = async (id: string, word: string) => {
    if (!confirm(`"${word}"를 단어장에서 삭제하시겠습니까?`)) return

    try {
      const response = await fetch(`/api/vocabulary?id=${id}`, {
        method: 'DELETE',
      })
      if (response.ok) {
        setVocabList(prev => prev.filter(item => item.id !== id))
        alert('단어가 삭제되었습니다.')
      } else {
        alert('단어 삭제에 실패했습니다.')
      }
    } catch (error) {
      console.error('단어 삭제 오류:', error)
      alert('단어 삭제 중 오류가 발생했습니다.')
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-gray-600">단어장을 불러오는 중...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-4xl">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="mb-2 flex items-center space-x-3">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">전체 단어장</h1>
          </div>
          <p className="text-gray-600">
            총 <span className="font-semibold text-blue-600">{vocabList.length}개</span>의 단어가
            저장되어 있습니다.
          </p>
        </div>

        {/* 단어 목록 */}
        {vocabList.length > 0 ? (
          <div className="grid gap-4">
            {vocabList.map(item => (
              <div
                key={item.id}
                className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {/* 단어 */}
                    <div className="mb-2 flex items-center space-x-3">
                      <h3 className="text-xl font-bold text-gray-900">{item.word}</h3>
                      <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-500">
                        ID: {item.id.slice(0, 8)}...
                      </span>
                    </div>

                    {/* 의미 */}
                    {item.meaning && (
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-700">의미: </span>
                        <span className="text-gray-600">{item.meaning}</span>
                      </div>
                    )}

                    {/* 문맥 */}
                    {item.context && (
                      <div className="mb-3">
                        <span className="text-sm font-medium text-gray-700">문맥: </span>
                        <span className="text-gray-600 italic">"{item.context}"</span>
                      </div>
                    )}

                    {/* 추가 정보 */}
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>
                          {new Date(item.created_at).toLocaleDateString('ko-KR', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <div>숙제 ID: {item.homework_id}...</div>
                    </div>
                  </div>

                  {/* 삭제 버튼 */}
                  <button
                    onClick={() => handleDeleteWord(item.id, item.word)}
                    className="ml-4 rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50"
                    title="단어 삭제"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center">
            <BookOpen className="mx-auto mb-4 h-16 w-16 text-gray-300" />
            <h3 className="mb-2 text-lg font-medium text-gray-900">단어장이 비어있습니다</h3>
            <p className="text-gray-500">숙제 풀이에서 단어를 선택하여 단어장에 추가해보세요.</p>
          </div>
        )}
      </div>
    </div>
  )
}
