import Image from 'next/image'

export default function HeroSection() {
  return (
    <section className="relative mt-8 w-full overflow-hidden md:mt-6 lg:mt-4 xl:mt-0">
      <Image
        src="/hero.png"
        alt="Hero Section"
        width={1920}
        height={1080}
        className="h-auto w-full object-contain object-top"
        priority
      />
    </section>
  )
}
