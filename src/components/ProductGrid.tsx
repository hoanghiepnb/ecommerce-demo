'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
}

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-2xl font-extrabold text-gray-900 mb-8">Collections</h2>
      
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="-ml-2 md:-ml-4">
          {products.map((product) => (
            <CarouselItem key={product._id} className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/3">
              <Link href={`/products/${product._id}`} className="block h-full">
                <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg">
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
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-16">
        <h2 className="text-2xl font-extrabold text-gray-900 mb-8">All Products</h2>
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
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
  )
} 