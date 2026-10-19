import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { STRINGS } from '../data/i18n'
import { CURRENCIES } from '../data/content'

const AppContext = createContext(null)

export function AppProvider({ children }) {
  const [lang, setLang] = useState('es')
  const [currency, setCurrency] = useState('EUR')

  const t = useCallback((key, vars) => {
    let text = STRINGS[lang][key] ?? STRINGS.es[key] ?? key
    if (vars) {
      Object.entries(vars).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, v)
      })
    }
    return text
  }, [lang])

  /** Convierte un precio en EUR a la moneda elegida y lo formatea. */
  const money = useCallback((eur) => {
    const c = CURRENCIES[currency]
    return new Intl.NumberFormat(c.locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(eur * c.rate)
  }, [currency])

  /** Devuelve el nombre de una categoría/zona en el idioma actual. */
  const label = useCallback((item) => item[lang] ?? item.es, [lang])

  const value = useMemo(
    () => ({ lang, setLang, currency, setCurrency, t, money, label }),
    [lang, currency, t, money, label],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp debe usarse dentro de <AppProvider>')
  return ctx
}
