import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Restaurant Financial Control Platform',
  description: 'Grow your restaurants without losing financial control. The finance team that runs at the speed of your operations.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">{children}</body>
    </html>
  )
}

