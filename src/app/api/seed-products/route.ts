// app/api/seed-products/route.ts
import { NextResponse } from 'next/server'
import {MongoClient} from "mongodb";

export async function GET() {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI!)
        const db = client.db()

        const sampleProducts = Array.from({ length: 10 }, (_, i) => ({
            name: `Product ${i + 1}`,
            description: `This is description for product ${i + 1}`,
            price: parseFloat((Math.random() * 100 + 10).toFixed(2)),
            images: [`https://picsum.photos/300/300?random=${i}`],
            sizes: ['S', 'M', 'L'],
            colors: ['red', 'blue', 'green'],
            category: 'Apparel',
            inStock: true,
            createdAt: new Date(),
        }))

        await db.collection('products').deleteMany({}) // reset nếu cần
        await db.collection('products').insertMany(sampleProducts)

        return NextResponse.json({ message: 'Seeded successfully', count: sampleProducts.length })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Failed to seed data' }, { status: 500 })
    }
}
