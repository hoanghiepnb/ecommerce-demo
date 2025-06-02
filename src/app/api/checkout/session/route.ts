import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import clientPromise from '@/lib/mongodb'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia',
})

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')

  if (!sessionId) {
    return NextResponse.json({ error: 'Session ID is required' }, { status: 400 })
  }

  try {
    const client = await clientPromise
    const db = client.db()

    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'payment_intent'],
    })

    const existingOrder = await db.collection('orders').findOne({ sessionId })

    if (!existingOrder) {
      const lineItems = session.line_items?.data || []

      const items = lineItems.map((item: any) => {
        const parsed = item.description.match(/(.*?) \(Size: (.*?), Color: (.*?)\)/)
        const name = parsed?.[1]
        const size = parsed?.[2]
        const color = parsed?.[3]

        const price = item.price?.unit_amount ? item.price.unit_amount / 100 : 0
        return {
          name,
          quantity: item.quantity,
          price,
          size,
          color,
        }
      })

      await db.collection('orders').insertOne({
        sessionId,
        email: session.customer_details?.email,
        amountTotal: session.amount_total,
        items,
        createdAt: new Date(),
      })
    }

    return NextResponse.json({
      status: session.status,
      customer_email: session.customer_details?.email,
      amount_total: session.amount_total,
      currency: session.currency,
      payment_status: session.payment_status,
      items: session.line_items?.data,
    })
  } catch (error) {
    console.error('Error retrieving session:', error)
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 })
  }
}
