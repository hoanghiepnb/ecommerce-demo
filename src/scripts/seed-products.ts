/* eslint-disable @typescript-eslint/no-require-imports */
const { MongoClient } = require('mongodb')
require('dotenv').config({ path: '.env.local' })

const products = [
  {
    name: 'Classic Bikini',
    description: 'A timeless bikini design that combines style and comfort.',
    price: 99.00,
    images: ['/products/classic-bikini-1.jpg', '/products/classic-bikini-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Black', 'White', 'Navy'],
    category: 'bikini',
    inStock: true,
    createdAt: new Date(),
  },
  {
    name: 'Summer Bikini',
    description: 'Perfect for those hot summer days at the beach.',
    price: 89.00,
    images: ['/products/summer-bikini-1.jpg', '/products/summer-bikini-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Pink', 'Blue', 'Yellow'],
    category: 'bikini',
    inStock: true,
    createdAt: new Date(),
  },
  {
    name: 'Beach Bikini',
    description: 'Designed for comfort and style during beach activities.',
    price: 79.00,
    images: ['/products/beach-bikini-1.jpg', '/products/beach-bikini-2.jpg'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: ['Red', 'Green', 'Purple'],
    category: 'bikini',
    inStock: true,
    createdAt: new Date(),
  },
]

async function seedProducts() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env.local')
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()
    
    // Clear existing products
    await db.collection('products').deleteMany({})
    
    // Insert new products
    const result = await db.collection('products').insertMany(products)
    
    console.log(`Successfully inserted ${result.insertedCount} products`)
    
    await client.close()
  } catch (error) {
    console.error('Error seeding products:', error)
    process.exit(1)
  }
}

seedProducts() 