import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Gentium_Book_Plus, Albert_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import Header from "@/components/header"
import Footer from "@/components/footer"
import "./globals.css"

const gentium = Gentium_Book_Plus({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
})

const albertSans = Albert_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-sans",
})

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "InHerBody - Women's Health for Women",
  description:
    "Join the InHerBody waitlist. Women-centered health initiative for PCOS, endometriosis, fibroids, and hormonal health.",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
