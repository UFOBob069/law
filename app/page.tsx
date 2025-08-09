import { HeroSection } from './components/HeroSection'
import { TrustIndicators } from './components/TrustIndicators'
import { InjuryForm } from './components/InjuryForm'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-full">
      <HeroSection />
      <TrustIndicators />
      <InjuryForm />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  )
}
