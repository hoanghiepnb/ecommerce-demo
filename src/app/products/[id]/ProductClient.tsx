'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useCart } from '@/contexts/CartContext'
import { toast } from 'sonner'

interface Product {
  _id: string
  name: string
  description: string
  price: number
  sizes: string[]
  colors: string[]
  images: string[]
}

export default function ProductClient() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const { addItem } = useCart()

  useEffect(() => {
    fetch(`/api/products/${params.id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          console.error('Error:', data.error)
          return
        }
        setProduct(data)
      })
  }, [params.id])

  if (!product) return null

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error('Please select a size and color')
      return
    }

    addItem({
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: 1,
      size: selectedSize,
      color: selectedColor,
    })

    toast.success('Added to cart', {
      description: `${product.name} - Size: ${selectedSize}, Color: ${selectedColor}`,
      action: {
        label: 'View Cart',
        onClick: () => window.location.href = '/cart'
      },
    })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square w-full bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-3 gap-4">
            {product.images.map((image, index) => (
              <div key={index} className="aspect-square bg-gray-100 rounded-lg"></div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <Card>
          <CardContent className="pt-6">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-semibold mt-4">${product.price}</p>
            <p className="mt-4 text-gray-600">{product.description}</p>

            {/* Size Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium">Size</h3>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-2 text-sm font-medium rounded-md ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium">Color</h3>
              <div className="grid grid-cols-5 gap-2 mt-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`py-2 text-sm font-medium rounded-md ${
                      selectedColor === color
                        ? 'bg-black text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-center">
            <button
              className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-900 transition-colors"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
} 