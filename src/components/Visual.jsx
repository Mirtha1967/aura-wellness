import { Sparkles } from 'lucide-react'

const TONES = [
  'from-aura-sand via-aura-cream to-white',
  'from-[#d9cdbb] via-[#ece4d8] to-aura-ivory',
  'from-[#cbbfae] via-[#e6ddd0] to-[#f7f3ee]',
  'from-aura-taupe/40 via-aura-sand to-aura-cream',
]

/**
 * Muestra una imagen si hay `src`; si no, un bloque degradado elegante.
 * Así la web se ve bien aunque aún no hayas subido tus fotos reales.
 */
export default function Visual({ src, alt = '', label, tone = 0, className = '', children }) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img src={src} alt={alt} loading="lazy" className="h-full w-full object-cover" />
        {children}
      </div>
    )
  }
  return (
    <div
      role="img"
      aria-label={alt || label}
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br ${TONES[tone % TONES.length]} ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center text-aura-gold-dark/70">
        <Sparkles size={28} strokeWidth={1.2} />
        {label && <span className="font-display text-lg leading-tight">{label}</span>}
      </div>
      {children}
    </div>
  )
}
