/*
  # Create schools table for enrollment form

  1. New Tables
    - `schools`
      - `id` (bigint, primary key)
      - `name` (text, unique)
      - `suburb` (text)
      - `postcode` (text)
      - `active` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `schools` table
    - Add policy for public read access to active schools
    - Add policy for authenticated users to suggest new schools

  3. Initial Data
    - Insert common Perth primary schools
*/

CREATE TABLE IF NOT EXISTS schools (
  id bigint PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name text UNIQUE NOT NULL,
  suburb text,
  postcode text,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE schools ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active schools
CREATE POLICY "Public can read active schools"
  ON schools
  FOR SELECT
  TO public
  USING (active = true);

-- Allow authenticated users to suggest new schools
CREATE POLICY "Authenticated users can suggest schools"
  ON schools
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert common Perth primary schools
INSERT INTO schools (name, suburb, postcode) VALUES
ON CONFLICT (name) DO NOTHING;