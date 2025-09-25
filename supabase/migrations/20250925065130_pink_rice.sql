/*
  # Add St Simon Peter Primary School - Tuesday to schools

  1. New Schools
    - Add "St Simon Peter Primary School - Tuesday" as an active school option
  
  2. Changes
    - Insert new school while keeping existing schools active
*/

-- Insert the new school option
INSERT INTO schools (name, suburb, postcode, active) VALUES 
('St Simon Peter Primary School - Tuesday', 'Rowville', '3178', true)
ON CONFLICT (name) DO UPDATE SET 
  suburb = EXCLUDED.suburb,
  postcode = EXCLUDED.postcode,
  active = EXCLUDED.active,
  updated_at = now();