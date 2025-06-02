import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy | Bikini Shop',
  description: 'Learn about how we collect, use, and protect your personal information.',
}

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
      
      <div className="prose prose-lg">
        <h2>1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, including when you
          create an account, make a purchase, or contact us for support.
        </p>

        <h2>2. How We Use Your Information</h2>
        <p>
          We use the information we collect to provide, maintain, and improve our
          services, process your transactions, and communicate with you.
        </p>

        <h2>3. Information Sharing</h2>
        <p>
          We do not sell your personal information. We share your information only
          as described in this policy and with our service providers.
        </p>

        <h2>4. Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect
          your personal information against unauthorized access or disclosure.
        </p>
      </div>
    </div>
  )
} 