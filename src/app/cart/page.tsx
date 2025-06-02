'use client'

import { useCart } from '@/contexts/CartContext'
import { useState } from 'react'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { toast } from 'sonner'

export default function CartPage() {
  const { items, removeItem, updateQuantity, total } = useCart()
  const [isLoading, setIsLoading] = useState(false)
  const [discountCode, setDiscountCode] = useState('')
  const [discount, setDiscount] = useState(0)
  const [appliedCode, setAppliedCode] = useState('')

  const handleApplyDiscount = async () => {
    try {
      const response = await fetch('/api/discount', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: discountCode }),
      })

      const data = await response.json()

      if (response.ok) {
        setDiscount(data.discount)
        setAppliedCode(data.code)
        setDiscountCode('')
        toast.success('Discount code applied successfully!')
      } else {
        toast.error(data.error)
      }
    } catch (error) {
      console.error('Error applying discount code:', error)
      toast.error('Failed to apply discount code')
    }
  }

  const finalTotal = total - (total * (discount / 100))

  const handleCheckout = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('Checkout failed:', errorData)
        throw new Error(errorData?.error || 'Unknown error during checkout')
      }

      const data = await response.json()
      if (!data?.url) {
        throw new Error('No checkout URL returned')
      }

      window.location.href = data.url
    } catch (err) {
      console.error('Checkout error:', err)
      toast.error('Failed to process checkout')
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
        <p>Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <Card key={`${item._id}-${item.size}-${item.color}`}>
              <CardContent className="flex items-center p-4">
                <div className="flex-1">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-500">
                    Size: {item.size} | Color: {item.color}
                  </p>
                  <p className="text-sm font-medium">${item.price}</p>
                </div>
                
                <div className="flex items-center space-x-4">
                  <select
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                    className="rounded-md border p-2"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter discount code"
                    className="flex-1 p-2 border rounded-md"
                  />
                  <button
                    onClick={handleApplyDiscount}
                    className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                  >
                    Apply
                  </button>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({appliedCode})</span>
                      <span>-${(total * (discount / 100)).toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Free</span>
                  </div>

                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Processing...' : 'Proceed to Checkout'}
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
} 