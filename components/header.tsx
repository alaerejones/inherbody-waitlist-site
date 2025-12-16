"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Header() {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToForm = () => {
    const formSection = document.getElementById("waitlist-form")
    formSection?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={`w-full transition-all duration-300 ${
        isSticky ? "fixed top-0 z-50 bg-white shadow-sm" : "relative bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-50 h-20 relative">
              <Image src="/images/inherbody logo1.jpg" alt="InHerBody logo" fill className="object-contain" />
            </div>
          </Link>

          <button
            onClick={scrollToForm}
            className="px-6 py-2 bg-[#655A9C] text-white rounded hover:bg-[#544890] focus:outline-none focus:ring-2 focus:ring-[#655A9C] focus:ring-offset-2 transition-colors font-medium text-sm"
          >
            Join waitlist
          </button>
        </div>
      </div>
    </header>
  )
}
