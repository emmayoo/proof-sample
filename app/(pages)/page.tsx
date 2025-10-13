import CTASection from '@/components/landing/CTASection'
import DemoSection from '@/components/landing/DemoSection'
import HeroSection from '@/components/landing/HeroSection'
import InquirySection from '@/components/landing/InquirySection'
import LandingHeader from '@/components/landing/LandingHeader'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <LandingHeader />
      <HeroSection />
      <DemoSection />
      <CTASection />
      <InquirySection />
    </div>
  )
}
