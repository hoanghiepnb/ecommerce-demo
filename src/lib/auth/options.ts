import { MongoDBAdapter } from '@auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'
import { NextAuthOptions } from 'next-auth'
import { GoogleAuthProvider } from './providers/google'
import { ZaloAuthProvider } from './providers/zalo'

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleAuthProvider(),
        ZaloAuthProvider(),
    ],
    adapter: MongoDBAdapter(clientPromise),
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',
    },
}
