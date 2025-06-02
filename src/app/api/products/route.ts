import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!)
    const db = client.db()
    const products = await db.collection('products').find().toArray()
    await client.close()

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    )
  }
} 