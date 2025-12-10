import Image from "next/image"
import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          <Link href="/" className="flex-shrink-0">
            <div className="w-12 h-12 relative">
              <Image src="/images/inherbody-20logo3.jpg" alt="InHerBody logo" fill className="object-contain" />
            </div>
          </Link>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex gap-6">
              <Link href="/privacy" className="text-sm text-gray-600 hover:text-gray-900">
                Privacy
              </Link>
              <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                Contact
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-600">© InHerBody Women Health Initiative</p>
        </div>
      </div>
    </footer>
  )
}
