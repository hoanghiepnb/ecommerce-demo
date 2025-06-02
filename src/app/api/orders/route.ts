import { getServerSession } from 'next-auth'
import clientPromise from '@/lib/mongodb'
import { NextResponse } from 'next/server'
import {authOptions} from "@/lib/auth/options";

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const client = await clientPromise
    const db = client.db()
    const orders = await db
        .collection('orders')
        .find({ email: session.user.email })
        .sort({ createdAt: -1 })
        .toArray()

    return NextResponse.json(orders)
}
