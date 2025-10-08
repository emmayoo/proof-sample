'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import {
  GraduationCap,
  BookOpen,
  Type,
  X,
  ChevronDown,
  ChevronRight,
  Battery,
  Settings,
  LogOut,
} from 'lucide-react'

import { cn } from '@/lib/utils'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

const menuItems = [
  {
    icon: GraduationCap,
    label: '반 관리',
    href: '/main/class',
    submenu: [],
  },
  {
    icon: BookOpen,
    label: '숙제 관리',
    href: '/main/homework',
    submenu: [],
  },
  {
    icon: Type,
    label: '학습 도구',
    href: '/main/learning-tools',
    submenu: [{ label: '단어장', href: '/main/vocabulary' }],
  },
]

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<number[]>([])
  const pathname = usePathname()

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index],
    )
  }

  // 현재 경로에 따라 active 상태 결정
  const isItemActive = (item: (typeof menuItems)[0]) => {
    if (pathname === item.href) return true
    return item.submenu.some(subItem => pathname === subItem.href)
  }

  return (
    <>
      {/* 오버레이 */}
      {isOpen && <div className="bg-opacity-50 fixed inset-0 z-30 bg-black/50" onClick={onClose} />}

      <aside
        className={cn(
          'fixed top-0 left-0 z-40 flex h-full w-64 flex-col bg-gray-900 transition-transform duration-300 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        {/* 헤더 - 로고와 배터리 */}
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Image src="/puroo-logo.png" alt="PURDOO" width={32} height={32} />
          </div>
          <button
            onClick={onClose}
            className="rounded-md p-2 text-white transition-colors hover:bg-gray-800"
            aria-label="사이드바 닫기"
          >
            <X size={20} />
          </button>
        </div>

        {/* 사용자 정보 */}
        <div className="px-4 pb-4">
          <div className="text-sm text-white">000 매니저</div>
          <div className="text-sm text-white">xxx 학원</div>
        </div>

        {/* 구분선 */}
        <div className="mx-4 mb-4 border-b border-gray-700"></div>

        {/* 메뉴 아이템들 - 스크롤 가능한 영역 */}
        <div className="custom-scrollbar flex-1 overflow-y-auto px-4 py-2">
          <div className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon
              const isExpanded = expandedItems.includes(index)
              const hasSubmenu = item.submenu && item.submenu.length > 0
              const isActive = isItemActive(item)

              return (
                <div key={index}>
                  {/* 메인 메뉴 아이템 */}
                  {hasSubmenu ? (
                    <button
                      onClick={() => toggleExpanded(index)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-md px-2 py-3 text-left transition-colors',
                        isActive ? 'bg-white text-black' : 'text-white hover:bg-gray-800',
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className={cn(
                        'flex w-full items-center justify-between rounded-md px-2 py-3 text-left transition-colors',
                        isActive ? 'bg-white text-black' : 'text-white hover:bg-gray-800',
                      )}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon size={20} />
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </Link>
                  )}

                  {/* 서브메뉴 */}
                  {hasSubmenu && isExpanded && (
                    <div className="mt-1 ml-6 space-y-1">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          className={cn(
                            'block rounded-md px-2 py-2 text-sm transition-colors hover:bg-gray-800 hover:text-white',
                            pathname === subItem.href ? 'bg-gray-700 text-white' : 'text-gray-300',
                          )}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* 하단 버튼 영역 */}
        <div className="border-t border-gray-700 p-4">
          <div className="space-y-2">
            {/* 설정 버튼 */}
            <button className="flex w-full items-center space-x-3 rounded-md px-2 py-3 text-left text-white transition-colors hover:bg-gray-800">
              <Settings size={20} />
              <span className="font-medium">설정</span>
            </button>

            {/* 로그아웃 버튼 */}
            <button className="flex w-full items-center space-x-3 rounded-md px-2 py-3 text-left text-white transition-colors hover:bg-gray-800">
              <LogOut size={20} />
              <span className="font-medium">로그아웃</span>
            </button>
          </div>

          {/* 배터리 아이콘 */}
          <div className="mt-4 flex justify-end">
            <Battery size={20} className="text-white" />
          </div>
        </div>
      </aside>
    </>
  )
}
