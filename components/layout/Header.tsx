'use client'

import { Menu, Search, User } from 'lucide-react'

interface HeaderProps {
  onMenuToggle: () => void
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-0 z-30 h-16">
      <div className="flex h-full items-center justify-between px-4">
        {/* 왼쪽: 메뉴 토글 */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="rounded-md p-2 transition-colors hover:bg-gray-100"
            aria-label="메뉴 토글"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* 오른쪽 */}
        <div className="flex items-center space-x-4">
          <Search className="h-6 w-6 text-gray-600" />
          <User className="h-6 w-6 text-gray-600" />
        </div>
      </div>
    </header>
  )
}
