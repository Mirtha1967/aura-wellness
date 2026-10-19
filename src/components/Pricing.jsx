import { useMemo, useState } from 'react'
import { BadgePercent, Check, Search } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { BONOS, CATEGORIES, LOYALTY, SERVICES } from '../data/content'
import Reveal from './Reveal'

export default function Pricing({ onBook }) {
  const { t, label, money } = useApp()
  const [cat, setCat] = useState('all')
  const [query, setQuery] = useState('')

  const catById = useMemo(() => Object.fromEntries(CATEGORIES.map((c) => [c.id, c])), [])

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return SERVICES.filter(
      (s) =>
        (cat === 'all' || s.category === cat) &&
        (q === '' || s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)),
    )
  }, [cat, query])

  return (
    <section id="tarifas" className="section-pad bg-aura-cream">
      <div className="container-aura">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{t('pricing.kicker')}</p>
          <h2 className="heading">{t('pricing.title')}</h2>
        </Reveal>

        {/* Filtros + buscador */}
        <div className="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div role="tablist" className="flex flex-wrap gap-2">
            {[{ id: 'all', es: t('pricing.all'), en: t('pricing.all') }, ...CATEGORIES].map((c) => (
              <button
                key={c.id}
                role="tab"
                aria-selected={cat === c.id}
                onClick={() => setCat(c.id)}
                className={`rounded-full px-5 py-2 text-sm transition ${
                  cat === c.id ? 'bg-aura-ink text-white' : 'bg-white text-aura-taupe hover:text-aura-ink'
                }`}
              >
                {label(c)}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-aura-taupe" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('pricing.search')}
              aria-label={t('pricing.search')}
              className="input-aura !pl-11"
            />
          </div>
        </div>

        {/* Tabla */}
        <div className="mt-6 overflow-x-auto rounded-2xl bg-white shadow-soft">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="border-b border-aura-sand text-xs uppercase tracking-widest text-aura-taupe">
              <tr>
                <th className="px-6 py-4 font-medium">{t('pricing.treatment')}</th>
                <th className="px-6 py-4 font-medium">{t('pricing.category')}</th>
                <th className="px-6 py-4 font-medium">{t('pricing.duration')}</th>
                <th className="px-6 py-4 text-right font-medium">{t('pricing.price')}</th>
                <th className="px-6 py-4" />
              </tr>
            </thead>
            <tbody>
              {rows.map((s) => (
                <tr key={s.id} className="border-b border-aura-sand/60 last:border-0 hover:bg-aura-ivory">
                  <td className="px-6 py-4 font-medium">{s.name}</td>
                  <td className="px-6 py-4 text-aura-taupe">{label(catById[s.category])}</td>
                  <td className="px-6 py-4 text-aura-taupe">
                    {s.duration} {t('services.min')}
                  </td>
                  <td className="px-6 py-4 text-right font-display text-xl text-aura-gold-dark">{money(s.price)}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => onBook({ service: s.name })}
                      className="text-xs font-medium uppercase tracking-widest text-aura-gold-dark hover:underline"
                    >
                      {t('cta.book')}
                    </button>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-aura-taupe">
                    {t('pricing.empty')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="mt-3 text-xs text-aura-taupe">{t('pricing.note')}</p>

        {/* Bonos */}
        <h3 className="mt-16 text-center font-display text-3xl">{t('pricing.bonos')}</h3>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {BONOS.map((b) => (
            <Reveal key={b.id}>
              <article
                className={`relative flex h-full flex-col rounded-2xl p-8 ${
                  b.featured ? 'bg-aura-ink text-white shadow-soft' : 'border border-aura-sand bg-white'
                }`}
              >
                {b.featured && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-aura-gold px-4 py-1 text-xs font-medium uppercase tracking-widest text-white">
                    {t('pricing.popular')}
                  </span>
                )}
                <h4 className="font-display text-2xl">{b.name}</h4>
                <p className={`mt-1 text-sm ${b.featured ? 'text-white/70' : 'text-aura-taupe'}`}>
                  {b.sessions} {t('pricing.sessions')}
                </p>
                <p className="mt-4 font-display text-5xl text-aura-gold">{money(b.price)}</p>
                <ul className="mt-6 flex-1 space-y-2.5 text-sm">
                  {b.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <Check size={16} className="mt-0.5 shrink-0 text-aura-gold" /> {p}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => onBook({ service: b.name })}
                  className={`mt-8 ${b.featured ? 'btn-primary' : 'btn-outline'}`}
                >
                  {t('pricing.choose')}
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Fidelización */}
        <div className="mt-10 flex flex-col items-center gap-4 rounded-2xl border border-aura-gold/50 bg-white p-8 text-center sm:flex-row sm:text-left">
          <BadgePercent size={40} className="shrink-0 text-aura-gold" strokeWidth={1.3} />
          <div>
            <h4 className="font-display text-2xl">{t('pricing.loyalty')}</h4>
            <p className="mt-1 text-aura-taupe">
              {t('pricing.loyaltyText', { n: LOYALTY.fromVisit, p: LOYALTY.discountPercent })}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
