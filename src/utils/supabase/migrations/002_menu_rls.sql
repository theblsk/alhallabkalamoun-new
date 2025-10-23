begin;

set local check_function_bodies = off;

create or replace function public.is_staff()
returns boolean
language plpgsql
stable
set search_path = public
as $$
declare
    result boolean := false;
begin
    if auth.uid() is null then
        return false;
    end if;

    if to_regclass('public.users') is null then
        return false;
    end if;

    select exists (
        select 1
        from public.users u
        where u.id = auth.uid()
          and u.role in ('ADMIN', 'MANAGER')
    )
    into result;

    return coalesce(result, false);
end;
$$;

set local check_function_bodies = on;

alter table public.categories enable row level security;
alter table public.categories_translations enable row level security;
alter table public.menu_items enable row level security;
alter table public.menu_items_translations enable row level security;
alter table public.menu_item_price enable row level security;

drop policy if exists "Anyone can view categories" on public.categories;
create policy "Anyone can view categories"
    on public.categories
    for select
    using (true);

drop policy if exists "Staff can insert categories" on public.categories;
create policy "Staff can insert categories"
    on public.categories
    for insert
    with check (public.is_staff());

drop policy if exists "Staff can update categories" on public.categories;
create policy "Staff can update categories"
    on public.categories
    for update
    using (public.is_staff())
    with check (public.is_staff());

drop policy if exists "Staff can delete categories" on public.categories;
create policy "Staff can delete categories"
    on public.categories
    for delete
    using (public.is_staff());

drop policy if exists "Anyone can view category translations" on public.categories_translations;
create policy "Anyone can view category translations"
    on public.categories_translations
    for select
    using (true);

drop policy if exists "Staff can insert category translations" on public.categories_translations;
create policy "Staff can insert category translations"
    on public.categories_translations
    for insert
    with check (public.is_staff());

drop policy if exists "Staff can update category translations" on public.categories_translations;
create policy "Staff can update category translations"
    on public.categories_translations
    for update
    using (public.is_staff())
    with check (public.is_staff());

drop policy if exists "Staff can delete category translations" on public.categories_translations;
create policy "Staff can delete category translations"
    on public.categories_translations
    for delete
    using (public.is_staff());

drop policy if exists "Anyone can view menu items" on public.menu_items;
create policy "Anyone can view menu items"
    on public.menu_items
    for select
    using (true);

drop policy if exists "Staff can insert menu items" on public.menu_items;
create policy "Staff can insert menu items"
    on public.menu_items
    for insert
    with check (public.is_staff());

drop policy if exists "Staff can update menu items" on public.menu_items;
create policy "Staff can update menu items"
    on public.menu_items
    for update
    using (public.is_staff())
    with check (public.is_staff());

drop policy if exists "Staff can delete menu items" on public.menu_items;
create policy "Staff can delete menu items"
    on public.menu_items
    for delete
    using (public.is_staff());

drop policy if exists "Anyone can view menu item translations" on public.menu_items_translations;
create policy "Anyone can view menu item translations"
    on public.menu_items_translations
    for select
    using (true);

drop policy if exists "Staff can insert menu item translations" on public.menu_items_translations;
create policy "Staff can insert menu item translations"
    on public.menu_items_translations
    for insert
    with check (public.is_staff());

drop policy if exists "Staff can update menu item translations" on public.menu_items_translations;
create policy "Staff can update menu item translations"
    on public.menu_items_translations
    for update
    using (public.is_staff())
    with check (public.is_staff());

drop policy if exists "Staff can delete menu item translations" on public.menu_items_translations;
create policy "Staff can delete menu item translations"
    on public.menu_items_translations
    for delete
    using (public.is_staff());

drop policy if exists "Anyone can view menu item prices" on public.menu_item_price;
create policy "Anyone can view menu item prices"
    on public.menu_item_price
    for select
    using (true);

drop policy if exists "Staff can insert menu item prices" on public.menu_item_price;
create policy "Staff can insert menu item prices"
    on public.menu_item_price
    for insert
    with check (public.is_staff());

drop policy if exists "Staff can update menu item prices" on public.menu_item_price;
create policy "Staff can update menu item prices"
    on public.menu_item_price
    for update
    using (public.is_staff())
    with check (public.is_staff());

drop policy if exists "Staff can delete menu item prices" on public.menu_item_price;
create policy "Staff can delete menu item prices"
    on public.menu_item_price
    for delete
    using (public.is_staff());

commit;


