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
  ('Subiaco Primary School', 'Subiaco', '6008', true),
  ('Leederville Primary School', 'Leederville', '6007', true),
  ('Mount Hawthorn Primary School', 'Mount Hawthorn', '6016', true),
  ('North Perth Primary School', 'North Perth', '6006', true),
  ('West Leederville Primary School', 'West Leederville', '6007', true),
  ('Churchlands Primary School', 'Churchlands', '6018', true),
  ('Karrinyup Primary School', 'Karrinyup', '6018', true),
  ('Balcatta Primary School', 'Balcatta', '6021', true),
  ('Nollamara Primary School', 'Nollamara', '6061', true),
  ('Yokine Primary School', 'Yokine', '6060', true)
ON CONFLICT (name) DO NOTHING;