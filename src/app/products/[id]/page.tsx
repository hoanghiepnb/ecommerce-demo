import { Metadata } from 'next'
import { ObjectId } from 'mongodb'
import ProductClient from './ProductClient'
import clientPromise from '@/lib/mongodb'

type Props = {
  params: Promise<{ id: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  // read route params
  const id = (await params).id

  console.log(searchParams)

  try {
    const client = await clientPromise
    const db = client.db()
    const product = await db.collection('products').findOne({
      _id: new ObjectId(id),
    })

    if (!product) {
      return {
        title: 'Product Not Found | Bikini Shop',
        description: 'The requested product could not be found.',
      }
    }

    return {
      title: `${product.name} | Bikini Shop`,
      description: product.description,
      openGraph: {
        title: `${product.name} | Bikini Shop`,
        description: product.description,
        images: [product.images], // Must be a valid OG images type
      },
    }
  } catch (err) {
    console.error('Error generating metadata:', err)
    return {
      title: 'Product | Bikini Shop',
      description: 'View our premium swimwear collection.',
    }
  }
}

// Page component receives dynamic `params` object
export default function ProductPage({ params, searchParams }: Props) {
  console.log(params)
  console.log(searchParams)
  return <ProductClient />
}
