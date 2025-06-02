'use client'

import Link from 'next/link'
import { useCart } from '@/contexts/CartContext'
import { ShoppingBag } from 'lucide-react'

export default function Navbar() {
  const { items } = useCart()
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-bold">Bikini Shop</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/products" className="text-gray-700 hover:text-gray-900">
              Shop
            </Link>
            <Link href="/cart" className="relative text-gray-700 hover:text-gray-900">
              <ShoppingBag className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 