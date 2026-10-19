import { CalendarCheck } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { TEAM } from '../data/content'
import Reveal from './Reveal'
import Visual from './Visual'

export default function Team({ onBook }) {
  const { t } = useApp()

  return (
    <section id="equipo" className="section-pad bg-aura-ivory">
      <div className="container-aura">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{t('team.kicker')}</p>
          <h2 className="heading">{t('team.title')}</h2>
        </Reveal>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((p, i) => (
            <Reveal key={p.id} delay={i * 90}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-aura-sand bg-white transition duration-300 hover:shadow-soft">
                <Visual src={p.photo} alt={p.name} label={p.name} tone={i} className="aspect-[4/5]" />
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-xs font-medium uppercase tracking-widest text-aura-gold-dark">{p.specialty}</p>
                  <h3 className="mt-1 font-display text-2xl">{p.name}</h3>
                  <p className="text-sm text-aura-taupe">{p.role}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-aura-taupe">{p.bio}</p>
                  <button
                    onClick={() => onBook({ specialist: p.name })}
                    className="btn-outline mt-5 !px-4 !py-2.5"
                  >
                    <CalendarCheck size={16} />
                    {t('team.book')} {p.name.split(' ')[0] === 'Dra.' ? p.name.split(' ')[1] : p.name.split(' ')[0]}
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
