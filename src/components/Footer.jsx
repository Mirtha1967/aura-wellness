import { useState } from 'react'
import { Facebook, Instagram, Loader2, Sparkles, Youtube, Globe } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { CONTACT_INFO } from '../data/content'
import { saveSubscriber } from '../lib/supabase'

const ICONS = { Instagram, Facebook, YouTube: Youtube }

export default function Footer() {
  const { t } = useApp()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | ok | dup | error

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const res = await saveSubscriber(email.trim())
      setStatus(res === 'duplicate' ? 'dup' : 'ok')
      if (res === 'ok') setEmail('')
    } catch (err) {
      console.error('Error en suscripción:', err)
      setStatus('error')
    }
  }

  return (
    <footer className="bg-aura-ink px-5 pb-8 pt-16 text-white/80 sm:px-8">
      <div className="container-aura grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="flex items-center gap-2 font-display text-3xl text-white">
            <Sparkles size={22} className="text-aura-gold" /> Aura
          </p>
          <p className="mt-1 text-xs uppercase tracking-[0.25em] text-aura-sand">Wellness &amp; Medical Spa</p>
          <p className="mt-4 text-sm text-white/60">{t('footer.about')}</p>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-aura-sand">{t('footer.legal')}</h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><a href="#" className="hover:text-aura-gold">{t('footer.privacy')}</a></li>
            <li><a href="#" className="hover:text-aura-gold">{t('footer.terms')}</a></li>
            <li><a href="#" className="hover:text-aura-gold">{t('footer.cookies')}</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-aura-sand">{t('footer.follow')}</h4>
          <ul className="mt-4 flex gap-3">
            {CONTACT_INFO.socials.map((s) => {
              const Icon = ICONS[s.label] ?? Globe
              return (
                <li key={s.label}>
                  <a
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 transition hover:border-aura-gold hover:text-aura-gold"
                  >
                    <Icon size={18} />
                  </a>
                </li>
              )
            })}
          </ul>
        </div>

        <div>
          <h4 className="text-xs font-medium uppercase tracking-widest text-aura-sand">{t('footer.newsletter')}</h4>
          <p className="mt-4 text-sm text-white/60">{t('footer.newsletterText')}</p>
          <form onSubmit={onSubmit} className="mt-4 flex gap-2">
            <input
              type="email"
              required
              maxLength={254}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@ejemplo.com"
              aria-label={t('contact.email')}
              className="w-full min-w-0 rounded-full border border-white/25 bg-transparent px-4 py-2.5 text-sm text-white placeholder:text-white/40 focus:border-aura-gold focus:outline-none"
            />
            <button type="submit" disabled={status === 'sending'} className="btn-primary !px-5 !py-2.5 disabled:opacity-60">
              {status === 'sending' ? <Loader2 size={16} className="animate-spin" /> : t('footer.subscribe')}
            </button>
          </form>
          <p aria-live="polite" className="mt-2 text-xs">
            {status === 'ok' && <span className="text-green-300">{t('footer.subOk')}</span>}
            {status === 'dup' && <span className="text-aura-sand">{t('footer.subDup')}</span>}
            {status === 'error' && <span className="text-red-300">{t('footer.subErr')}</span>}
          </p>
        </div>
      </div>

      <div className="container-aura mt-14 border-t border-white/10 pt-6 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Aura Wellness &amp; Medical Spa. {t('footer.rights')}
      </div>
    </footer>
  )
}
