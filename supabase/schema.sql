-- =====================================================================
-- Aura Wellness & Medical Spa - Esquema de base de datos (Supabase)
-- Ejecutar en: Supabase > SQL Editor > New query > Run
-- =====================================================================

-- ---------------------------------------------------------------------
-- 1) Tabla de contactos / solicitudes de cita
-- ---------------------------------------------------------------------
create table if not exists public.contacts (
  id             uuid primary key default gen_random_uuid(),
  name           text not null check (char_length(name) between 2 and 120),
  email          text not null check (char_length(email) between 5 and 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  phone          text not null check (char_length(phone) between 6 and 30),
  service        text check (char_length(service) <= 160),
  specialist     text check (char_length(specialist) <= 120),
  preferred_date date,
  message        text check (char_length(message) <= 2000),
  consent        boolean not null default false check (consent = true),
  status         text not null default 'new' check (status in ('new', 'contacted', 'booked', 'discarded')),
  created_at     timestamptz not null default now()
);

create index if not exists contacts_created_at_idx on public.contacts (created_at desc);

-- ---------------------------------------------------------------------
-- 2) Tabla de suscriptores al boletín
-- ---------------------------------------------------------------------
create table if not exists public.newsletter_subscribers (
  id         uuid primary key default gen_random_uuid(),
  email      text not null unique check (char_length(email) between 5 and 254 and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------
-- 3) Row Level Security
--    El visitante (rol "anon") SOLO puede insertar. Nadie puede leer
--    estos datos desde la web: se consultan desde el panel de Supabase
--    (o con la service_role key en un backend).
-- ---------------------------------------------------------------------
alter table public.contacts enable row level security;
alter table public.newsletter_subscribers enable row level security;

drop policy if exists "anon can insert contacts" on public.contacts;
create policy "anon can insert contacts"
  on public.contacts
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "anon can insert subscribers" on public.newsletter_subscribers;
create policy "anon can insert subscribers"
  on public.newsletter_subscribers
  for insert
  to anon, authenticated
  with check (true);

-- No se crean políticas de SELECT / UPDATE / DELETE a propósito.
