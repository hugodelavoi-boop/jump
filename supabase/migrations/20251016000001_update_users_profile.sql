/*
  # Update users table for profile customization

  1. Changes
    - Split `full_name` into `first_name` and `last_name` columns
    - Rename `phone` to `mobile` for consistency with enrollment forms
    - Migrate existing data to new structure
    - Update trigger function to handle new fields

  2. Security
    - Maintains existing RLS policies
    - No changes to security model
*/

-- Add new columns
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'first_name'
  ) THEN
    ALTER TABLE users ADD COLUMN first_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'last_name'
  ) THEN
    ALTER TABLE users ADD COLUMN last_name text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'users' AND column_name = 'mobile'
  ) THEN
    ALTER TABLE users ADD COLUMN mobile text;
  END IF;
END $$;

-- Migrate existing full_name data to first_name and last_name
DO $$
BEGIN
  UPDATE users
  SET
    first_name = COALESCE(SPLIT_PART(full_name, ' ', 1), ''),
    last_name = COALESCE(NULLIF(SUBSTRING(full_name FROM POSITION(' ' IN full_name) + 1), ''), '')
  WHERE full_name IS NOT NULL AND (first_name IS NULL OR last_name IS NULL);
END $$;

-- Migrate phone to mobile if mobile is empty
DO $$
BEGIN
  UPDATE users
  SET mobile = phone
  WHERE phone IS NOT NULL AND mobile IS NULL;
END $$;

-- Update the trigger function to handle new fields
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, full_name)
  VALUES (
    new.id,
    new.email,
    new.raw_user_meta_data->>'first_name',
    new.raw_user_meta_data->>'last_name',
    COALESCE(
      new.raw_user_meta_data->>'full_name',
      CONCAT_WS(' ', new.raw_user_meta_data->>'first_name', new.raw_user_meta_data->>'last_name')
    )
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating updated_at
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'update_users_updated_at'
  ) THEN
    CREATE TRIGGER update_users_updated_at
      BEFORE UPDATE ON users
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;
