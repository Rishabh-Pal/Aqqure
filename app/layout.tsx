import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Restaurant Financial Control Platform',
  description: 'Grow your restaurants without losing financial control. The finance team that runs at the speed of your operations.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Prevent FOUC by hiding content until hydrated */
            body {
              background-color: #0a0a0a;
              color: #fafafa;
            }
            /* Prevent layout shift */
            * {
              box-sizing: border-box;
            }
          `
        }} />
      </head>
      <body className="antialiased bg-[#0a0a0a] text-white" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

