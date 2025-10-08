'use client'

import { useState, useEffect, useRef } from 'react'

import { useFloating, offset, flip, shift } from '@floating-ui/react'
import { Plus, Save, X } from 'lucide-react'

import { supabase } from '@/lib/supabaseClient'

interface Solution {
  id: string
  homework_id: string
  content: string
  created_at: string
  updated_at: string
}

interface SolutionSectionProps {
  homeworkId: string
  solution: Solution | null
}

export default function SolutionSection({ homeworkId, solution }: SolutionSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [content, setContent] = useState(solution?.content || '')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 단어장
  const [vocabList, setVocabList] = useState<
    Array<{
      id: string
      word: string
      meaning: string | null
      context: string | null
      created_at: string
    }>
  >([])

  // 저장된 문장
  const [sentenceList, setSentenceList] = useState<
    Array<{
      id: string
      sentence: string
      context: string | null
      created_at: string
    }>
  >([])

  const [selectedText, setSelectedText] = useState('')

  // Popper 상태
  const [showPopper, setShowPopper] = useState(false)

  const { refs, floatingStyles } = useFloating({
    placement: 'top',
    middleware: [offset(8), flip(), shift({ padding: 8 })],
  })

  const containerRef = useRef<HTMLDivElement>(null)

  // 단어장 및 저장된 문장 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 단어장 데이터 불러오기
        const vocabResponse = await fetch(`/api/vocabulary?homework_id=${homeworkId}`)
        if (vocabResponse.ok) {
          const vocabResult = await vocabResponse.json()
          setVocabList(vocabResult.data || [])
        }

        // 저장된 문장 데이터 불러오기
        const sentenceResponse = await fetch(`/api/sentences?homework_id=${homeworkId}`)
        if (sentenceResponse.ok) {
          const sentenceResult = await sentenceResponse.json()
          setSentenceList(sentenceResult.data || [])
        }
      } catch (error) {
        console.error('데이터 불러오기 오류:', error)
      }
    }

    fetchData()
  }, [homeworkId])

  // 선택 텍스트 감지 (풀이 영역에서만)
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed) {
        // 선택이 해제되었을 때만 popper 숨기기
        if (showPopper) {
          setSelectedText('')
          setShowPopper(false)
        }
        return
      }

      // 선택된 영역이 풀이 텍스트 영역 내부인지 확인
      const textContentElement = containerRef.current?.querySelector('.text-content')
      if (!textContentElement) return

      const range = selection.getRangeAt(0)
      const isWithinSolutionArea =
        textContentElement.contains(range.commonAncestorContainer) ||
        textContentElement.contains(range.startContainer) ||
        textContentElement.contains(range.endContainer)

      if (!isWithinSolutionArea) {
        // 풀이 영역 외부 선택 시 popper 숨기기
        if (showPopper) {
          setSelectedText('')
          setShowPopper(false)
        }
        return
      }

      const text = selection.toString().trim()
      if (!text) {
        setSelectedText('')
        setShowPopper(false)
        return
      }

      setSelectedText(text)

      const rect = range.getBoundingClientRect()

      const virtualElement = {
        getBoundingClientRect: () => rect,
      }

      refs.setPositionReference(virtualElement)
      setShowPopper(true)
    }

    // 모바일에서 기본 선택 메뉴 방지
    const handleContextMenu = (e: Event) => {
      e.preventDefault()
    }

    const textContentElement = containerRef.current?.querySelector('.text-content')
    if (textContentElement) {
      textContentElement.addEventListener('contextmenu', handleContextMenu)
    }

    document.addEventListener('selectionchange', handleSelection)
    return () => {
      document.removeEventListener('selectionchange', handleSelection)
      if (textContentElement) {
        textContentElement.removeEventListener('contextmenu', handleContextMenu)
      }
    }
  }, [showPopper, refs])

  const addToVocab = async () => {
    if (!selectedText.trim()) return

    const trimmedText = selectedText.trim()
    const wordCount = trimmedText.split(/\s+/).length

    // 단어 개수에 따라 단어장 또는 저장된 문장에 저장
    if (wordCount === 1) {
      // 단어 저장
      const isDuplicate = vocabList.some(item => item.word === trimmedText)
      if (isDuplicate) {
        alert('이미 단어장에 있는 단어입니다.')
        setSelectedText('')
        setShowPopper(false)
        window.getSelection()?.removeAllRanges()
        return
      }

      try {
        const response = await fetch('/api/vocabulary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            homework_id: homeworkId,
            word: trimmedText,
            context: solution?.content || null,
          }),
        })

        if (response.ok) {
          const result = await response.json()
          setVocabList(prev => [result.data, ...prev])
          alert(`단어 추가됨: "${trimmedText}"`)
        } else {
          const error = await response.json()
          if (response.status === 409) {
            alert('이미 단어장에 있는 단어입니다.')
          } else {
            alert(`단어 추가 실패: ${error.error}`)
          }
        }
      } catch (error) {
        console.error('단어 추가 오류:', error)
        alert('단어 추가 중 오류가 발생했습니다.')
      }
    } else {
      // 문장 저장
      const isDuplicate = sentenceList.some(item => item.sentence === trimmedText)
      if (isDuplicate) {
        alert('이미 저장된 문장에 있는 문장입니다.')
        setSelectedText('')
        setShowPopper(false)
        window.getSelection()?.removeAllRanges()
        return
      }

      try {
        const response = await fetch('/api/sentences', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            homework_id: homeworkId,
            sentence: trimmedText,
            context: solution?.content || null,
          }),
        })

        if (response.ok) {
          const result = await response.json()
          setSentenceList(prev => [result.data, ...prev])
          alert(`문장 추가됨: "${trimmedText}"`)
        } else {
          const error = await response.json()
          if (response.status === 409) {
            alert('이미 저장된 문장에 있는 문장입니다.')
          } else {
            alert(`문장 추가 실패: ${error.error}`)
          }
        }
      } catch (error) {
        console.error('문장 추가 오류:', error)
        alert('문장 추가 중 오류가 발생했습니다.')
      }
    }

    setSelectedText('')
    setShowPopper(false)
    window.getSelection()?.removeAllRanges()
  }

  const handleSave = async () => {
    if (!content.trim()) {
      alert('풀이 내용을 입력해주세요.')
      return
    }
    setIsSubmitting(true)
    try {
      if (solution) {
        const { error } = await supabase
          .from('homework_solutions')
          .update({ content: content.trim() })
          .eq('id', solution.id)
        if (error) throw error
      } else {
        const { error } = await supabase
          .from('homework_solutions')
          .insert([{ homework_id: homeworkId, content: content.trim() }])
        if (error) throw error
      }
      alert('풀이가 저장되었습니다!')
      setIsEditing(false)
      window.location.reload()
    } catch (error) {
      console.error('풀이 저장 중 오류:', error)
      alert('풀이 저장 중 오류가 발생했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    setContent(solution?.content || '')
    setIsEditing(false)
  }

  const handleEdit = () => setIsEditing(true)

  // 외부 클릭 감지 (풀이 영역 외부 클릭 시에만 선택 해제)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element

      // Popper 메뉴나 풀이 영역 내부 클릭이 아닌 경우에만 선택 해제
      if (
        showPopper &&
        !target.closest('[data-floating-ui-portal]') &&
        !containerRef.current?.contains(target)
      ) {
        setSelectedText('')
        setShowPopper(false)
        window.getSelection()?.removeAllRanges()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showPopper])

  return (
    <div ref={containerRef} className="relative mt-8 rounded-lg border bg-white p-6 shadow-sm">
      {isEditing ? (
        <>
          <h2 className="text-xl font-semibold text-gray-900">
            {solution ? '풀이 수정' : '풀이 작성'}
          </h2>
          <textarea
            value={content}
            onChange={e => setContent(e.target.value)}
            className="mt-4 h-64 w-full resize-none rounded-lg border border-gray-300 p-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="숙제 풀이를 작성해주세요..."
            disabled={isSubmitting}
          />
          <div className="mt-4 flex justify-end space-x-3">
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="flex items-center space-x-2 rounded-lg border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <X size={16} />
              <span>취소</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isSubmitting || !content.trim()}
              className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Save size={16} />
              <span>{isSubmitting ? '저장 중...' : '저장'}</span>
            </button>
          </div>
        </>
      ) : solution ? (
        <>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">풀이</h2>
            <button
              onClick={handleEdit}
              className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              <X size={16} />
              <span>수정</span>
            </button>
          </div>

          <div
            className="text-content rounded-lg bg-gray-50 p-4 leading-relaxed whitespace-pre-wrap text-gray-800"
            style={
              {
                WebkitUserSelect: 'text',
                userSelect: 'text',
                WebkitTouchCallout: 'none', // 모바일 기본 선택 메뉴 비활성화
                touchAction: 'manipulation',
                cursor: 'text',
              } as React.CSSProperties
            }
          >
            {solution.content}
          </div>

          {/* Popper 메뉴 */}
          {showPopper && (
            <div
              ref={refs.setFloating}
              style={{
                ...floatingStyles,
                background: 'white',
                border: '1px solid #e5e7eb',
                padding: '8px 12px',
                borderRadius: '8px',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                zIndex: 9999, // 모바일 기본 메뉴보다 높은 z-index
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '14px',
                color: '#374151',
              }}
              onMouseDown={e => e.preventDefault()}
              onClick={e => {
                e.preventDefault()
                e.stopPropagation()
                addToVocab()
              }}
            >
              {selectedText.trim().split(/\s+/).length === 1
                ? '📚 단어장에 추가'
                : '📄 저장된 문장에 추가'}
            </div>
          )}

          {/* 단어장 */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700">단어장 ({vocabList.length}개)</h3>
            {vocabList.length ? (
              <div className="mt-2 space-y-2">
                {vocabList.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg bg-gray-50 p-3"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{item.word}</div>
                      {item.meaning && <div className="text-sm text-gray-600">{item.meaning}</div>}
                      <div className="text-xs text-gray-500">
                        {new Date(item.created_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                    <button
                      onClick={async () => {
                        if (confirm(`"${item.word}"를 단어장에서 삭제하시겠습니까?`)) {
                          try {
                            const response = await fetch(`/api/vocabulary?id=${item.id}`, {
                              method: 'DELETE',
                            })
                            if (response.ok) {
                              setVocabList(prev => prev.filter(v => v.id !== item.id))
                              alert('단어가 삭제되었습니다.')
                            } else {
                              alert('단어 삭제에 실패했습니다.')
                            }
                          } catch (error) {
                            console.error('단어 삭제 오류:', error)
                            alert('단어 삭제 중 오류가 발생했습니다.')
                          }
                        }
                      }}
                      className="ml-2 rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-sm text-gray-500">선택된 단어를 단어장에 추가하세요.</p>
            )}
          </div>

          {/* 저장된 문장 */}
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700">
              저장된 문장 ({sentenceList.length}개)
            </h3>
            {sentenceList.length ? (
              <div className="mt-2 space-y-2">
                {sentenceList.map(item => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between rounded-lg bg-blue-50 p-3"
                  >
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 italic">"{item.sentence}"</div>
                      <div className="text-xs text-gray-500">
                        {new Date(item.created_at).toLocaleDateString('ko-KR')}
                      </div>
                    </div>
                    <button
                      onClick={async () => {
                        if (confirm(`"${item.sentence}"를 저장된 문장에서 삭제하시겠습니까?`)) {
                          try {
                            const response = await fetch(`/api/sentences?id=${item.id}`, {
                              method: 'DELETE',
                            })
                            if (response.ok) {
                              setSentenceList(prev => prev.filter(s => s.id !== item.id))
                              alert('문장이 삭제되었습니다.')
                            } else {
                              alert('문장 삭제에 실패했습니다.')
                            }
                          } catch (error) {
                            console.error('문장 삭제 오류:', error)
                            alert('문장 삭제 중 오류가 발생했습니다.')
                          }
                        }
                      }}
                      className="ml-2 rounded bg-red-100 px-2 py-1 text-xs text-red-600 hover:bg-red-200"
                    >
                      삭제
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-1 text-sm text-gray-500">선택된 문장을 저장된 문장에 추가하세요.</p>
            )}
          </div>
        </>
      ) : (
        <div className="py-8 text-center text-gray-500">
          <p className="text-lg">아직 작성된 풀이가 없습니다.</p>
          <button
            onClick={handleEdit}
            className="mt-2 flex items-center justify-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Plus size={16} />
            <span>풀이 추가</span>
          </button>
        </div>
      )}
    </div>
  )
}
