import { useEffect, useRef, useState } from 'react'
import { Play } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { MEDIA, STATS } from '../data/content'
import Reveal from './Reveal'

/** Contador animado que arranca cuando entra en pantalla. */
function Counter({ value, suffix }) {
  const ref = useRef(null)
  const [n, setN] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf
    const run = () => {
      const start = performance.now()
      const dur = 1600
      const tick = (now) => {
        const p = Math.min((now - start) / dur, 1)
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))))
        if (p < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }
    if (typeof IntersectionObserver === 'undefined') {
      setN(value)
      return
    }
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          run()
          obs.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    obs.observe(el)
    return () => {
      obs.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [value])

  return (
    <span ref={ref}>
      {n.toLocaleString('es-ES')}
      {suffix}
    </span>
  )
}

export default function About() {
  const { t } = useApp()
  const [playing, setPlaying] = useState(false)

  return (
    <section id="nosotros" className="section-pad bg-aura-ivory">
      <div className="container-aura grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <p className="kicker">{t('about.kicker')}</p>
          <h2 className="heading">{t('about.title')}</h2>
          <p className="mt-6 max-w-lg leading-relaxed text-aura-taupe">{t('about.text')}</p>
        </Reveal>

        <Reveal delay={150}>
          <div className="relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-[#3a332d] via-[#6b5f52] to-[#b79a6b] shadow-soft">
            {playing && MEDIA.videoYoutubeId ? (
              <iframe
                className="absolute inset-0 h-full w-full"
                src={`https://www.youtube-nocookie.com/embed/${MEDIA.videoYoutubeId}?autoplay=1&rel=0`}
                title="Vídeo corporativo Aura"
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                onClick={() => setPlaying(true)}
                className="group absolute inset-0 flex flex-col items-center justify-center gap-4 text-white"
                aria-label={t('about.video')}
              >
                <span className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 ring-1 ring-white/60 backdrop-blur transition group-hover:scale-110 group-hover:bg-white/30">
                  <Play size={30} fill="currentColor" className="ml-1" />
                </span>
                <span className="font-display text-2xl">{t('about.video')}</span>
              </button>
            )}
            {playing && !MEDIA.videoYoutubeId && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 p-6 text-center text-sm text-white">
                {t('about.videoNote')}
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {/* Carrusel de estadísticas: scroll horizontal con snap en móvil, rejilla en escritorio */}
      <div className="container-aura mt-16 md:mt-20">
        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 sm:mx-0 sm:px-0 lg:grid lg:grid-cols-4 lg:overflow-visible">
          {STATS.map((s) => (
            <li
              key={s.label}
              className="min-w-[70%] snap-center rounded-2xl border border-aura-sand bg-white p-8 text-center sm:min-w-[45%] lg:min-w-0"
            >
              <p className="font-display text-5xl font-medium text-aura-gold-dark">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm uppercase tracking-widest text-aura-taupe">{s.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
