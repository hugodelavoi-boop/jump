/*
  # Populate schools table with initial school data

  1. New Data
    - Add initial set of Perth schools where Jump Start Sports operates
    - Each school includes name, suburb, and postcode for identification
  
  2. Management
    - Schools can be managed by updating the active status
    - New schools can be added through database operations
    - Provides controlled list for enrollment dropdown
*/

-- Insert initial schools (only if they don't already exist)
INSERT INTO schools (name, suburb, postcode, active) VALUES
  ('JumpStartSport', 'Suburb', '1234', true)
ON CONFLICT (name) DO NOTHING;