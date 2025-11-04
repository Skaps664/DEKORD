-- ============================================
-- FIX RLS POLICIES FOR ORDERS TABLE
-- Run this in Supabase SQL Editor
-- ============================================

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own orders" ON orders;
DROP POLICY IF EXISTS "Users can create their own orders" ON orders;
DROP POLICY IF EXISTS "Users can view their own order items" ON order_items;
DROP POLICY IF EXISTS "Users can create order items" ON order_items;

-- Enable RLS
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- ORDERS TABLE POLICIES
-- Allow users to view their own orders
CREATE POLICY "Users can view their own orders"
ON orders FOR SELECT
USING (auth.uid() = user_id);

-- Allow users to create their own orders
CREATE POLICY "Users can create their own orders"
ON orders FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- Allow users to update their own orders (optional - for order cancellation)
CREATE POLICY "Users can update their own orders"
ON orders FOR UPDATE
USING (auth.uid() = user_id);

-- ORDER_ITEMS TABLE POLICIES
-- Allow users to view their order items
CREATE POLICY "Users can view their own order items"
ON order_items FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Allow users to create order items for their orders
CREATE POLICY "Users can create order items"
ON order_items FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM orders
    WHERE orders.id = order_items.order_id
    AND orders.user_id = auth.uid()
  )
);

-- Verify policies
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename IN ('orders', 'order_items')
ORDER BY tablename, policyname;

SELECT '✅ RLS policies updated successfully!' as message;
