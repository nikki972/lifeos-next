create table if not exists public.purchases (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  price numeric not null check (price >= 0),
  category text not null default 'other',
  priority text not null default 'medium' check (priority in ('low', 'medium', 'high')),
  status text not null default 'active' check (status in ('active', 'planned', 'completed', 'postponed', 'cancelled')),
  created_at text not null,
  is_favorite boolean not null default false
);

create table if not exists public.transactions (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  amount numeric not null check (amount >= 0),
  type text not null check (type in ('income', 'expense')),
  category text not null default 'other',
  created_at text not null
);

alter table public.purchases enable row level security;
alter table public.transactions enable row level security;

drop policy if exists "purchases_owner_select" on public.purchases;
drop policy if exists "purchases_owner_insert" on public.purchases;
drop policy if exists "purchases_owner_update" on public.purchases;
drop policy if exists "purchases_owner_delete" on public.purchases;

create policy "purchases_owner_select"
on public.purchases
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "purchases_owner_insert"
on public.purchases
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "purchases_owner_update"
on public.purchases
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "purchases_owner_delete"
on public.purchases
for delete
to authenticated
using ((select auth.uid()) = user_id);

drop policy if exists "transactions_owner_select" on public.transactions;
drop policy if exists "transactions_owner_insert" on public.transactions;
drop policy if exists "transactions_owner_update" on public.transactions;
drop policy if exists "transactions_owner_delete" on public.transactions;

create policy "transactions_owner_select"
on public.transactions
for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "transactions_owner_insert"
on public.transactions
for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "transactions_owner_update"
on public.transactions
for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "transactions_owner_delete"
on public.transactions
for delete
to authenticated
using ((select auth.uid()) = user_id);

create index if not exists purchases_user_id_created_at_idx
on public.purchases (user_id, created_at desc);

create index if not exists transactions_user_id_created_at_idx
on public.transactions (user_id, created_at desc);
