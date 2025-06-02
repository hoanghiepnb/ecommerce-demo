import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from './providers'
import { CartProvider } from '@/contexts/CartContext'
import { Toaster } from 'sonner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'Bikini Shop | Premium Swimwear Collection',
    template: '%s | Bikini Shop',
  },
  description: 'Shop our premium collection of bikinis, one-pieces, and beachwear. Find your perfect beach style.',
  keywords: ['bikini', 'swimwear', 'beachwear', 'one-piece', 'swimming'],
  authors: [{ name: 'Bikini Shop' }],
  creator: 'Bikini Shop',
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    siteName: 'Bikini Shop',
    images: ['/og-image.jpg'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <CartProvider>
          <Providers>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster position="top-center" />
          </Providers>
        </CartProvider>
      </body>
    </html>
  )
} 