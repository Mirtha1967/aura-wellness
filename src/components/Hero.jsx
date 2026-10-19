import { ChevronDown } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { MEDIA } from '../data/content'

export default function Hero({ onBook }) {
  const { t } = useApp()

  return (
    <section id="inicio" className="relative flex min-h-screen items-center overflow-hidden">
      {/* Fondo: imagen real si existe, degradado de lujo si no */}
      {MEDIA.hero ? (
        <img src={MEDIA.hero} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a332d] via-[#6b5f52] to-[#b79a6b]" />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/60" />

      <div className="container-aura relative z-10 px-5 pt-24 sm:px-8">
        <div className="max-w-2xl animate-fade-up text-white">
          <p className="kicker !text-aura-sand">{t('hero.kicker')}</p>
          <h1 className="font-display text-5xl font-medium leading-[1.05] sm:text-6xl md:text-7xl">
            {t('hero.title')}
          </h1>
          <p className="mt-6 max-w-xl text-base font-light leading-relaxed text-white/85 sm:text-lg">
            {t('hero.subtitle')}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="#servicios" className="btn-primary">
              {t('hero.services')}
            </a>
            <a
              href="#contacto"
              onClick={() => onBook?.()}
              className="inline-flex items-center justify-center rounded-full border border-white/70 px-7 py-3 text-sm font-medium tracking-wide text-white transition hover:bg-white hover:text-aura-ink"
            >
              {t('hero.contact')}
            </a>
          </div>
        </div>
      </div>

      <a
        href="#nosotros"
        aria-label="Bajar"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/80"
      >
        <ChevronDown size={30} />
      </a>
    </section>
  )
}
