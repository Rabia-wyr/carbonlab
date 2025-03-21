import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "碳经济可视化教学平台",
  description: "面向双碳战略的仿真模拟教学系统",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning={true}>
      <head>
        <script
          defer
          src="https://umami.loongtales.com/script.js"
          data-website-id="33aca4b2-850f-40d6-85f6-72df997f7c7d"
        />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          {children}
        </ThemeProvider>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/11.12.0/math.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.9.0/p5.min.js" />
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/0.162.0/three.min.js" />
        <Toaster />
      </body>
    </html>
  )
}
