'use client'

import { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  price: number
  category: string
}

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) return false
    if (priceRange === 'under50' && product.price >= 50) return false
    if (priceRange === '50to100' && (product.price < 50 || product.price > 100)) return false
    if (priceRange === 'over100' && product.price <= 100) return false
    return true
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Category</h3>
            <div className="space-y-2">
              {['all', 'bikini', 'onepiece', 'beachwear'].map((category) => (
                <button
                  key={`category-${category}`}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    selectedCategory === category
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Price Range</h3>
            <div className="space-y-2">
              {[
                { id: 'all', label: 'All Prices' },
                { id: 'under50', label: 'Under $50' },
                { id: '50to100', label: '$50 to $100' },
                { id: 'over100', label: 'Over $100' },
              ].map((range) => (
                <button
                  key={`price-${range.id}`}
                  onClick={() => setPriceRange(range.id)}
                  className={`block w-full text-left px-3 py-2 rounded-md ${
                    priceRange === range.id
                      ? 'bg-black text-white'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link 
                key={`product-${product._id}`}
                href={`/products/${product._id}`}
              >
                <Card className="cursor-pointer transition-shadow hover:shadow-lg">
                  <CardHeader>
                    <div className="aspect-square relative overflow-hidden rounded-lg">
                      <div className="h-full w-full bg-gray-200" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle>{product.name}</CardTitle>
                  </CardContent>
                  <CardFooter>
                    <p className="text-lg font-semibold">${product.price}</p>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 