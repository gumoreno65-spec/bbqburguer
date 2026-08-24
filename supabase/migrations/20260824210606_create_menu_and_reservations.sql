/*
# Create menu_items and reservations tables

1. New Tables
- `menu_items`: stores the burger restaurant's menu (burgers, sides, drinks, desserts).
  - `id` (uuid, primary key)
  - `name` (text, not null) - dish name
  - `description` (text) - short description
  - `price` (numeric, not null) - price in BRL
  - `category` (text, not null) - e.g. 'burgers', 'sides', 'drinks', 'desserts'
  - `image_url` (text) - photo URL
  - `is_featured` (boolean, default false) - highlighted items
  - `is_available` (boolean, default true) - shown/hidden on menu
  - `sort_order` (integer, default 0) - display ordering
  - `created_at` (timestamptz)
- `reservations`: stores customer table booking requests.
  - `id` (uuid, primary key)
  - `name` (text, not null) - customer name
  - `email` (text, not null) - contact email
  - `phone` (text, not null) - contact phone
  - `party_size` (integer, not null) - number of guests
  - `reservation_date` (date, not null) - date of booking
  - `reservation_time` (text, not null) - time slot
  - `notes` (text) - special requests
  - `status` (text, default 'pending') - pending / confirmed / cancelled
  - `created_at` (timestamptz)

2. Security
- Enable RLS on both tables.
- menu_items: public read (anon + authenticated), no public writes (managed by admin).
- reservations: public insert (anyone can book), public read of their own submission is not needed;
  we allow anon insert so the booking form works without sign-in. Read/update/delete restricted
  to authenticated (admin) only — but since this is a no-auth app, we allow anon insert only and
  no public read of reservations to protect customer privacy.

3. Important Notes
- This is a single-tenant, no-auth app. The frontend uses the anon key.
- menu_items uses USING (true) for SELECT because the menu is intentionally public.
- reservations INSERT uses WITH CHECK (true) because anyone may submit a booking.
- reservations SELECT/UPDATE/DELETE are NOT given to anon, so customer data stays private.
*/

CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  price numeric(10,2) NOT NULL,
  category text NOT NULL,
  image_url text,
  is_featured boolean NOT NULL DEFAULT false,
  is_available boolean NOT NULL DEFAULT true,
  sort_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_read_menu_items" ON menu_items;
CREATE POLICY "public_read_menu_items" ON menu_items FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  party_size integer NOT NULL,
  reservation_date date NOT NULL,
  reservation_time text NOT NULL,
  notes text,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE reservations ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_reservations" ON reservations;
CREATE POLICY "public_insert_reservations" ON reservations FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_read_reservations" ON reservations;
CREATE POLICY "authenticated_read_reservations" ON reservations FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "authenticated_update_reservations" ON reservations;
CREATE POLICY "authenticated_update_reservations" ON reservations FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "authenticated_delete_reservations" ON reservations;
CREATE POLICY "authenticated_delete_reservations" ON reservations FOR DELETE
  TO authenticated USING (true);
