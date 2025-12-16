import Image from "next/image"
import Link from "next/link"
import { Instagram, Facebook, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#FDF8F3] border-t border-[#F58D8C]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex-shrink-0">
              <div className="w-45 h-20 relative">
                <Image src="/images/logo with tagline.png" alt="InHerBody logo" fill className="object-contain" />
              </div>
            </Link>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Quick Links</h3>
            <Link
              href="https://wa.link/yq83o3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 hover:text-[#F58D8C] transition-colors"
            >
              Contact Us
            </Link>
            <Link href="/admin/waitlist" className="text-sm text-gray-600 hover:text-[#F58D8C] transition-colors">
             Stay Connected
            </Link>
          </div>

          <div className="flex flex-col gap-3 ">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Connect With Us</h3>
            <div className="flex gap-4">
              <Link
                href="https://www.instagram.com/inherbodycommunity"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#F58D8C] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://www.facebook.com/share/1ALPBymsRA/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#F58D8C] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/inherbody-community"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#F58D8C] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#F58D8C]/20">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} InHerBody Women Health Initiative.
          </p>
          <p className="text-sm text-gray-600 text-center">
            All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
