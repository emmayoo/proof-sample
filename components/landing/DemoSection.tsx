'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function DemoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bubble1Ref = useRef<HTMLDivElement>(null)
  const bubble2Ref = useRef<HTMLDivElement>(null)
  const bubble3Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const ctx = gsap.context(() => {
      // 초기 상태: 모든 말풍선을 숨김
      gsap.set([bubble1Ref.current, bubble2Ref.current, bubble3Ref.current], {
        opacity: 0,
        scale: 0.8,
        y: 20,
      })

      gsap.to(bubble1Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(bubble2Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })

      gsap.to(bubble3Ref.current, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.2,
        ease: 'back.out(1.7)',
        delay: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={containerRef} className="relative w-full bg-[#254d3b] pb-48">
      <div className="relative mx-auto w-[73%]">
        <div className="relative mx-auto mb-8 rounded-2xl bg-white p-4 shadow-lg sm:p-6 md:p-8">
          <div className="relative mx-auto aspect-[4/3] w-3/4">
            <Image src="/demo_gif.png" alt="Demo" fill className="object-contain" />
          </div>
          {/* Korean speech bubbles */}
          <div className="absolute top-0 right-0 bottom-0 left-0 h-full w-full">
            <div
              ref={bubble1Ref}
              className="absolute top-32 -left-12 max-w-70 rounded-xl bg-[#fae867] p-3 lg:p-4"
            >
              <p className="font-rounded text-black xl:text-xl">첨삭하느라 밤새시나요?</p>
            </div>
            <div
              ref={bubble2Ref}
              className="absolute top-1/2 -right-18 max-w-60 rounded-xl bg-[#fae867] p-3 lg:p-4"
            >
              <p className="font-rounded font-bold text-black xl:text-xl">
                반복적인 피드백, 효율적으로 메뉴얼화 할 수 있는 방법은 없을까?
              </p>
            </div>
            <div
              ref={bubble3Ref}
              className="absolute -bottom-4 -left-4 max-w-70 rounded-xl bg-[#fae867] p-3 lg:p-4"
            >
              <p className="font-rounded text-black xl:text-xl">
                첨삭 도우미가 필요하신가요? 첨삭도 외주 자동화가 가능합니다.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom elements */}
        <div className="relative mt-16 w-1/2 translate-x-1/2">
          <div className="absolute left-1/2 z-20 w-fit -translate-x-1/2 rotate-3 transform rounded-xl bg-green-500 p-3">
            <p className="font-handwriting text-lg text-white xl:text-4xl">Keep writing</p>
          </div>
          <div className="absolute top-12 left-20 z-10 -rotate-8 transform rounded-xl bg-yellow-400 p-3">
            <Image
              src="/puroo-one-line.png"
              alt="RURDO Logo"
              width={100}
              height={32}
              className="object-contain sm:h-[40px] sm:w-[120px]"
            />
          </div>
          <div className="absolute top-20 left-40 -rotate-2 transform rounded-xl bg-red-400 p-3 sm:p-4">
            <p className="font-handwriting text-lg text-white xl:text-4xl">will make it better.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
