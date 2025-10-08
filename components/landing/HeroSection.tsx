'use client'

import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Link from 'next/link'

gsap.registerPlugin(ScrollTrigger)

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const floatingRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero entrance animation with more playful effects
      const tl = gsap.timeline()

      // Title with bounce and rotation
      tl.from(titleRef.current, {
        y: 100,
        opacity: 0,
        rotation: -5,
        scale: 0.8,
        duration: 1.2,
        ease: 'back.out(1.7)',
      })
        .from(
          subtitleRef.current,
          {
            y: 50,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: 'elastic.out(1, 0.5)',
          },
          '-=0.5',
        )
        .from(
          ctaRef.current,
          {
            y: 30,
            opacity: 0,
            scale: 0.8,
            duration: 0.6,
            ease: 'bounce.out',
          },
          '-=0.3',
        )

      // More dynamic floating animations
      const floatingElements = floatingRef.current?.children
      if (floatingElements) {
        Array.from(floatingElements).forEach((element, index) => {
          gsap.to(element, {
            y: -30 + Math.random() * 20,
            x: -10 + Math.random() * 20,
            rotation: 360,
            duration: 4 + Math.random() * 2,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
            delay: index * 0.5,
          })
        })
      }

      // Remove parallax effect to prevent gaps

      // Add mouse movement parallax
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e
        const xPos = (clientX / window.innerWidth - 0.5) * 20
        const yPos = (clientY / window.innerHeight - 0.5) * 20

        gsap.to(floatingRef.current, {
          x: xPos,
          y: yPos,
          duration: 1,
          ease: 'power2.out',
        })
      }

      window.addEventListener('mousemove', handleMouseMove)

      return () => {
        window.removeEventListener('mousemove', handleMouseMove)
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={heroRef}
      className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Enhanced floating elements with animations */}
      <div ref={floatingRef} className="pointer-events-none absolute inset-0">
        <div className="absolute top-20 left-10 h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 opacity-30 blur-xl"></div>
        <div className="absolute top-40 right-20 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-purple-400 to-pink-400 opacity-25 blur-xl delay-300"></div>
        <div className="absolute bottom-40 left-1/4 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-green-400 to-emerald-400 opacity-30 blur-xl delay-700"></div>
        <div className="absolute right-1/3 bottom-20 h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 opacity-25 blur-xl delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-red-400 to-pink-400 opacity-20 blur-xl delay-500"></div>
        <div className="absolute top-1/3 right-1/4 h-8 w-8 animate-pulse rounded-full bg-gradient-to-br from-indigo-400 to-purple-400 opacity-30 blur-xl delay-200"></div>

        {/* Additional floating particles */}
        <div className="absolute top-1/4 right-1/5 h-6 w-6 animate-bounce rounded-full bg-gradient-to-br from-cyan-400 to-blue-400 opacity-40 blur-sm delay-400"></div>
        <div className="absolute bottom-1/3 left-1/5 h-4 w-4 animate-bounce rounded-full bg-gradient-to-br from-pink-400 to-purple-400 opacity-50 blur-sm delay-800"></div>
        <div className="absolute top-2/3 left-2/3 h-8 w-8 animate-bounce rounded-full bg-gradient-to-br from-emerald-400 to-green-400 opacity-35 blur-md delay-600"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-24 pb-52 text-center md:py-0 lg:px-8">
        <h1
          ref={titleRef}
          className="mb-6 text-4xl leading-tight font-black text-gray-900 md:text-6xl lg:text-7xl"
        >
          <span className="animate-pulse bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            AI와 선생님
          </span>
          이 함께하는
          <br />
          <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
            영어 글쓰기
          </span>{' '}
          학습 플랫폼
        </h1>

        <p
          ref={subtitleRef}
          className="mx-auto mb-8 max-w-4xl text-lg leading-relaxed text-gray-700 md:text-xl lg:text-2xl"
        >
          영어 작문 능력을 향상시킬 수 있는 플랫폼
        </p>

        <div ref={ctaRef} className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/main"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-bold text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              시작하기
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 transition-opacity group-hover:opacity-100"></div>
          </Link>
          <Link
            href="#contact"
            className="group relative overflow-hidden rounded-2xl border-2 border-purple-600 bg-white/80 px-8 py-4 text-lg font-bold text-purple-600 shadow-2xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-purple-50 hover:shadow-purple-500/25"
          >
            <span className="relative z-10 flex items-center gap-2">
              도입문의
              <span className="transition-transform group-hover:rotate-12">📧</span>
            </span>
          </Link>
        </div>

        {/* Fun scroll indicator */}
        <div className="mt-24">
          <div className="flex animate-bounce flex-col items-center gap-2">
            <div className="flex h-10 w-6 justify-center rounded-full border-2 border-purple-400 bg-white/20 backdrop-blur-sm">
              <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-gradient-to-b from-purple-400 to-pink-400"></div>
            </div>
            <div className="text-sm font-semibold text-gray-600">스크롤해서 더 보기</div>
          </div>
        </div>
      </div>
    </section>
  )
}
