'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

export default function SuccessPage() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/checkout/session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          setOrderDetails(data)
          setLoading(false)
        })
        .catch(error => {
          console.error('Error fetching order details:', error)
          setLoading(false)
        })
    }
  }, [sessionId])

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Processing your order...</h1>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
        <p className="text-gray-600 mb-8">
          We&apos;ll send you a confirmation email with your order details.
        </p>
        
        {orderDetails && (
          <div className="bg-gray-50 p-6 rounded-lg mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <p className="text-gray-600">Order ID: {sessionId}</p>
            {/* Add more order details as needed */}
          </div>
        )}

        <div className="space-x-4">
          <Link
            href="/products"
            className="inline-block bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition-colors"
          >
            Continue Shopping
          </Link>
          <Link
            href="/account"
            className="inline-block bg-gray-200 text-gray-800 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  )
} 