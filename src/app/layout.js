"use client";

import { SessionProvider } from "next-auth/react";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <main className={`${inter.variable}`}>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
