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
+  ('Tester School', 'suburb', '1234')
 ON CONFLICT (name) DO NOTHING;