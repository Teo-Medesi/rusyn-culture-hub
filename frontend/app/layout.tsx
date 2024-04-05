import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({weight: ["400", "500", "700"], subsets: ["latin", "cyrillic"]})

export const metadata: Metadata = {
  title: 'Ruthenia',
  description: "Dive into the heart of Rusyn culture with Ruthenia! Connect with Ruthenians worldwide through vibrant expressions of our heritage. Explore captivating stories, events, and more. Join us in celebrating and preserving the essence of Rusyn identity. Experience the unity of our global community!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
      </body>
    </html>
  )
}
