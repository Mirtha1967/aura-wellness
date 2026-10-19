import { useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { GALLERY, GALLERY_ZONES } from '../data/content'
import Reveal from './Reveal'
import Visual from './Visual'

export default function Gallery() {
  const { t, label } = useApp()
  const [zone, setZone] = useState('all')
  const [index, setIndex] = useState(null) // índice dentro de la lista filtrada

  const items = zone === 'all' ? GALLERY : GALLERY.filter((g) => g.zone === zone)

  const close = useCallback(() => setIndex(null), [])
  const prev = useCallback(
    () => setIndex((i) => (i === null ? i : (i - 1 + items.length) % items.length)),
    [items.length],
  )
  const next = useCallback(
    () => setIndex((i) => (i === null ? i : (i + 1) % items.length)),
    [items.length],
  )

  useEffect(() => {
    if (index === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [index, close, prev, next])

  const current = index !== null ? items[index] : null

  return (
    <section id="galeria" className="section-pad bg-aura-ivory">
      <div className="container-aura">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{t('gallery.kicker')}</p>
          <h2 className="heading">{t('gallery.title')}</h2>
        </Reveal>

        <div role="tablist" className="mt-10 flex flex-wrap justify-center gap-2">
          {[{ id: 'all', es: t('pricing.all'), en: t('pricing.all') }, ...GALLERY_ZONES].map((z) => (
            <button
              key={z.id}
              role="tab"
              aria-selected={zone === z.id}
              onClick={() => setZone(z.id)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                zone === z.id ? 'bg-aura-ink text-white' : 'bg-aura-cream text-aura-taupe hover:text-aura-ink'
              }`}
            >
              {label(z)}
            </button>
          ))}
        </div>

        <div className="mt-12 grid auto-rows-[14rem] grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {items.map((g, i) => (
            <button
              key={g.id}
              onClick={() => setIndex(i)}
              className={`group relative overflow-hidden rounded-xl text-left ${
                i % 5 === 0 ? 'md:row-span-2' : ''
              }`}
              aria-label={`Ampliar: ${g.title}`}
            >
              <Visual
                src={g.image}
                alt={g.title}
                label={g.title}
                tone={i}
                className="h-full w-full transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 flex items-center justify-center bg-aura-ink/0 text-white opacity-0 transition group-hover:bg-aura-ink/35 group-hover:opacity-100">
                <ZoomIn size={28} />
              </span>
            </button>
          ))}
        </div>
      </div>

      {current && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4 animate-fade-in"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
        >
          <button onClick={close} className="absolute right-5 top-5 text-white/80 hover:text-white" aria-label="Cerrar">
            <X size={30} />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              prev()
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 md:left-8"
            aria-label="Anterior"
          >
            <ChevronLeft size={28} />
          </button>
          <figure className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <Visual
              src={current.image}
              alt={current.title}
              label={current.title}
              tone={index}
              className="aspect-[4/3] w-full rounded-xl"
            />
            <figcaption className="mt-3 text-center text-sm text-white/80">
              {current.title} · {index + 1}/{items.length}
            </figcaption>
          </figure>
          <button
            onClick={(e) => {
              e.stopPropagation()
              next()
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white hover:bg-white/25 md:right-8"
            aria-label="Siguiente"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      )}
    </section>
  )
}
