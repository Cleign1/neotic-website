import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Geist } from 'next/font/google'
import "@/app/globals.css";

import Header from "@/components/header";
import Footer from "@/components/footer";

import { Toaster } from "@/components/ui/sonner"

const Interfont  = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})


export const metadata: Metadata = {
  title: "Neotic Website",
  description: "Created For Neotic",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${Interfont.variable} ${Interfont.variable} antialiased bg-linear-to-b from-[#2F70A1] to-[#8D8E79]`}
      >
        <Toaster richColors position="bottom-right"/>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
