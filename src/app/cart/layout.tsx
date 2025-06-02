import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Shopping Cart | Bikini Shop',
  description: 'Review and checkout your selected swimwear items.',
  robots: {
    index: false,
  },
}

export default function CartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 