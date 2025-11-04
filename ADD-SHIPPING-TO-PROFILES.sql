-- ============================================
-- ADD SHIPPING INFO TO USER PROFILES
-- Run this in Supabase SQL Editor
-- ============================================

-- Add shipping columns to user_profiles table if they don't exist
ALTER TABLE user_profiles 
ADD COLUMN IF NOT EXISTS shipping_name TEXT,
ADD COLUMN IF NOT EXISTS shipping_phone TEXT,
ADD COLUMN IF NOT EXISTS shipping_address TEXT,
ADD COLUMN IF NOT EXISTS shipping_city TEXT,
ADD COLUMN IF NOT EXISTS shipping_province TEXT,
ADD COLUMN IF NOT EXISTS shipping_postal_code TEXT,
ADD COLUMN IF NOT EXISTS save_shipping_info BOOLEAN DEFAULT false;

-- Update RLS policy for user_profiles to allow updates
DROP POLICY IF EXISTS "Users can update own profile" ON user_profiles;

CREATE POLICY "Users can update own profile"
ON user_profiles FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

SELECT '✅ User profiles updated with shipping info!' as message;
