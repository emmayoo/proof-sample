'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth scroll reveal animation
      gsap.from(contentRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: contentRef.current,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play none none reverse',
        },
      })

      // Staggered button animation
      gsap.from(buttonRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        delay: 0.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: buttonRef.current,
          start: 'top 90%',
          end: 'bottom 10%',
          toggleActions: 'play none none reverse',
        },
      })

      // Features cards animation
      const featureCards = sectionRef.current?.querySelectorAll('.feature-card')
      if (featureCards) {
        gsap.from(featureCards, {
          y: 30,
          opacity: 0,
          scale: 0.95,
          duration: 0.6,
          stagger: 0.1,
          delay: 0.4,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: featureCards,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Trust indicators animation
      const trustItems = sectionRef.current?.querySelectorAll('.trust-item')
      if (trustItems) {
        gsap.from(trustItems, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          delay: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: trustItems,
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Add continuous floating animation to buttons
      const buttons = buttonRef.current?.children
      if (buttons) {
        Array.from(buttons).forEach((button, index) => {
          gsap.to(button, {
            y: -8,
            duration: 3 + index * 0.5,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: -1,
            delay: index * 0.4,
          })
        })
      }

      // Remove parallax effect to prevent gaps
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative overflow-hidden bg-[#254d3b] py-12">
      {/* Dynamic background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_50%,transparent_75%)] bg-[size:20px_20px]"></div>

      {/* Animated floating orbs */}
      <div className="absolute top-1/4 left-1/4 h-32 w-32 animate-pulse rounded-full bg-gradient-to-r from-white/10 to-white/5 blur-3xl"></div>
      <div className="absolute right-1/4 bottom-1/4 h-40 w-40 animate-pulse rounded-full bg-gradient-to-r from-white/8 to-white/3 blur-3xl delay-1000"></div>
      <div className="absolute top-1/2 right-1/3 h-24 w-24 animate-pulse rounded-full bg-gradient-to-r from-white/12 to-white/6 blur-2xl delay-500"></div>

      {/* Subtle moving gradient overlay */}
      <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-transparent via-white/5 to-transparent delay-700"></div>

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <div ref={contentRef}>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            지금 바로 시작해보세요
          </h2>
          <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-gray-300">
            AI와 선생님이 함께하는 영어 글쓰기 학습의 새로운 경험을 만나보세요.
            <br />
            학원이든 개인이든, 모두를 위한 맞춤형 솔루션을 제공합니다.
          </p>
        </div>

        {/* Features highlight */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="feature-card text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <svg
                className="h-8 w-8 text-white/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">무료 체험</h3>
            <p className="text-gray-400">신용카드 없이 바로 시작</p>
          </div>

          <div className="feature-card text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <svg
                className="h-8 w-8 text-white/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">즉시 시작</h3>
            <p className="text-gray-400">회원가입 후 바로 이용 가능</p>
          </div>

          <div className="feature-card text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm">
              <svg
                className="h-8 w-8 text-white/80"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h3 className="mb-2 text-lg font-semibold text-white">AI 첨삭</h3>
            <p className="text-gray-400">실시간 AI 피드백 제공</p>
          </div>
        </div>
      </div>
    </section>
  )
}
