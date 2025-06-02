import { NextResponse } from 'next/server'
import Stripe from 'stripe'

interface CartItem {
  _id: string
  name: string
  price: number
  quantity: number
  size: string
  color: string
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia"
})

export async function POST(request: Request) {
  try {
    const { items } = await request.json() as { items: CartItem[] }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item) => ({
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.name,
            description: `Size: ${item.size}, Color: ${item.color}`,
          },
          unit_amount: item.price * 100, // Stripe uses cents
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: `${process.env.NEXTAUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXTAUTH_URL}/cart`,
    })
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe error:', error)
    return NextResponse.json(
      { error: 'Error creating checkout session' },
      { status: 500 }
    )
  }
} 