# Database Seeding Instructions

## How to Seed the Database

1. **Open Supabase Dashboard**
   - Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Select your project

2. **Open SQL Editor**
   - Click on "SQL Editor" in the left sidebar
   - Click "New query"

3. **Copy and Paste the Seed Data**
   - Open `scripts/seed-data.sql` 
   - Copy all the contents
   - Paste into the SQL Editor

4. **Run the Query**
   - Click "Run" button (or press Ctrl/Cmd + Enter)
   - Wait for it to complete

5. **Verify Success**
   - You should see success messages at the bottom
   - Check that 8 products, 4 collections, and variants were created

## What Gets Created

### Products (8 total):
1. DEK Pro USB-C Cable - $29.99
2. WEEV Lightning Cable - $24.99
3. Braided Multi Cable 3-in-1 - $34.99
4. Fast Charge USB-C 100W - $39.99
5. Compact Lightning Cable - $19.99
6. DEK Essential USB-C - $22.99
7. Premium Braided Bundle - $49.99
8. Magnetic Charging Cable - $32.99

### Collections (4 total):
1. USB-C Essentials
2. Lightning Collection
3. Multi-Device Solutions
4. Best Sellers

### Variants:
- Multiple color and length combinations for each product
- Proper stock allocation per variant

## Troubleshooting

If you get RLS (Row Level Security) errors:
- The SQL script bypasses RLS when run directly in Supabase SQL Editor
- Make sure you're signed in as the project owner

If products don't appear:
- Check the status column is 'active'
- Verify the RLS policies allow SELECT for public users
