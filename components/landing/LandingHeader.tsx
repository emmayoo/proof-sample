'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useRef } from 'react'

import { gsap } from 'gsap'
import { Menu, X, Globe } from 'lucide-react'

export default function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const buttonsRef = useRef<HTMLDivElement>(null)

  // 헤더 애니메이션 제거

  const closeMenu = () => {
    setIsMenuOpen(false)
    gsap.to('.mobile-menu', {
      x: '-100%',
      opacity: 0,
      duration: 0.3,
      ease: 'none',
    })
  }

  const toggleMenu = () => {
    if (!isMenuOpen) {
      setIsMenuOpen(true)
      // Menu opening animation
      gsap.fromTo(
        '.mobile-menu',
        {
          x: '-100%',
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.3,
          ease: 'none', // linear 애니메이션
        },
      )
    } else {
      closeMenu()
    }
  }

  const menuItems = [
    { name: 'Puroo 소개', href: '#about' },
    { name: '가격', href: '#pricing' },
    { name: '대시보드', href: '/main' },
  ]

  return (
    <>
      <header ref={headerRef} className="fixed top-0 right-0 left-0 z-50">
        <div className="absolute top-0 left-0 z-0 flex h-16 w-full items-center justify-between bg-white px-4 xl:hidden">
          <button
            onClick={toggleMenu}
            className="block text-gray-700 transition-colors duration-200 hover:text-[#254d3b] xl:hidden"
            aria-label="메뉴 토글"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        <div className="relative z-1 mx-auto w-[73%] bg-white xl:bg-transparent">
          <div className="flex h-16 items-center justify-between bg-white px-4">
            {/* Logo */}
            <div ref={logoRef} className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-2">
                <Image
                  src="/puroo-one-line.png"
                  alt="Puroo Logo"
                  width={120}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
            </div>

            {/* Desktop */}
            <div ref={buttonsRef} className="hidden items-center space-x-4 xl:flex">
              <nav ref={navRef} className="hidden items-center space-x-8 xl:flex">
                {menuItems.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="group relative font-bold text-[#254d3b]"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#254d3b] transition-all duration-300 group-hover:w-full"></span>
                  </Link>
                ))}
              </nav>
              <Link
                href="#contact"
                className="relative rounded-full bg-yellow-400 px-5 py-1.5 font-bold text-[#254d3b] transition-all duration-200 hover:bg-yellow-500"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 80%, 90% 100%, 0 100%)',
                }}
              >
                문의
              </Link>
              <Link
                href="/signin"
                className="rounded-full bg-[#254d3b] px-5 py-1.5 font-medium text-white transition-all duration-200 hover:bg-[#1e3a2f]"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="rounded-full bg-[#254d3b] px-5 py-1.5 font-medium text-white transition-all duration-200 hover:bg-[#1e3a2f]"
              >
                회원 가입
              </Link>
              <button className="flex h-8 w-8 items-center justify-center">
                <Globe size={16} />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center space-x-2 xl:hidden">
              <Link
                href="#contact"
                className="rounded-full bg-yellow-400 px-4 py-1.5 font-bold text-[#254d3b] transition-all duration-200 hover:bg-yellow-500"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 100% 80%, 90% 100%, 0 100%)',
                }}
              >
                문의
              </Link>
              <Link
                href="/signin"
                className="rounded-full bg-[#254d3b] px-4 py-1.5 font-bold text-white transition-all duration-200 hover:bg-[#1e3a2f]"
              >
                로그인
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className="mobile-menu fixed top-16 left-0 z-40 h-full w-80 bg-white shadow-xl xl:hidden"
        style={{ transform: 'translateX(-100%)', opacity: 0 }}
      >
        <div className="p-6">
          <nav className="space-y-4">
            {menuItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 font-medium text-gray-700 transition-colors duration-200 hover:text-[#254d3b]"
                onClick={closeMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="space-y-4 border-t border-gray-200 pt-4">
              <Link
                href="/signup"
                className="block rounded-full bg-[#254d3b] px-6 py-3 text-center font-medium text-white transition-all duration-200 hover:bg-[#1e3a2f]"
                onClick={closeMenu}
              >
                회원 가입
              </Link>
              <button
                className="flex w-full space-x-2 font-medium transition-all duration-200 hover:bg-[#254d3b] hover:text-white"
                onClick={closeMenu}
              >
                <Globe size={20} />
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-30 bg-black/20 xl:hidden" onClick={closeMenu} />
      )}
    </>
  )
}
