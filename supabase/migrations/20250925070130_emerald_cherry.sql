/*
  # Add St Simon Peters Primary School - Tuesday - Ocean Reef to schools

  1. New Schools
    - Add "St Simon Peters Primary School - Tuesday - Ocean Reef" as an active school option
  
  2. Changes
    - Insert new school while keeping existing schools active
*/

-- Insert the new school option
INSERT INTO schools (name, suburb, postcode, active) VALUES 
('St Simon Peters Primary School - Tuesday - Ocean Reef', 'Ocean Reef', '6027', true)
ON CONFLICT (name) DO UPDATE SET 
  suburb = EXCLUDED.suburb,
  postcode = EXCLUDED.postcode,
  active = EXCLUDED.active,
  updated_at = now();