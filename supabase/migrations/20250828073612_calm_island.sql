/*
  # Add mobile field to enrollments table

  1. Schema Changes
    - Add `mobile` column to `enrollments` table
    - Set as text type, not null with default empty string

  2. Security
    - No RLS changes needed (inherits existing policies)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'enrollments' AND column_name = 'mobile'
  ) THEN
    ALTER TABLE enrollments ADD COLUMN mobile text NOT NULL DEFAULT '';
  END IF;
END $$;