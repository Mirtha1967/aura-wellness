import { useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { RESULTS } from '../data/content'
import Reveal from './Reveal'

/** Un lado del comparador: foto real si existe, o relleno ilustrativo. */
function Side({ src, kind }) {
  if (src) return <img src={src} alt="" className="h-full w-full object-cover" draggable="false" />
  const bg =
    kind === 'before'
      ? 'bg-gradient-to-br from-[#bfae9b] via-[#cdbfae] to-[#a89782]'
      : 'bg-gradient-to-br from-[#f1e6d6] via-[#f8f1e7] to-[#ead9c3]'
  return <div className={`h-full w-full ${bg}`} />
}

export default function BeforeAfter() {
  const { t, label } = useApp()
  const [id, setId] = useState(RESULTS[0].id)
  const [pos, setPos] = useState(50)
  const item = RESULTS.find((r) => r.id === id)

  return (
    <section id="resultados" className="section-pad bg-aura-cream">
      <div className="container-aura">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{t('results.kicker')}</p>
          <h2 className="heading">{t('results.title')}</h2>
        </Reveal>

        {RESULTS.length > 1 && (
          <div role="tablist" className="mt-10 flex flex-wrap justify-center gap-2">
            {RESULTS.map((r) => (
              <button
                key={r.id}
                role="tab"
                aria-selected={id === r.id}
                onClick={() => {
                  setId(r.id)
                  setPos(50)
                }}
                className={`rounded-full px-5 py-2 text-sm transition ${
                  id === r.id ? 'bg-aura-ink text-white' : 'bg-white text-aura-taupe hover:text-aura-ink'
                }`}
              >
                {label(r)}
              </button>
            ))}
          </div>
        )}

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <div className="relative aspect-[4/3] select-none overflow-hidden rounded-2xl shadow-soft">
            {/* Después (fondo) */}
            <div className="absolute inset-0">
              <Side src={item.after} kind="after" />
            </div>
            {/* Antes (recortado por la izquierda) */}
            <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
              <Side src={item.before} kind="before" />
            </div>

            <span className="absolute left-4 top-4 rounded-full bg-aura-ink/70 px-3 py-1 text-xs uppercase tracking-widest text-white">
              {t('results.before')}
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-aura-gold px-3 py-1 text-xs uppercase tracking-widest text-white">
              {t('results.after')}
            </span>

            {/* Línea y tirador */}
            <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow" style={{ left: `${pos}%` }}>
              <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-aura-gold-dark shadow-soft">
                <MoveHorizontal size={20} />
              </span>
            </div>

            {/* Control accesible (teclado, ratón y táctil) */}
            <input
              type="range"
              min="0"
              max="100"
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              aria-label={t('results.hint')}
              className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
            />
          </div>
          <p className="mt-4 text-center text-sm text-aura-taupe">{t('results.hint')}</p>
          <p className="mt-1 text-center text-xs text-aura-taupe/80">{t('results.disclaimer')}</p>
        </Reveal>
      </div>
    </section>
  )
}
