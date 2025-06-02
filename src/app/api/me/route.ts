import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth/options"
import { NextResponse } from "next/server"
import {MongoClient} from "mongodb";

export async function GET() {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI!)
        const db = client.db()
        const user = await db.collection("users").findOne(
            { email: session.user.email },
            { projection: { _id: 0, password: 0 } } // Exclude sensitive fields
        )

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 })
        }

        return NextResponse.json(user)
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 })
    }
}

export async function PUT(req: Request) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const updates = await req.json()
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI!)
        const db = client.db()

        await db.collection("users").updateOne(
            { email: session.user.email },
            { $set: updates }
        )

        return NextResponse.json({ message: "User updated successfully" })
    } catch (err) {
        return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
    }
}