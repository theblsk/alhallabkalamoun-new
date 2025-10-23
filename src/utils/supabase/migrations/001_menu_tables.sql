begin;

create extension if not exists pgcrypto;

create table if not exists public.categories (
    id uuid primary key default gen_random_uuid(),
    slug text not null unique,
    name text not null,
    description text,
    display_order int not null default 0,
    is_active boolean not null default true,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now()),
    constraint categories_display_order_non_negative check (display_order >= 0)
);

create table if not exists public.categories_translations (
    id uuid primary key default gen_random_uuid(),
    category_id uuid not null references public.categories(id) on delete cascade,
    locale text not null,
    name text not null,
    description text,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists categories_translations_locale_key
    on public.categories_translations (category_id, locale);

create table if not exists public.menu_items (
    id uuid primary key default gen_random_uuid(),
    category_id uuid not null references public.categories(id) on delete cascade,
    slug text not null unique,
    name text not null,
    description text,
    image_key text,
    availability boolean not null default true,
    is_active boolean not null default true,
    max_order_size jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now()),
    constraint menu_items_max_order_size_is_object check (
        max_order_size is null
        or jsonb_typeof(max_order_size) = 'object'
    )
);

create table if not exists public.menu_items_translations (
    id uuid primary key default gen_random_uuid(),
    menu_item_id uuid not null references public.menu_items(id) on delete cascade,
    locale text not null,
    name text not null,
    description text,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now())
);

create unique index if not exists menu_items_translations_locale_key
    on public.menu_items_translations (menu_item_id, locale);

do $$
begin
    if not exists (
        select 1 from pg_type t
        join pg_namespace n on n.oid = t.typnamespace
        where t.typname = 'sell_unit' and n.nspname = 'public'
    ) then
        create type public.sell_unit as enum ('gram', 'box');
    end if;
end;
$$;

create table if not exists public.menu_item_price (
    id uuid primary key default gen_random_uuid(),
    menu_item_id uuid not null references public.menu_items(id) on delete cascade,
    type public.sell_unit not null,
    count int not null,
    price int not null,
    created_at timestamptz not null default timezone('utc', now()),
    updated_at timestamptz not null default timezone('utc', now()),
    constraint menu_item_price_count_positive check (count > 0),
    constraint menu_item_price_price_non_negative check (price >= 0)
);

create unique index if not exists menu_item_price_unique_unit
    on public.menu_item_price (menu_item_id, type);

commit;
