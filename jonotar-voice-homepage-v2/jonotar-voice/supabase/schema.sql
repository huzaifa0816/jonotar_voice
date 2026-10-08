create extension if not exists pgcrypto;

create table if not exists polls (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  description text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists poll_options (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references polls(id) on delete cascade,
  option_text text not null,
  sort_order integer not null default 0
);

create table if not exists votes (
  id uuid primary key default gen_random_uuid(),
  poll_id uuid not null references polls(id) on delete cascade,
  option_id uuid not null references poll_options(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index if not exists votes_poll_id_idx on votes(poll_id);
create index if not exists votes_option_id_idx on votes(option_id);

alter table polls enable row level security;
alter table poll_options enable row level security;
alter table votes enable row level security;

create policy "public can read active polls"
on polls for select
using (status = 'active');

create policy "public can read poll options"
on poll_options for select
using (
  exists (
    select 1 from polls
    where polls.id = poll_options.poll_id
    and polls.status = 'active'
  )
);

-- Votes are inserted by the server route using the service role key.
-- Do NOT expose SUPABASE_SERVICE_ROLE_KEY in the browser.
