import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms of Service | Bikini Shop',
  description: 'Read our terms of service and conditions of use.',
}

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
      
      <div className="prose prose-lg">
        <h2>1. Terms</h2>
        <p>
          By accessing this Website, you are agreeing to be bound by these Website
          Terms and Conditions of Use and agree that you are responsible for the
          agreement with any applicable local laws.
        </p>

        <h2>2. Use License</h2>
        <p>
          Permission is granted to temporarily download one copy of the materials
          (information or software) on Bikini Shop&apos;s Website for personal,
          non-commercial transitory viewing only.
        </p>

        <h2>3. Disclaimer</h2>
        <p>
          All the materials on Bikini Shop&apos;s Website are provided &quot;as is&quot;. Bikini
          Shop makes no warranties, may it be expressed or implied, therefore
          negates all other warranties.
        </p>

        <h2>4. Limitations</h2>
        <p>
          Bikini Shop or its suppliers will not be held accountable for any
          damages that will arise with the use or inability to use the materials
          on Bikini Shop&apos;s Website.
        </p>
      </div>
    </div>
  )
} 