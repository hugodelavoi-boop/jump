/*
  # Add INSERT policy for enrollments table

  1. Security
    - Add policy for authenticated users to insert their own enrollment data
    - Ensures users can only create enrollments for themselves

  2. Changes
    - CREATE POLICY for INSERT operations on enrollments table
    - Policy allows authenticated users to insert records where user_id matches their auth.uid()
*/

CREATE POLICY "Users can insert their own enrollments"
  ON enrollments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);