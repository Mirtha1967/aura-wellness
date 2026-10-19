import { useEffect, useState } from 'react'
import { Menu, X, Sparkles, Globe } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CURRENCIES } from '../data/content'

const LINKS = [
  ['servicios', 'nav.services'],
  ['galeria', 'nav.gallery'],
  ['resultados', 'nav.results'],
  ['equipo', 'nav.team'],
  ['tarifas', 'nav.pricing'],
  ['faq', 'nav.faq'],
  ['contacto', 'nav.contact'],
]

export default function Navbar({ onBook }) {
  const { t, lang, setLang, currency, setCurrency } = useApp()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || open
  const textColor = solid ? 'text-aura-ink' : 'text-white'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'bg-aura-ivory/95 shadow-soft backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="container-aura flex h-[4.5rem] items-center justify-between px-5 sm:px-8" aria-label="Principal">
        <a href="#inicio" className={`flex items-center gap-2 font-display text-2xl font-semibold ${textColor}`}>
          <Sparkles size={20} className="text-aura-gold" />
          Aura
          <span className="hidden text-xs font-sans font-normal uppercase tracking-[0.25em] sm:inline">
            Wellness &amp; Medical Spa
          </span>
        </a>

        <ul className={`hidden items-center gap-7 text-sm lg:flex ${textColor}`}>
          {LINKS.map(([id, key]) => (
            <li key={id}>
              <a href={`#${id}`} className="transition hover:text-aura-gold">
                {t(key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className={`hidden items-center gap-2 text-xs md:flex ${textColor}`}>
            <Globe size={15} aria-hidden="true" />
            <select
              aria-label="Idioma"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="cursor-pointer rounded bg-transparent py-1 focus:outline-none [&>option]:text-aura-ink"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
            <select
              aria-label="Moneda"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="cursor-pointer rounded bg-transparent py-1 focus:outline-none [&>option]:text-aura-ink"
            >
              {Object.entries(CURRENCIES).map(([code, c]) => (
                <option key={code} value={code}>
                  {c.symbol} {code}
                </option>
              ))}
            </select>
          </div>

          <button onClick={onBook} className="btn-primary hidden !py-2.5 sm:inline-flex">
            {t('cta.book')}
          </button>

          <button
            className={`lg:hidden ${textColor}`}
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
          >
            {open ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="animate-fade-in border-t border-aura-sand bg-aura-ivory px-5 pb-6 pt-2 lg:hidden">
          <ul className="flex flex-col">
            {LINKS.map(([id, key]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className="block border-b border-aura-sand/70 py-3 text-aura-ink"
                >
                  {t(key)}
                </a>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex items-center gap-3 text-sm text-aura-ink">
            <select
              aria-label="Idioma"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="input-aura !w-auto !py-2"
            >
              <option value="es">ES</option>
              <option value="en">EN</option>
            </select>
            <select
              aria-label="Moneda"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="input-aura !w-auto !py-2"
            >
              {Object.entries(CURRENCIES).map(([code, c]) => (
                <option key={code} value={code}>
                  {c.symbol} {code}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => {
              setOpen(false)
              onBook()
            }}
            className="btn-primary mt-4 w-full"
          >
            {t('cta.book')}
          </button>
        </div>
      )}
    </header>
  )
}
