/*
  # Add price display column to stripe_products table

  1. Schema Changes
    - Add `price_display` column to `stripe_products` table for formatted price display
  
  2. Data Migration
    - Set default value for existing records
  
  3. View Updates
    - Update `active_products` view to include price_display column
*/

-- Add price_display column to stripe_products table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'stripe_products' AND column_name = 'price_display'
  ) THEN
    ALTER TABLE stripe_products ADD COLUMN price_display text DEFAULT 'Contact for pricing';
  END IF;
END $$;

-- Update the active_products view to include price_display
DROP VIEW IF EXISTS active_products;

CREATE VIEW active_products AS
SELECT 
  id,
  product_id,
  price_id,
  name,
  description,
  mode,
  active,
  price_display,
  created_at,
  updated_at,
  deleted_at
FROM stripe_products
WHERE active = true AND deleted_at IS NULL;