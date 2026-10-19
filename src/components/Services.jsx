import { useEffect, useState } from 'react'
import { Clock, Check, X } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CATEGORIES, SERVICES } from '../data/content'
import Reveal from './Reveal'
import Visual from './Visual'

export default function Services({ onBook }) {
  const { t, label, money } = useApp()
  const [cat, setCat] = useState(CATEGORIES[0].id)
  const [selected, setSelected] = useState(null)

  const list = SERVICES.filter((s) => s.category === cat)

  // Cierra el modal con ESC y bloquea el scroll del fondo
  useEffect(() => {
    if (!selected) return
    const onKey = (e) => e.key === 'Escape' && setSelected(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <section id="servicios" className="section-pad bg-aura-cream">
      <div className="container-aura">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{t('services.kicker')}</p>
          <h2 className="heading">{t('services.title')}</h2>
        </Reveal>

        <div role="tablist" className="mt-10 flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={cat === c.id}
              onClick={() => setCat(c.id)}
              className={`rounded-full px-6 py-2.5 text-sm transition ${
                cat === c.id
                  ? 'bg-aura-ink text-white'
                  : 'bg-white text-aura-taupe hover:text-aura-ink'
              }`}
            >
              {label(c)}
            </button>
          ))}
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((s, i) => (
            <Reveal key={s.id} delay={i * 80}>
              <article className="flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-soft transition duration-300 hover:-translate-y-1">
                <Visual label={s.name} tone={i} className="h-40" />
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl leading-tight">{s.name}</h3>
                  <div className="mt-3 flex items-center justify-between text-sm text-aura-taupe">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock size={14} /> {s.duration} {t('services.min')}
                    </span>
                    <span>
                      {t('services.from')}{' '}
                      <strong className="font-display text-xl text-aura-gold-dark">{money(s.price)}</strong>
                    </span>
                  </div>
                  <ul className="mt-4 space-y-1.5 text-sm text-aura-taupe">
                    {s.benefits.slice(0, 2).map((b) => (
                      <li key={b} className="flex items-start gap-2">
                        <Check size={15} className="mt-0.5 shrink-0 text-aura-gold" /> {b}
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setSelected(s)} className="btn-outline mt-6 !py-2.5">
                    {t('services.more')}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-aura-ink/60 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={selected.name}
        >
          <div
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-8 shadow-soft"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute right-4 top-4 text-aura-taupe hover:text-aura-ink"
              aria-label="Cerrar"
            >
              <X size={22} />
            </button>
            <h3 className="pr-8 font-display text-3xl">{selected.name}</h3>
            <div className="mt-2 flex items-center gap-5 text-sm text-aura-taupe">
              <span className="inline-flex items-center gap-1.5">
                <Clock size={14} /> {selected.duration} {t('services.min')}
              </span>
              <span className="font-display text-xl text-aura-gold-dark">{money(selected.price)}</span>
            </div>
            <p className="mt-5 leading-relaxed text-aura-taupe">{selected.description}</p>
            <h4 className="mt-6 text-xs font-medium uppercase tracking-widest text-aura-gold-dark">
              {t('services.benefits')}
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {selected.benefits.map((b) => (
                <li key={b} className="flex items-start gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-aura-gold" /> {b}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                const svc = selected.name
                setSelected(null)
                onBook({ service: svc })
              }}
              className="btn-primary mt-8 w-full"
            >
              {t('services.book')}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
