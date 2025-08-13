-- Seed initial products
INSERT INTO stripe_products (product_id, price_id, name, description, mode)
VALUES
  ('prod_before_school', 'price_before_school', 'Before School Program - Term 1', 'Fun, energetic morning sessions to start the day right. Includes breakfast and structured activities.', 'payment'),
  ('prod_after_school', 'price_after_school', 'After School Program - Term 1', 'Engaging afternoon sessions with mixed sports and activities. Includes healthy snacks.', 'payment'),
  ('prod_holiday_camp', 'price_holiday_camp', 'School Holiday Camp', 'Full-day holiday program packed with sports, games, and activities.', 'payment')
ON CONFLICT (product_id) DO NOTHING;