-- Rode isso no SQL Editor do seu projeto Supabase antes de testar o formulário.
-- Schema conforme docs/PROJETO.md, seção 9.

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  nome text not null,
  whatsapp text not null unique,
  email text,
  kits text[] not null,
  consentimento boolean not null,
  consentimento_texto text not null,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  user_agent text
);

-- RLS ligado por padrão no Supabase; a rota do servidor usa a service role key,
-- que ignora RLS, então nenhuma política extra é necessária para o formulário funcionar.
alter table public.leads enable row level security;
