import CTASection from '@/components/landing/CTASection'
import HeroSection from '@/components/landing/HeroSection'
import InquirySection from '@/components/landing/InquirySection'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CTASection />
      <InquirySection />
    </div>
  )
}
