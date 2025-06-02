/* eslint-disable @typescript-eslint/no-require-imports */
const { MongoClient } = require('mongodb')
require('dotenv').config({ path: '.env.local' })

const discounts = [
  {
    code: 'WELCOME10',
    amount: 10, // 10% off
    active: true,
    expiresAt: new Date('2024-12-31'),
  },
  {
    code: 'SUMMER20',
    amount: 20, // 20% off
    active: true,
    expiresAt: new Date('2024-08-31'),
  },
]

async function seedDiscounts() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in .env.local')
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI)
    const db = client.db()
    
    // Clear existing discounts
    await db.collection('discounts').deleteMany({})
    
    // Insert new discounts
    const result = await db.collection('discounts').insertMany(discounts)
    
    console.log(`Successfully inserted ${result.insertedCount} discount codes`)
    
    await client.close()
  } catch (error) {
    console.error('Error seeding discounts:', error)
    process.exit(1)
  }
}

seedDiscounts() 