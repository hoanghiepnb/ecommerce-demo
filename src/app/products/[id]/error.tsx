'use client'

export default function Error({
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      <button
        className="mt-4 px-4 py-2 bg-black text-white rounded-md"
        onClick={() => reset()}
      >
        Try again
      </button>
    </div>
  )
} 