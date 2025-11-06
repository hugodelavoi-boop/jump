/*
  # Add mobile column to enrollments table

  1. Changes
    - Add `mobile` column to enrollments table (was missing from original schema)
    - Update user_enrollments view to include mobile field
  
  2. Security
    - Maintains existing RLS policies
    - No changes to security model
*/

-- Add mobile column if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrollments' AND column_name = 'mobile'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN mobile text;
  END IF;
END $$;

-- Recreate the user_enrollments view to include mobile
DROP VIEW IF EXISTS user_enrollments;

CREATE VIEW user_enrollments WITH (security_invoker = true) AS
SELECT
  e.id,
  e.user_id,
  e.parent_name,
  e.email,
  e.mobile,
  e.child_name,
  e.child_age,
  e.child_school,
  e.medical_info,
  e.program_id,
  e.requires_pickup,
  e.photo_permission,
  e.checkout_session_id,
  e.status,
  e.created_at,
  e.updated_at,
  p.name as program_name,
  p.description as program_description
FROM enrollments e
LEFT JOIN stripe_products p ON e.program_id = p.price_id
WHERE e.user_id = auth.uid()
AND e.deleted_at IS NULL
ORDER BY e.created_at DESC;

GRANT SELECT ON user_enrollments TO authenticated;
