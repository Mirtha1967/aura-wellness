import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

// Si faltan las variables de entorno, "supabase" será null y los formularios
// mostrarán un error claro en lugar de fingir que han guardado los datos.
export const supabase = url && publishableKey ? createClient(url, publishableKey) : null
export const isSupabaseConfigured = Boolean(supabase)

/** Guarda una solicitud de cita / contacto. Lanza un Error si falla. */
export async function saveContact(payload) {
  if (!supabase) throw new Error('SUPABASE_NOT_CONFIGURED')
  const { error } = await supabase.from('contacts').insert([payload])
  if (error) throw error
}

/** Guarda un correo en la lista del boletín. Devuelve 'ok' o 'duplicate'. */
export async function saveSubscriber(email) {
  if (!supabase) throw new Error('SUPABASE_NOT_CONFIGURED')
  const { error } = await supabase.from('newsletter_subscribers').insert([{ email }])
  if (error) {
    if (error.code === '23505') return 'duplicate' // email ya suscrito
    throw error
  }
  return 'ok'
}
