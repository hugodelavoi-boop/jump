-- Create products table
CREATE TABLE IF NOT EXISTS stripe_products (
  id bigint primary key generated always as identity,
  product_id text not null unique,
  price_id text not null unique,
  name text not null,
  description text,
  mode text not null,
  active boolean not null default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  deleted_at timestamp with time zone default null
);

ALTER TABLE stripe_products ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active products"
  ON stripe_products
  FOR SELECT
  TO authenticated
  USING (active = true AND deleted_at IS NULL);

-- Create view for active products
CREATE VIEW active_products WITH (security_invoker = true) AS
SELECT *
FROM stripe_products
WHERE active = true
AND deleted_at IS NULL
ORDER BY created_at DESC;

GRANT SELECT ON active_products TO authenticated;