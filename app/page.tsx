import { HeroSection } from './components/HeroSection'
import { Benefits } from './components/Benefits'
import { QuoteForm } from './components/QuoteForm'
import { Testimonials } from './components/Testimonials'
import { FAQ } from './components/FAQ'
import { Footer } from './components/Footer'

export default function Home() {
  return (
    <main className="min-h-full">
      <HeroSection />
      <Benefits />
      <Testimonials />
      <QuoteForm />
      <FAQ />
      <Footer />
    </main>
  )
}
