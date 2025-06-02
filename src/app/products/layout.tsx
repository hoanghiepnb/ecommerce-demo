import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shop Bikinis | Bikini Shop',
  description: 'Browse our collection of premium bikinis, one-pieces, and beachwear. Find the perfect swimwear for your style.',
  openGraph: {
    title: 'Shop Bikinis | Bikini Shop',
    description: 'Browse our collection of premium bikinis, one-pieces, and beachwear.',
    images: ['/og-image.jpg'],
  },
}

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 