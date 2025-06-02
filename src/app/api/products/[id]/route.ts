import { MongoClient, ObjectId } from 'mongodb'
import { NextRequest, NextResponse } from 'next/server'

function isValidObjectId(id: string): boolean {
  return /^[a-f\d]{24}$/i.test(id)
}

export async function GET(
    request: NextRequest,
) {
  const pathname = request.nextUrl.pathname
  const id = pathname.split('/').pop() || ''

  if (!id || typeof id !== 'string' || !isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
  }

  try {
    const client = await MongoClient.connect(process.env.MONGODB_URI!)
    const db = client.db()

    const product = await db.collection('products').findOne({
      _id: new ObjectId(id),
    })

    await client.close()

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}
