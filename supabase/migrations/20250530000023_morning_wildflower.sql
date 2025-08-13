-- Create enrollments table
CREATE TABLE IF NOT EXISTS enrollments (
  id bigint primary key generated always as identity,
  user_id uuid references auth.users(id) not null,
  parent_name text not null,
  email text not null,
  child_name text not null,
  child_age text not null,
  child_school text not null,
  medical_info text,
  program_id text not null,
  requires_pickup boolean not null default false,
  photo_permission boolean not null default false,
  checkout_session_id text,
  status text not null default 'pending',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  deleted_at timestamp with time zone default null
);

ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own enrollments"
  ON enrollments
  FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() AND deleted_at IS NULL);

-- Create view for user enrollments
CREATE VIEW user_enrollments WITH (security_invoker = true) AS
SELECT
  e.*,
  p.name as program_name,
  p.description as program_description
FROM enrollments e
JOIN stripe_products p ON e.program_id = p.price_id
WHERE e.user_id = auth.uid()
AND e.deleted_at IS NULL
ORDER BY e.created_at DESC;

GRANT SELECT ON user_enrollments TO authenticated;