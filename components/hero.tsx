"use client"

import Image from "next/image"

export default function Hero() {
  const scrollToForm = () => {
    const formSection = document.getElementById("waitlist-form")
    formSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative w-full min-h-[100vh] md:min-h-[800px] flex items-end justify-center overflow-hidden">
      {/* Background image with minimal overlay to show logo clearly */}
      <div className="absolute inset-0 w-full h-full">
        <Image src="/images/inherbody-20logo4.jpg" alt="InHerBody women" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl px-6 sm:px-8 lg:px-12 pb-8 md:pb-12 text-center w-full">
        <div className="backdrop-blur-md bg-black/40 p-6 md:p-8 rounded-xl border border-white/10">
          <h1 className="font-serif text-3xl md:text-5xl font-bold text-white mb-3 text-balance">
            Women's Health for Women
          </h1>

          <p className="text-base md:text-lg text-white/95 mb-6 text-balance">
            For women living with PCOS, endometriosis, fibroids, and cycles that do not feel normal.
          </p>

          <button
            onClick={scrollToForm}
            className="px-8 py-3 bg-[#F58D8C] text-white rounded-lg hover:bg-[#e07a79] focus:outline-none focus:ring-2 focus:ring-[#F58D8C] focus:ring-offset-2 transition-colors font-medium text-lg shadow-lg"
          >
            Join the waitlist
          </button>
        </div>
      </div>
    </section>
  )
}
