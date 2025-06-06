import GoogleProvider from 'next-auth/providers/google'

export const GoogleAuthProvider = () =>
    GoogleProvider({
        clientId: process.env.GOOGLE_ID ?? '',
        clientSecret: process.env.GOOGLE_SECRET ?? '',
    })
