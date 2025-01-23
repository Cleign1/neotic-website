import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import { Geist } from 'next/font/google'
import "./globals.css";

import Header from "./components/header";
import Footer from "./components/footer";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

const Interfont  = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

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
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
