begin;

do $$
begin
    if not exists (
        select 1 from pg_type t
        join pg_namespace n on n.oid = t.typnamespace
        where t.typname = 'users_roles' and n.nspname = 'public'
    ) then
        create type public.users_roles as enum ('CUSTOMER', 'MANAGER', 'ADMIN');
    end if;
end;
$$;

create table if not exists public.users (
    id uuid primary key references auth.users (id) on delete cascade,
    email text not null unique,
    first_name text,
    last_name text,
    delivery_address text,
    phone_number text,
    role public.users_roles not null,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

comment on table public.users is 'Application user profile records linked to Supabase auth.users.';

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
    select exists (
        select 1
        from public.users u
        where u.id = auth.uid() and u.role = 'ADMIN'
    );
$$;

create or replace function public.users_before_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    actor_id uuid := auth.uid();
    actor_role public.users_roles;
    auth_email text;
begin
    if new.id is null then
        new.id := actor_id;
    end if;

    if actor_id is not null then
        select role into actor_role
        from public.users
        where id = actor_id;

        if new.id is distinct from actor_id and actor_role is distinct from 'ADMIN' then
            raise exception 'Only admins may create users for other identities.' using errcode = '42501';
        end if;
    end if;

    select email into auth_email
    from auth.users
    where id = new.id;

    if auth_email is null then
        raise exception 'Email not found for auth user %', new.id using errcode = '23514';
    end if;

    new.email := auth_email;

    if actor_id is not null and new.id is distinct from actor_id and actor_role = 'ADMIN' then
        if new.role is null then
            raise exception 'Admins must supply role when creating other users.' using errcode = '23514';
        end if;

        if new.role not in ('ADMIN', 'MANAGER') then
            raise exception 'Admins may only assign ADMIN or MANAGER roles.' using errcode = '23514';
        end if;
    else
        new.role := 'CUSTOMER';
    end if;

    if new.created_at is null then
        new.created_at := timezone('utc', now());
    end if;

    new.updated_at := timezone('utc', now());

    return new;
end;
$$;

create or replace function public.users_before_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
    auth_email text;
begin
    if new.id is distinct from old.id then
        raise exception 'User identifier is immutable.' using errcode = '23514';
    end if;

    if new.role is distinct from old.role then
        raise exception 'User role is immutable after creation.' using errcode = '23514';
    end if;

    select email into auth_email
    from auth.users
    where id = old.id;

    if auth_email is not null then
        new.email := auth_email;
    else
        new.email := old.email;
    end if;

    new.updated_at := timezone('utc', now());

    return new;
end;
$$;

drop trigger if exists users_before_insert on public.users;
create trigger users_before_insert
    before insert on public.users
    for each row
    execute function public.users_before_insert();

drop trigger if exists users_before_update on public.users;
create trigger users_before_update
    before update on public.users
    for each row
    execute function public.users_before_update();

alter table public.users enable row level security;

drop policy if exists "Users can select own record" on public.users;
create policy "Users can select own record"
    on public.users
    for select
    using (auth.uid() = id);

drop policy if exists "Admins can select all users" on public.users;
create policy "Admins can select all users"
    on public.users
    for select
    using (public.is_admin());

drop policy if exists "Users can insert own record" on public.users;
create policy "Users can insert own record"
    on public.users
    for insert
    with check (auth.uid() = id);

drop policy if exists "Admins can insert managed users" on public.users;
create policy "Admins can insert managed users"
    on public.users
    for insert
    with check (public.is_admin() and role in ('ADMIN', 'MANAGER'));

drop policy if exists "Users can update own record" on public.users;
create policy "Users can update own record"
    on public.users
    for update
    using (auth.uid() = id and role <> 'MANAGER')
    with check (auth.uid() = id and role <> 'MANAGER');

drop policy if exists "Admins can update all users" on public.users;
create policy "Admins can update all users"
    on public.users
    for update
    using (public.is_admin())
    with check (public.is_admin());

drop policy if exists "Users can delete own record" on public.users;
create policy "Users can delete own record"
    on public.users
    for delete
    using (auth.uid() = id);

drop policy if exists "Admins can delete all users" on public.users;
create policy "Admins can delete all users"
    on public.users
    for delete
    using (public.is_admin());

commit;

