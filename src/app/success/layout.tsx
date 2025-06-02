import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Order Confirmed | Bikini Shop',
  description: 'Thank you for your purchase!',
  robots: {
    index: false,
  },
}

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 