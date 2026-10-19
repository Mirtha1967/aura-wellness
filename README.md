# Aura Wellness & Medical Spa

Web corporativa (SPA) con React + Vite, Tailwind CSS, lucide-react y Supabase.
Todo el contenido (textos, precios, equipo, opiniones) es **de ejemplo** y está en `src/data/content.js`.

## Estructura

```
aura/
├── index.html
├── package.json
├── vite.config.js · tailwind.config.js · postcss.config.js
├── .env.example            ← plantilla de variables de entorno
├── supabase/
│   └── schema.sql          ← tablas + seguridad (RLS) para Supabase
├── public/images/          ← tus fotos reales (hero.jpg, equipo, galería…)
└── src/
    ├── main.jsx · App.jsx · index.css
    ├── context/AppContext.jsx   ← idioma, moneda y formateo de precios
    ├── lib/supabase.js          ← conexión y funciones de guardado
    ├── data/
    │   ├── content.js           ← servicios, precios, equipo, FAQ, medios…
    │   └── i18n.js              ← textos de la interfaz ES/EN
    └── components/
        Navbar · Hero · About (vídeo + estadísticas) · Services · Gallery
        BeforeAfter · Team · Pricing · Testimonials · FAQ · Contact · Footer
        Reveal · Visual (auxiliares)
```

## 1. Arrancar en local

```bash
npm install
cp .env.example .env     # y rellena tus claves de Supabase
npm run dev              # http://localhost:5173
npm run build            # genera /dist para producción
```

## 2. Supabase

1. Crea un proyecto en https://supabase.com.
2. SQL Editor → New query → pega `supabase/schema.sql` → Run.
3. Copia la **URL** y la clave **publishable** (botón *Connect* o Settings → API Keys) en `.env`:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_PUBLISHABLE_KEY=...
   ```
4. Los envíos del formulario aparecen en Table Editor → `contacts`; el boletín en `newsletter_subscribers`.

Seguridad: las tablas tienen RLS activado y el visitante solo puede **insertar** (no leer). Para ver los datos usa el panel de Supabase.

## 3. GitHub

```bash
git init
git add .
git commit -m "Primera versión de Aura Wellness"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/aura-wellness.git
git push -u origin main
```
(Crea antes el repositorio vacío en GitHub. `.env` está en `.gitignore`, no se sube.)

## 4. Vercel

1. https://vercel.com → Add New → Project → importa el repositorio de GitHub.
2. Vercel detecta Vite solo (Build: `npm run build`, Output: `dist`).
3. En **Environment Variables** añade `VITE_SUPABASE_URL` y `VITE_SUPABASE_PUBLISHABLE_KEY` (el prefijo `VITE_` es obligatorio para que Vite las exponga).
4. Deploy. Cada `git push` a `main` redespliega automáticamente.

## 5. Personalizar

- **Fotos:** sube imágenes a `public/images/` y referencia `'/images/archivo.jpg'` en `content.js` (`MEDIA.hero`, `GALLERY`, `TEAM`, `RESULTS`, `TESTIMONIALS`). Si un campo está vacío, se muestra un relleno elegante.
- **Vídeo:** pon el ID de YouTube en `MEDIA.videoYoutubeId`.
- **Mapa:** el mapa es una ilustración. Sustitúyelo por un `<iframe>` de Google Maps u OpenStreetMap con tu dirección real (en `Contact.jsx`).
- **Divisas:** los tipos de cambio de `CURRENCIES` son orientativos; actualízalos.
- **Idioma:** la interfaz está en ES/EN; el contenido de `content.js` está en español.

## Antes de publicar (importante)

- Las opiniones de `TESTIMONIALS` son ficticias: sustitúyelas por reseñas reales o elimina la sección. Publicar reseñas inventadas como reales puede ser ilegal.
- Las imágenes de "Antes y después" requieren consentimiento escrito del cliente.
- Enlaza páginas reales de privacidad, aviso legal y cookies, y revisa con un profesional las obligaciones legales (RGPD/LSSI, publicidad sanitaria) aplicables a tu actividad.
