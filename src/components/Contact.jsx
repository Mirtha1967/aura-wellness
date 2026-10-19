import { useEffect, useState } from 'react'
import { Clock, Loader2, Mail, MapPin, Phone } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CONTACT_INFO, SERVICES } from '../data/content'
import { saveContact } from '../lib/supabase'
import Reveal from './Reveal'

const EMPTY = {
  name: '',
  phone: '',
  email: '',
  service: '',
  specialist: '',
  preferred_date: '',
  message: '',
  consent: false,
  website: '', // honeypot anti-spam: debe quedar vacío
}

export default function Contact({ booking }) {
  const { t } = useApp()
  const [form, setForm] = useState(EMPTY)
  const [status, setStatus] = useState('idle') // idle | sending | success | error | notConfigured

  // Pre-rellena servicio/especialista cuando el usuario pulsa "Reservar" en otra sección
  useEffect(() => {
    if (!booking?.nonce) return
    setForm((f) => ({ ...f, service: booking.service, specialist: booking.specialist }))
    setStatus('idle')
  }, [booking])

  const update = (e) => {
    const { name, value, type, checked } = e.target
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (form.website) return // bot detectado
    setStatus('sending')
    try {
      await saveContact({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        service: form.service || null,
        specialist: form.specialist || null,
        preferred_date: form.preferred_date || null,
        message: form.message.trim() || null,
        consent: form.consent,
      })
      setStatus('success')
      setForm(EMPTY)
    } catch (err) {
      console.error('Error guardando contacto:', err)
      setStatus(err?.message === 'SUPABASE_NOT_CONFIGURED' ? 'notConfigured' : 'error')
    }
  }

  const today = new Date().toISOString().split('T')[0]
  const field = 'block text-xs font-medium uppercase tracking-widest text-aura-taupe mb-2'

  return (
    <section id="contacto" className="section-pad bg-aura-ivory">
      <div className="container-aura">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="kicker">{t('contact.kicker')}</p>
          <h2 className="heading">{t('contact.title')}</h2>
        </Reveal>

        <div className="mt-14 grid gap-10 lg:grid-cols-5">
          {/* Formulario */}
          <Reveal className="lg:col-span-3">
            <form onSubmit={onSubmit} className="rounded-2xl border border-aura-sand bg-white p-6 shadow-soft sm:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={field}>{t('contact.name')} *</label>
                  <input id="name" name="name" required minLength={2} maxLength={120} autoComplete="name"
                    value={form.name} onChange={update} className="input-aura" />
                </div>
                <div>
                  <label htmlFor="phone" className={field}>{t('contact.phone')} *</label>
                  <input id="phone" name="phone" type="tel" required minLength={6} maxLength={30} autoComplete="tel"
                    value={form.phone} onChange={update} className="input-aura" />
                </div>
                <div>
                  <label htmlFor="email" className={field}>{t('contact.email')} *</label>
                  <input id="email" name="email" type="email" required maxLength={254} autoComplete="email"
                    value={form.email} onChange={update} className="input-aura" />
                </div>
                <div>
                  <label htmlFor="preferred_date" className={field}>{t('contact.date')}</label>
                  <input id="preferred_date" name="preferred_date" type="date" min={today}
                    value={form.preferred_date} onChange={update} className="input-aura" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="service" className={field}>{t('contact.service')}</label>
                  <select id="service" name="service" value={form.service} onChange={update} className="input-aura">
                    <option value="">{t('contact.servicePlaceholder')}</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                    {/* Permite conservar un valor que venga de un bono */}
                    {form.service && !SERVICES.some((s) => s.name === form.service) && (
                      <option value={form.service}>{form.service}</option>
                    )}
                  </select>
                </div>
                {form.specialist && (
                  <div className="sm:col-span-2">
                    <label htmlFor="specialist" className={field}>{t('contact.specialist')}</label>
                    <input id="specialist" name="specialist" value={form.specialist} onChange={update} className="input-aura" />
                  </div>
                )}
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={field}>{t('contact.message')}</label>
                  <textarea id="message" name="message" rows={4} maxLength={2000}
                    value={form.message} onChange={update} className="input-aura resize-y" />
                </div>

                {/* Honeypot: invisible para personas */}
                <div className="hidden" aria-hidden="true">
                  <label>
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={update} />
                  </label>
                </div>

                <label className="flex items-start gap-3 text-sm text-aura-taupe sm:col-span-2">
                  <input type="checkbox" name="consent" required checked={form.consent} onChange={update}
                    className="mt-1 h-4 w-4 accent-[#B79A6B]" />
                  <span>{t('contact.consent')}</span>
                </label>
              </div>

              <button type="submit" disabled={status === 'sending'} className="btn-primary mt-8 w-full disabled:opacity-60">
                {status === 'sending' ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> {t('contact.sending')}
                  </>
                ) : (
                  t('contact.send')
                )}
              </button>

              <div aria-live="polite" className="mt-4 text-sm">
                {status === 'success' && <p className="rounded-xl bg-green-50 p-4 text-green-800">{t('contact.success')}</p>}
                {status === 'error' && <p className="rounded-xl bg-red-50 p-4 text-red-800">{t('contact.error')}</p>}
                {status === 'notConfigured' && (
                  <p className="rounded-xl bg-amber-50 p-4 text-amber-900">{t('contact.notConfigured')}</p>
                )}
              </div>
            </form>
          </Reveal>

          {/* Datos + mapa */}
          <Reveal delay={150} className="space-y-6 lg:col-span-2">
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3"><MapPin size={20} className="shrink-0 text-aura-gold" /> {CONTACT_INFO.address}</li>
              <li className="flex gap-3">
                <Phone size={20} className="shrink-0 text-aura-gold" />
                <a href={`tel:${CONTACT_INFO.phone.replace(/\s/g, '')}`} className="hover:text-aura-gold-dark">{CONTACT_INFO.phone}</a>
              </li>
              <li className="flex gap-3">
                <Mail size={20} className="shrink-0 text-aura-gold" />
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:text-aura-gold-dark">{CONTACT_INFO.email}</a>
              </li>
            </ul>

            <div className="rounded-2xl border border-aura-sand bg-white p-6">
              <h3 className="mb-3 flex items-center gap-2 font-display text-xl">
                <Clock size={18} className="text-aura-gold" /> {t('contact.hours')}
              </h3>
              <dl className="space-y-2 text-sm">
                {CONTACT_INFO.hours.map(([d, h]) => (
                  <div key={d} className="flex justify-between border-b border-aura-sand/60 pb-2 last:border-0 last:pb-0">
                    <dt className="text-aura-taupe">{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Mapa simulado (SVG). Sustitúyelo por un <iframe> de Google Maps/OpenStreetMap cuando tengas la dirección real */}
            <div
              role="img"
              aria-label={t('contact.map')}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-aura-sand bg-aura-cream"
            >
              <svg viewBox="0 0 400 300" className="h-full w-full" preserveAspectRatio="xMidYMid slice">
                <rect width="400" height="300" fill="#F3EEE7" />
                <g stroke="#E6DDD0" strokeWidth="14" fill="none" strokeLinecap="round">
                  <path d="M-10 90 L410 120" />
                  <path d="M-10 210 L410 190" />
                  <path d="M110 -10 L130 310" />
                  <path d="M290 -10 L270 310" />
                </g>
                <g stroke="#fff" strokeWidth="5" fill="none" strokeLinecap="round">
                  <path d="M-10 90 L410 120" />
                  <path d="M-10 210 L410 190" />
                  <path d="M110 -10 L130 310" />
                  <path d="M290 -10 L270 310" />
                </g>
                <rect x="140" y="130" width="120" height="50" rx="6" fill="#E6DDD0" opacity=".7" />
                <rect x="20" y="130" width="70" height="50" rx="6" fill="#d9cdbb" opacity=".6" />
                <rect x="310" y="20" width="70" height="55" rx="6" fill="#d9cdbb" opacity=".6" />
              </svg>
              <div className="absolute left-1/2 top-[46%] -translate-x-1/2 -translate-y-full text-aura-gold-dark drop-shadow">
                <MapPin size={44} fill="#B79A6B" stroke="#fff" strokeWidth={1.5} />
              </div>
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs text-aura-taupe">
                {t('contact.map')}
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
