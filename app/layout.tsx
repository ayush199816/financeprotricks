'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/index";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/admin") || 
                     pathname?.startsWith("/premium") || 
                     pathname?.startsWith("/freemium");

  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          {!isDashboard && <Footer />}
        </Providers>
      </body>
    </html>
  );
}
