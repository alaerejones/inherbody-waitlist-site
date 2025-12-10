"use client"

import Image from "next/image"

export default function Hero() {
  const scrollToForm = () => {
    const formSection = document.getElementById("waitlist-form")
    formSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative w-full h-screen md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <Image src="/images/inherbody-20logo4.jpg" alt="InHerBody women" fill className="object-cover" priority />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="w-16 h-16 md:w-24 md:h-24 relative">
            <Image src="/images/inherbody-20logo3.jpg" alt="InHerBody symbol" fill className="object-contain" />
          </div>
        </div>

        <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-4 text-balance">
          Women's Health for Women
        </h1>

        <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto text-balance">
          For women living with PCOS, endometriosis, fibroids, and cycles that do not feel normal.
        </p>

        <button
          onClick={scrollToForm}
          className="px-8 py-3 bg-[#F58D8C] text-white rounded hover:bg-[#e07a79] focus:outline-none focus:ring-2 focus:ring-[#F58D8C] focus:ring-offset-2 transition-colors font-medium text-lg"
        >
          Join the waitlist
        </button>
      </div>
    </section>
  )
}
