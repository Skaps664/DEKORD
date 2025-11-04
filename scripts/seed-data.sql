-- ============================================
-- SEED DATA FOR DEKORD E-COMMERCE
-- Run this in Supabase SQL Editor
-- This script is idempotent - safe to run multiple times
-- ============================================

-- Clear existing data (optional - comment out if you want to keep existing data)
-- DELETE FROM collection_products;
-- DELETE FROM product_variants;
-- DELETE FROM collections;
-- DELETE FROM products;

-- Insert Products (skip if already exists)
INSERT INTO products (name, slug, description, price, category, stock, main_image) VALUES
('DEK Pro USB-C Cable', 'dek-pro-usb-c-cable', 'Premium braided USB-C cable with fast charging support up to 100W. Features reinforced stress points and tangle-free design.', 8999, 'USB-C', 150, '/modern-armchair-pillows.png'),
('WEEV Lightning Cable', 'weev-lightning-cable', 'MFi certified Lightning cable for iPhone and iPad. Supports fast charging and high-speed data transfer.', 7499, 'Lightning', 200, '/modular-cushion-bench.png'),
('Braided Multi Cable 3-in-1', 'braided-multi-cable-3-in-1', 'Universal 3-in-1 cable with USB-C, Lightning, and Micro-USB connectors. Perfect for charging multiple devices.', 10499, 'Multi', 100, '/distressed-artistic-chair.png'),
('Fast Charge USB-C 100W', 'fast-charge-usb-c-100w', 'High-performance USB-C cable supporting 100W Power Delivery. Ideal for laptops and fast charging devices.', 11999, 'USB-C', 80, '/green-modular-loveseat.png'),
('Compact Lightning Cable', 'compact-lightning-cable', 'Compact and portable Lightning cable. Perfect for travel and everyday use.', 5999, 'Lightning', 250, '/braided-rope-loveseat.png'),
('DEK Essential USB-C', 'dek-essential-usb-c', 'Essential USB-C cable for everyday charging and data transfer. Reliable and affordable.', 6899, 'USB-C', 300, '/colorful-patchwork-sofa.png'),
('Premium Braided Bundle', 'premium-braided-bundle', 'Complete charging solution with 3 premium braided cables: USB-C, Lightning, and Micro-USB.', 14999, 'Bundle', 50, '/minimalist-boucle-loveseat.png'),
('Magnetic Charging Cable', 'magnetic-charging-cable', 'Innovative magnetic charging cable with interchangeable tips. Supports USB-C, Lightning, and Micro-USB.', 9899, 'Magnetic', 120, '/abstract-artistic-sofa.png')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  category = EXCLUDED.category,
  stock = EXCLUDED.stock,
  main_image = EXCLUDED.main_image;

-- Insert Product Variants
-- First, delete existing variants for these products to avoid duplicates
DELETE FROM product_variants WHERE product_id IN (SELECT id FROM products WHERE slug IN (
  'dek-pro-usb-c-cable', 'weev-lightning-cable'
));

-- DEK Pro USB-C Cable variants
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'dek-pro-usb-c-cable-black-0.5m', 'Midnight Black', '0.5m', 17 FROM products WHERE slug = 'dek-pro-usb-c-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'dek-pro-usb-c-cable-black-1m', 'Midnight Black', '1m', 17 FROM products WHERE slug = 'dek-pro-usb-c-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'dek-pro-usb-c-cable-black-2m', 'Midnight Black', '2m', 17 FROM products WHERE slug = 'dek-pro-usb-c-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'dek-pro-usb-c-cable-white-0.5m', 'Pearl White', '0.5m', 17 FROM products WHERE slug = 'dek-pro-usb-c-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'dek-pro-usb-c-cable-white-1m', 'Pearl White', '1m', 17 FROM products WHERE slug = 'dek-pro-usb-c-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'dek-pro-usb-c-cable-white-2m', 'Pearl White', '2m', 17 FROM products WHERE slug = 'dek-pro-usb-c-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'dek-pro-usb-c-cable-gray-0.5m', 'Space Gray', '0.5m', 17 FROM products WHERE slug = 'dek-pro-usb-c-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'dek-pro-usb-c-cable-gray-1m', 'Space Gray', '1m', 17 FROM products WHERE slug = 'dek-pro-usb-c-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'dek-pro-usb-c-cable-gray-2m', 'Space Gray', '2m', 16 FROM products WHERE slug = 'dek-pro-usb-c-cable';

-- WEEV Lightning Cable variants
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'weev-lightning-cable-black-1m', 'Black', '1m', 34 FROM products WHERE slug = 'weev-lightning-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'weev-lightning-cable-black-1.5m', 'Black', '1.5m', 33 FROM products WHERE slug = 'weev-lightning-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'weev-lightning-cable-black-2m', 'Black', '2m', 33 FROM products WHERE slug = 'weev-lightning-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'weev-lightning-cable-navy-1m', 'Navy Blue', '1m', 34 FROM products WHERE slug = 'weev-lightning-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'weev-lightning-cable-navy-1.5m', 'Navy Blue', '1.5m', 33 FROM products WHERE slug = 'weev-lightning-cable';
INSERT INTO product_variants (product_id, sku, color, length, stock) 
SELECT id, 'weev-lightning-cable-navy-2m', 'Navy Blue', '2m', 33 FROM products WHERE slug = 'weev-lightning-cable';

-- Insert Collections (skip if already exists)
INSERT INTO collections (name, slug, description, image) VALUES
('USB-C Essentials', 'usb-c-essentials', 'Premium USB-C cables for all your charging needs', '/modern-armchair-pillows.png'),
('Lightning Collection', 'lightning-collection', 'MFi certified Lightning cables for iPhone and iPad', '/modular-cushion-bench.png'),
('Multi-Device Solutions', 'multi-device-solutions', 'Universal cables for charging multiple devices', '/distressed-artistic-chair.png'),
('Best Sellers', 'best-sellers', 'Our most popular charging cables', '/green-modular-loveseat.png')
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image;

-- Link Products to Collections
-- First, delete existing collection-product links to avoid duplicates
DELETE FROM collection_products WHERE collection_id IN (
  SELECT id FROM collections WHERE slug IN ('usb-c-essentials', 'lightning-collection', 'multi-device-solutions', 'best-sellers')
);

-- USB-C Essentials
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT c.id, p.id, 0 FROM collections c, products p WHERE c.slug = 'usb-c-essentials' AND p.slug = 'dek-pro-usb-c-cable';
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT c.id, p.id, 1 FROM collections c, products p WHERE c.slug = 'usb-c-essentials' AND p.slug = 'fast-charge-usb-c-100w';
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT c.id, p.id, 2 FROM collections c, products p WHERE c.slug = 'usb-c-essentials' AND p.slug = 'dek-essential-usb-c';

-- Lightning Collection
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT c.id, p.id, 0 FROM collections c, products p WHERE c.slug = 'lightning-collection' AND p.slug = 'weev-lightning-cable';
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT c.id, p.id, 1 FROM collections c, products p WHERE c.slug = 'lightning-collection' AND p.slug = 'compact-lightning-cable';

-- Multi-Device Solutions
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT c.id, p.id, 0 FROM collections c, products p WHERE c.slug = 'multi-device-solutions' AND p.slug = 'braided-multi-cable-3-in-1';
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT c.id, p.id, 1 FROM collections c, products p WHERE c.slug = 'multi-device-solutions' AND p.slug = 'magnetic-charging-cable';

-- Best Sellers (featured products)
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT c.id, p.id, 0 FROM collections c, products p WHERE c.slug = 'best-sellers' AND p.slug = 'dek-pro-usb-c-cable';
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT c.id, p.id, 1 FROM collections c, products p WHERE c.slug = 'best-sellers' AND p.slug = 'weev-lightning-cable';
INSERT INTO collection_products (collection_id, product_id, sort_order)
SELECT c.id, p.id, 2 FROM collections c, products p WHERE c.slug = 'best-sellers' AND p.slug = 'premium-braided-bundle';

-- Success message
SELECT 'Database seeded successfully!' as message;
SELECT 'Products created: ' || COUNT(*) as products FROM products;
SELECT 'Collections created: ' || COUNT(*) as collections FROM collections;
SELECT 'Variants created: ' || COUNT(*) as variants FROM product_variants;
