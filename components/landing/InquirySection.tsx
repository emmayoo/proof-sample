'use client'

import { useEffect, useRef, useState } from 'react'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function InquirySection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    inquiryType: '',
    message: '',
  })

  const [charCount, setCharCount] = useState(0)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        scale: 0.9,
        duration: 1,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      })

      // Left column animation
      gsap.from(leftRef.current, {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: leftRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      })

      // Right column animation
      gsap.from(rightRef.current, {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rightRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))

    if (name === 'message') {
      setCharCount(value.length)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('문의하기 구현하기~')
    // 폼 제출 로직
    console.log('Form submitted:', formData)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 py-12"
    >
      {/* Enhanced background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,119,198,0.1),transparent_50%)]"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="mb-16 text-center">
          <h2
            ref={titleRef}
            className="mb-4 text-3xl font-black text-gray-900 md:text-4xl lg:text-5xl"
          >
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              문의하기
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-gray-700">
            Puroo에 대해 궁금한 점이 있으시거나 도입을 검토 중이시라면 언제든지 연락주세요.
            <br />
            전문 상담을 제공해드립니다.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Left Column - Contact Information */}
          <div ref={leftRef} className="space-y-8">
            <h3 className="mb-6 text-2xl font-bold text-gray-900">연락처 정보</h3>

            {/* Phone */}
            <div className="group flex items-start space-x-4 rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100 transition-transform group-hover:scale-110">
                <svg
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">전화 문의</h4>
                <p className="text-lg font-bold text-blue-600">02-1234-5678</p>
                <p className="text-sm text-gray-600">평일 09:00 - 18:00</p>
              </div>
            </div>

            {/* Email */}
            <div className="group flex items-start space-x-4 rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 transition-transform group-hover:scale-110">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">이메일 문의</h4>
                <p className="text-lg font-bold text-green-600">contact@puroo.ai</p>
                <p className="text-sm text-gray-600">24시간 접수 가능</p>
              </div>
            </div>

            {/* Address */}
            <div className="group flex items-start space-x-4 rounded-2xl bg-white/80 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-purple-100 transition-transform group-hover:scale-110">
                <svg
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div>
                <h4 className="mb-1 font-semibold text-gray-900">오피스 주소</h4>
                <p className="text-lg font-bold text-purple-600">서울특별시 강남구 테헤란로 123</p>
                <p className="text-sm text-gray-600">Puroo 빌딩 10층</p>
              </div>
            </div>

            {/* Academy Consultation */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20"></div>
              <div className="relative z-10">
                <h4 className="mb-3 text-xl font-bold">🏫 학원 도입 전용 상담</h4>
                <p className="mb-6 leading-relaxed text-purple-100">
                  학원 도입이나 대량 구매를 검토 중이시라면 전담 컨설턴트와 1:1 상담을 받아보세요.
                </p>
                <button className="group flex items-center space-x-2 rounded-xl bg-white px-6 py-3 font-semibold text-purple-600 transition-all duration-300 hover:scale-105 hover:bg-purple-50">
                  <svg
                    className="h-5 w-5 transition-transform group-hover:rotate-12"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span>학원 도입 상담 예약</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Inquiry Form */}
          <div ref={rightRef} className="space-y-6">
            <div className="rounded-3xl bg-white/90 p-8 shadow-2xl backdrop-blur-sm">
              <h3 className="mb-6 text-2xl font-bold text-gray-900">문의 양식</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="홍길동"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-300 hover:border-blue-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="example@email.com"
                    required
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-300 hover:border-blue-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Company */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    학원/회사명
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="ABC 영어학원"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-300 hover:border-blue-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">연락처</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="010-1234-5678"
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-300 hover:border-blue-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    문의 유형
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-all duration-300 hover:border-blue-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">문의 유형을 선택해주세요</option>
                    <option value="academy">학원 도입 문의</option>
                    <option value="individual">개인 사용 문의</option>
                    <option value="demo">데모 요청</option>
                    <option value="pricing">요금제 문의</option>
                    <option value="technical">기술 지원</option>
                    <option value="other">기타</option>
                  </select>
                </div>

                {/* Message */}
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="문의하실 내용을 자세히 적어주세요..."
                    rows={6}
                    maxLength={500}
                    required
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition-all duration-300 hover:border-blue-300 focus:border-transparent focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="mt-2 flex justify-end">
                    <span className="text-sm text-gray-500">{charCount}/500</span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="group w-full rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 text-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-purple-700 hover:shadow-2xl hover:shadow-blue-500/25"
                >
                  <span className="flex items-center justify-center space-x-2">
                    <svg
                      className="h-5 w-5 transition-transform group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span>문의 보내기</span>
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed right-6 bottom-6 z-50">
        <button className="group flex items-center space-x-3 rounded-full bg-blue-600 px-6 py-3 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-blue-700 hover:shadow-blue-500/25">
          <svg
            className="h-5 w-5 transition-transform group-hover:rotate-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <span className="font-semibold">Talk with Us</span>
        </button>
      </div>
    </section>
  )
}
