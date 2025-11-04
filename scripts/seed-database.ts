/**
 * Database Seeding Script
 * Run this to populate the database with example products and collections
 * 
 * Usage: npx tsx scripts/seed-database.ts
 */

import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(__dirname, '../.env.local') })

// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing environment variables')
  console.error('Make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function seedProducts() {
  console.log('🔵 Seeding products...')

  const products = [
    {
      name: 'DEK Pro USB-C Cable',
      slug: 'dek-pro-usb-c-cable',
      description: 'Premium braided USB-C cable with fast charging support up to 100W. Features reinforced stress points and tangle-free design.',
      price: 29.99,
      category: 'USB-C',
      stock: 150,
      main_image: '/modern-armchair-pillows.png',
      colors: ['Midnight Black', 'Pearl White', 'Space Gray'],
      lengths: ['0.5m', '1m', '2m']
    },
    {
      name: 'WEEV Lightning Cable',
      slug: 'weev-lightning-cable',
      description: 'MFi certified Lightning cable for iPhone and iPad. Supports fast charging and high-speed data transfer.',
      price: 24.99,
      category: 'Lightning',
      stock: 200,
      main_image: '/modular-cushion-bench.png',
      colors: ['Black', 'Navy Blue'],
      lengths: ['1m', '1.5m', '2m']
    },
    {
      name: 'Braided Multi Cable 3-in-1',
      slug: 'braided-multi-cable-3-in-1',
      description: 'Universal 3-in-1 cable with USB-C, Lightning, and Micro-USB connectors. Perfect for charging multiple devices.',
      price: 34.99,
      category: 'Multi',
      stock: 100,
      main_image: '/distressed-artistic-chair.png',
      colors: ['Black', 'Red', 'Blue'],
      lengths: ['1m', '1.5m']
    },
    {
      name: 'Fast Charge USB-C 100W',
      slug: 'fast-charge-usb-c-100w',
      description: 'High-performance USB-C cable supporting 100W Power Delivery. Ideal for laptops and fast charging devices.',
      price: 39.99,
      category: 'USB-C',
      stock: 80,
      main_image: '/green-modular-loveseat.png',
      colors: ['Black', 'Green'],
      lengths: ['1m', '2m']
    },
    {
      name: 'Compact Lightning Cable',
      slug: 'compact-lightning-cable',
      description: 'Compact and portable Lightning cable. Perfect for travel and everyday use.',
      price: 19.99,
      category: 'Lightning',
      stock: 250,
      main_image: '/braided-rope-loveseat.png',
      colors: ['Black', 'White'],
      lengths: ['0.5m', '1m']
    },
    {
      name: 'DEK Essential USB-C',
      slug: 'dek-essential-usb-c',
      description: 'Essential USB-C cable for everyday charging and data transfer. Reliable and affordable.',
      price: 22.99,
      category: 'USB-C',
      stock: 300,
      main_image: '/colorful-patchwork-sofa.png',
      colors: ['Black', 'Gray', 'White'],
      lengths: ['1m', '1.5m', '2m']
    },
    {
      name: 'Premium Braided Bundle',
      slug: 'premium-braided-bundle',
      description: 'Complete charging solution with 3 premium braided cables: USB-C, Lightning, and Micro-USB.',
      price: 49.99,
      category: 'Bundle',
      stock: 50,
      main_image: '/minimalist-boucle-loveseat.png',
      colors: ['Black'],
      lengths: ['1m']
    },
    {
      name: 'Magnetic Charging Cable',
      slug: 'magnetic-charging-cable',
      description: 'Innovative magnetic charging cable with interchangeable tips. Supports USB-C, Lightning, and Micro-USB.',
      price: 32.99,
      category: 'Magnetic',
      stock: 120,
      main_image: '/abstract-artistic-sofa.png',
      colors: ['Black', 'Silver'],
      lengths: ['1m', '1.5m']
    }
  ]

  for (const product of products) {
    try {
      // Insert product
      const { data: insertedProduct, error: productError } = await supabase
        .from('products')
        .insert({
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          category: product.category,
          stock: product.stock,
          main_image: product.main_image
        })
        .select()
        .single()

      if (productError) {
        console.error(`❌ Error inserting product ${product.name}:`, productError)
        continue
      }

      console.log(`✅ Created product: ${product.name}`)

      // Insert variants for each color and length combination
      for (const color of product.colors) {
        for (const length of product.lengths) {
          const variantSku = `${product.slug}-${color.toLowerCase().replace(/\s+/g, '-')}-${length}`
          
          const { error: variantError } = await supabase
            .from('product_variants')
            .insert({
              product_id: insertedProduct.id,
              sku: variantSku,
              color: color,
              length: length,
              stock: Math.floor(product.stock / (product.colors.length * product.lengths.length))
            })

          if (variantError) {
            console.error(`❌ Error inserting variant ${variantSku}:`, variantError)
          }
        }
      }

      console.log(`  └─ Created ${product.colors.length * product.lengths.length} variants`)
    } catch (error) {
      console.error(`💥 Exception inserting product ${product.name}:`, error)
    }
  }

  console.log('✅ Products seeded successfully!\n')
}

async function seedCollections() {
  console.log('🔵 Seeding collections...')

  const collections = [
    {
      name: 'USB-C Essentials',
      slug: 'usb-c-essentials',
      description: 'Premium USB-C cables for all your charging needs',
      image: '/modern-armchair-pillows.png',
      category: 'USB-C'
    },
    {
      name: 'Lightning Collection',
      slug: 'lightning-collection',
      description: 'MFi certified Lightning cables for iPhone and iPad',
      image: '/modular-cushion-bench.png',
      category: 'Lightning'
    },
    {
      name: 'Multi-Device Solutions',
      slug: 'multi-device-solutions',
      description: 'Universal cables for charging multiple devices',
      image: '/distressed-artistic-chair.png',
      category: 'Multi'
    },
    {
      name: 'Best Sellers',
      slug: 'best-sellers',
      description: 'Our most popular charging cables',
      image: '/green-modular-loveseat.png',
      category: null
    }
  ]

  for (const collection of collections) {
    try {
      // Insert collection
      const { data: insertedCollection, error: collectionError } = await supabase
        .from('collections')
        .insert({
          name: collection.name,
          slug: collection.slug,
          description: collection.description,
          image: collection.image
        })
        .select()
        .single()

      if (collectionError) {
        console.error(`❌ Error inserting collection ${collection.name}:`, collectionError)
        continue
      }

      console.log(`✅ Created collection: ${collection.name}`)

      // Add products to collection based on category
      const query = supabase.from('products').select('id')
      
      if (collection.category) {
        query.eq('category', collection.category)
      } else if (collection.slug === 'best-sellers') {
        query.eq('is_featured', true)
      }

      const { data: matchingProducts, error: productsError } = await query

      if (productsError) {
        console.error(`❌ Error fetching products for collection:`, productsError)
        continue
      }

      if (matchingProducts && matchingProducts.length > 0) {
        const collectionProducts = matchingProducts.map((product, index) => ({
          collection_id: insertedCollection.id,
          product_id: product.id,
          sort_order: index
        }))

        const { error: linkError } = await supabase
          .from('collection_products')
          .insert(collectionProducts)

        if (linkError) {
          console.error(`❌ Error linking products to collection:`, linkError)
        } else {
          console.log(`  └─ Added ${matchingProducts.length} products to collection`)
        }
      }
    } catch (error) {
      console.error(`💥 Exception inserting collection ${collection.name}:`, error)
    }
  }

  console.log('✅ Collections seeded successfully!\n')
}

async function clearDatabase() {
  console.log('🔵 Clearing existing data...')

  // Delete in correct order to respect foreign key constraints
  await supabase.from('collection_products').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('product_variants').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('collections').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  console.log('✅ Database cleared\n')
}

async function main() {
  console.log('🚀 Starting database seeding...\n')

  try {
    // Clear existing data
    await clearDatabase()

    // Seed new data
    await seedProducts()
    await seedCollections()

    console.log('🎉 Database seeding completed successfully!')
  } catch (error) {
    console.error('💥 Error seeding database:', error)
    process.exit(1)
  }
}

main()
