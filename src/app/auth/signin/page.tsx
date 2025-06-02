'use client'

import {signIn, signOut} from 'next-auth/react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import Link from 'next/link'
import {generateCodeChallenge, generateCodeVerifier} from "@/lib/utils";

async function handleZaloLogin() {
  const verifier = generateCodeVerifier()
  const challenge = await generateCodeChallenge(verifier)

  localStorage.setItem('zalo_code_verifier', verifier)

  await signOut({redirect: false})
  await signIn('zalo', {
    callbackUrl: '/',
    code_challenge: challenge,
  })
}

export default function SignIn() {
  return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Card className="max-w-md w-full space-y-8">
          <CardHeader>
            <div className="text-center">
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Welcome Back
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign in to your account to continue
              </p>
            </div>
          </CardHeader>

          <CardContent>
            <div className="flex flex-col space-y-4">
              {/* Google login */}
              <button
                  onClick={() => signIn('google', {callbackUrl: '/'})}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                />
                <span>Continue with Google</span>
              </button>

              <button
                  onClick={handleZaloLogin}
                  className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 border border-blue-500 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600">
                <Image
                    src="/zalo.svg"
                    alt="Zalo"
                    width={20}
                    height={20}
                />
                <span>Continue with Zalo</span>
              </button>

            </div>
          </CardContent>

          <CardFooter>
            <p className="text-center text-sm text-gray-600">
              By signing in, you agree to our{' '}
              <Link href="/terms" className="font-medium text-black hover:text-gray-900">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="font-medium text-black hover:text-gray-900">
                Privacy Policy
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
  )
}
