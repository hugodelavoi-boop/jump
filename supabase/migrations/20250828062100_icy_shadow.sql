@@ .. @@
 /*
   # Populate schools table
 
   1. New Data
-    - Multiple Perth schools where Jump Start Sports operates
-    - Each school includes name, suburb, and postcode information
+    - Single tester school for testing purposes
+    - School includes name, suburb, and postcode information
   2. Security
     - Schools are publicly readable for enrollment forms
 */
 
-INSERT INTO schools (name, suburb, postcode) VALUES
-  ('Subiaco Primary School', 'Subiaco', '6008'),
-  ('Leederville Primary School', 'Leederville', '6007'),
-  ('Mount Hawthorn Primary School', 'Mount Hawthorn', '6016'),
-  ('North Perth Primary School', 'North Perth', '6006'),
-  ('West Leederville Primary School', 'West Leederville', '6007'),
-  ('Churchlands Primary School', 'Churchlands', '6018'),
-  ('Floreat Park Primary School', 'Floreat', '6014'),
-  ('Wembley Primary School', 'Wembley', '6014'),
-  ('City Beach Primary School', 'City Beach', '6015'),
-  ('Scarborough Primary School', 'Scarborough', '6019')
+INSERT INTO schools (name, suburb, postcode) VALUES
+  ('Tester School', 'suburb', '1234')
 ON CONFLICT (name) DO NOTHING;