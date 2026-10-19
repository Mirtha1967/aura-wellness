import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { TESTIMONIALS } from '../data/content'
import Reveal from './Reveal'

export default function Testimonials() {
  const { t } = useApp()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const n = TESTIMONIALS.length

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((v) => (v + 1) % n), 6000)
    return () => clearInterval(id)
  }, [paused, n])

  const go = (d) => setI((v) => (v + d + n) % n)

  return (
    <section id="testimonios" className="section-pad bg-aura-ivory">
      <div className="container-aura">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{t('testimonials.kicker')}</p>
          <h2 className="heading">{t('testimonials.title')}</h2>
        </Reveal>

        <div
          className="relative mx-auto mt-14 max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden rounded-2xl border border-aura-sand bg-white shadow-soft">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${i * 100}%)` }}
            >
              {TESTIMONIALS.map((tm) => (
                <figure key={tm.id} className="w-full shrink-0 p-8 text-center sm:p-12" aria-hidden={tm.id !== TESTIMONIALS[i].id}>
                  <Quote size={32} className="mx-auto text-aura-gold/60" />
                  <div className="mt-4 flex justify-center gap-1" aria-label={`${tm.rating} / 5`}>
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={18}
                        className={s <= tm.rating ? 'fill-aura-gold text-aura-gold' : 'text-aura-sand'}
                      />
                    ))}
                  </div>
                  <blockquote className="mt-5 font-display text-2xl leading-snug sm:text-3xl">“{tm.text}”</blockquote>
                  <figcaption className="mt-7 flex flex-col items-center gap-3">
                    {tm.photo ? (
                      <img src={tm.photo} alt={tm.name} className="h-14 w-14 rounded-full object-cover" />
                    ) : (
                      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-aura-cream font-display text-xl text-aura-gold-dark">
                        {tm.name.charAt(0)}
                      </span>
                    )}
                    <span>
                      <strong className="block text-sm">{tm.name}</strong>
                      <span className="text-xs text-aura-taupe">{tm.treatment}</span>
                    </span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <button
            onClick={() => go(-1)}
            className="absolute -left-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2.5 text-aura-ink shadow-soft hover:text-aura-gold-dark md:-left-6"
            aria-label="Anterior"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            onClick={() => go(1)}
            className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full bg-white p-2.5 text-aura-ink shadow-soft hover:text-aura-gold-dark md:-right-6"
            aria-label="Siguiente"
          >
            <ChevronRight size={22} />
          </button>

          <div className="mt-6 flex justify-center gap-2">
            {TESTIMONIALS.map((tm, idx) => (
              <button
                key={tm.id}
                onClick={() => setI(idx)}
                aria-label={`Testimonio ${idx + 1}`}
                className={`h-2 rounded-full transition-all ${idx === i ? 'w-8 bg-aura-gold' : 'w-2 bg-aura-sand'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
