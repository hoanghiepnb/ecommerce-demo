import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const { code } = await request.json()
    
    const client = await MongoClient.connect(process.env.MONGODB_URI!)
    const db = client.db()
    
    const discount = await db.collection('discounts').findOne({ 
      code: code.toUpperCase(),
      active: true,
      expiresAt: { $gt: new Date() }
    })
    
    await client.close()

    if (!discount) {
      return NextResponse.json(
        { error: 'Invalid or expired discount code' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      discount: discount.amount,
      code: discount.code
    })
  } catch (error) {
    console.error('Error checking discount:', error)
    return NextResponse.json(
      { error: 'Failed to check discount code' },
      { status: 500 }
    )
  }
} 