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
  ('Subiaco Primary School', 'Subiaco', '6008'),
  ('Leederville Primary School', 'Leederville', '6007'),
  ('Mount Hawthorn Primary School', 'Mount Hawthorn', '6016'),
  ('North Perth Primary School', 'North Perth', '6006'),
  ('West Leederville Primary School', 'West Leederville', '6007'),
  ('Churchlands Primary School', 'Churchlands', '6018'),
  ('Floreat Park Primary School', 'Floreat', '6014'),
  ('Wembley Primary School', 'Wembley', '6014'),
  ('City Beach Primary School', 'City Beach', '6015'),
  ('Scarborough Primary School', 'Scarborough', '6019'),
  ('Doubleview Primary School', 'Doubleview', '6018'),
  ('Woodlands Primary School', 'Woodlands', '6018'),
  ('Yokine Primary School', 'Yokine', '6060'),
  ('Nollamara Primary School', 'Nollamara', '6061'),
  ('Balcatta Primary School', 'Balcatta', '6021'),
  ('Mirrabooka Primary School', 'Mirrabooka', '6061'),
  ('Warwick Primary School', 'Warwick', '6024'),
  ('Dianella Primary School', 'Dianella', '6059'),
  ('Morley Primary School', 'Morley', '6062'),
  ('Inglewood Primary School', 'Inglewood', '6052')
ON CONFLICT (name) DO NOTHING;