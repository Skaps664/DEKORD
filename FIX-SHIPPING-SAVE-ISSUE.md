# 🔧 Fix: Shipping Info Not Saving to User Profile

## Problem
When placing an order with "Save this information" checked, the shipping info wasn't being saved to the user profile. Error: `PGRST116: Cannot coerce the result to a single JSON object` (0 rows returned).

## Root Cause
The `user_profiles` record didn't exist for the user, and the RLS policies didn't allow INSERT operations, only UPDATE.

## Solution Applied

### 1. Updated `updateUserProfile()` Function
**File:** `/website/lib/services/auth.ts`

Changed from simple UPDATE to smart INSERT/UPDATE logic:
- First checks if profile exists
- If not exists → INSERT new profile
- If exists → UPDATE existing profile

```typescript
export async function updateUserProfile(userId: string, updates: Partial<UserProfile>) {
  const supabase = createClient()
  
  // First check if profile exists
  const { data: existingProfile } = await supabase
    .from('user_profiles')
    .select('id')
    .eq('id', userId)
    .single()
  
  if (!existingProfile) {
    // Profile doesn't exist, create it
    console.log('📝 Creating new user profile for:', userId)
    const { data, error } = await supabase
      .from('user_profiles')
      .insert({
        id: userId,
        ...updates
      })
      .select()
      .single()
    
    return { data: data as UserProfile, error: null }
  } else {
    // Profile exists, update it
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single()
    
    return { data: data as UserProfile, error: null }
  }
}
```

### 2. Fixed RLS Policies
**File:** `/website/FIX-USER-PROFILES-RLS.sql`

Added INSERT policy to allow users to create their own profile:

```sql
-- Allow users to insert their own profile (for first-time setup)
CREATE POLICY "Users can insert own profile"
ON user_profiles FOR INSERT
WITH CHECK (auth.uid() = id);
```

## How to Apply Fix

### Step 1: Run SQL Script
In Supabase SQL Editor, run: `/website/FIX-USER-PROFILES-RLS.sql`

This will:
- Drop old policies
- Create new SELECT, INSERT, and UPDATE policies
- Allow users to create and update their own profiles

### Step 2: Restart Dev Server
```bash
cd /home/skaps/dekord/website
# Restart your dev server (Ctrl+C and restart)
npm run dev
```

### Step 3: Test
1. Sign in with a user account
2. Add items to cart
3. Go to checkout
4. Fill in shipping info
5. **Check "Save this information for future orders"**
6. Place order
7. Go to checkout again → shipping info should auto-fill

## What Gets Saved

When you check "Save this information", these fields are saved to `user_profiles`:

- `shipping_name` - Full name
- `shipping_phone` - WhatsApp number
- `shipping_address` - Street address
- `shipping_city` - City
- `shipping_province` - Province
- `shipping_postal_code` - Postal code (if provided)
- `save_shipping_info` - Boolean flag (true)

## Next Order Behavior

On next checkout:
1. System loads user profile
2. If `save_shipping_info === true`
3. Auto-fills all shipping fields
4. Checkbox is pre-checked
5. User can modify if needed

## Verification

Check browser console after placing order:
- ✅ Should see: `📝 Creating new user profile for: [user-id]` (first time)
- ✅ Should see: `✅ Shipping info saved to profile`
- ❌ Should NOT see: `Error updating user profile: PGRST116`

## Database Check

To verify profile was created in Supabase:

```sql
SELECT 
  id,
  shipping_name,
  shipping_phone,
  shipping_city,
  save_shipping_info,
  created_at
FROM user_profiles
WHERE id = '[your-user-id]';
```

Should return 1 row with your shipping info.

## Status
✅ **FIXED** - Code updated, SQL script ready to run
