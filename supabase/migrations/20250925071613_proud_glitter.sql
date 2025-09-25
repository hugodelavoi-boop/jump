/*
  # Fix schools list to show correct options

  1. Changes
    - Clear existing schools
    - Add the two desired school options:
      - Beldon Primary - Wednesday
      - St Simon Peter Primary School - Tuesday
  
  2. Security
    - Maintains existing RLS policies
    - No changes to table structure
*/

-- Clear all existing schools
UPDATE schools SET active = false WHERE active = true;

-- Insert the correct school options
INSERT INTO schools (name, suburb, postcode, active) VALUES 
('Beldon Primary - Wednesday', 'Beldon', '6027', true),
('St Simon Peter Primary School - Tuesday', 'Rowville', '3178', true)
ON CONFLICT (name) DO UPDATE SET 
  suburb = EXCLUDED.suburb,
  postcode = EXCLUDED.postcode,
  active = EXCLUDED.active,
  updated_at = now();