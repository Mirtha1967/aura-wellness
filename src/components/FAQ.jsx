import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useApp } from '../context/AppContext'
import { FAQS } from '../data/content'
import Reveal from './Reveal'

export default function FAQ() {
  const { t } = useApp()
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="section-pad bg-aura-cream">
      <div className="container-aura max-w-3xl">
        <Reveal className="text-center">
          <p className="kicker">{t('faq.kicker')}</p>
          <h2 className="heading">{t('faq.title')}</h2>
        </Reveal>

        <div className="mt-12 divide-y divide-aura-sand rounded-2xl border border-aura-sand bg-white">
          {FAQS.map((f, idx) => {
            const isOpen = open === idx
            return (
              <div key={f.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : idx)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${idx}`}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-medium"
                  >
                    {f.q}
                    <Plus
                      size={20}
                      className={`shrink-0 text-aura-gold transition-transform duration-300 ${isOpen ? 'rotate-45' : ''}`}
                    />
                  </button>
                </h3>
                <div
                  id={`faq-panel-${idx}`}
                  className={`grid transition-all duration-300 ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-5 leading-relaxed text-aura-taupe">{f.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
