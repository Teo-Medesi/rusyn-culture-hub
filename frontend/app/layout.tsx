import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { UserProvider } from '@auth0/nextjs-auth0/client'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Rusyn Cultural Hub',
  description: "Dive into the heart of Rusyn culture at the Rusyn Cultural Hub! Connect with Ruthenians worldwide through vibrant expressions of our heritage. Explore captivating stories, events, and more. Join us in celebrating and preserving the essence of Rusyn identity. Experience the unity of our global community!",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={inter.className}>
          {children}
        </body>
      </UserProvider>
    </html>
  )
}
