import { useCallback, useState } from 'react'
import { AppProvider } from './context/AppContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Gallery from './components/Gallery'
import BeforeAfter from './components/BeforeAfter'
import Team from './components/Team'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  // Datos que se pre-rellenan en el formulario al pulsar "Reservar" en otra sección
  const [booking, setBooking] = useState({ service: '', specialist: '', nonce: 0 })

  const goToBooking = useCallback((data = {}) => {
    setBooking((prev) => ({
      service: data.service ?? '',
      specialist: data.specialist ?? '',
      nonce: prev.nonce + 1,
    }))
    document.getElementById('contacto')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <AppProvider>
      <Navbar onBook={() => goToBooking()} />
      <main>
        <Hero onBook={() => goToBooking()} />
        <About />
        <Services onBook={goToBooking} />
        <Gallery />
        <BeforeAfter />
        <Team onBook={goToBooking} />
        <Pricing onBook={goToBooking} />
        <Testimonials />
        <FAQ />
        <Contact booking={booking} />
      </main>
      <Footer />
    </AppProvider>
  )
}
