
export default function Hero() {
  return (
    <div className="relative h-[80vh]">
      <div className="absolute inset-0">
        <div className="relative h-full w-full">
          {/* Temporary solid color background until you add your hero image */}
          <div className="absolute inset-0 bg-gray-900"></div>
        </div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Summer Collection
        </h1>
        <p className="mt-6 text-xl text-white max-w-3xl">
          Discover our latest collection of premium swimwear designed for comfort and style.
        </p>
      </div>
    </div>
  )
} 