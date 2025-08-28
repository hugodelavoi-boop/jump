/*
  # Update schools to only show tester school

  1. Changes
    - Remove all existing schools by setting active = false
    - Add only the tester school with specified details
  
  2. New Schools
    - `Tester School` in suburb 'suburb' with postcode '1234'
*/

-- Deactivate all existing schools
UPDATE schools SET active = false WHERE active = true;

-- Insert the single tester school
INSERT INTO schools (name, suburb, postcode, active) 
VALUES ('Tester School', 'suburb', '1234', true)
ON CONFLICT (name) DO UPDATE SET 
  suburb = EXCLUDED.suburb,
  postcode = EXCLUDED.postcode,
  active = EXCLUDED.active,
  updated_at = now();