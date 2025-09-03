/*
  # Update schools to only show Beldon Primary - Wednesday

  1. Changes
    - Remove all existing schools
    - Add only "Beldon Primary - Wednesday" as the available school option
  
  2. Security
    - Maintains existing RLS policies
    - No changes to table structure
*/

-- Clear existing schools and add only Beldon Primary - Wednesday
DELETE FROM schools;

INSERT INTO schools (name, suburb, postcode, active) VALUES 
('Beldon Primary - Wednesday', 'Beldon', '6027', true);