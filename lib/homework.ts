// 숙제 데이터 타입 정의
export interface Homework {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

// 날짜 포맷팅 유틸리티
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  return date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
