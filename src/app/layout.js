"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { DataProvider } from "./providers";
import { SessionProvider } from "next-auth/react";

const inter = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <DataProvider>
          <SessionProvider>
            <main className={`${inter.variable}`}>{children}</main>
          </SessionProvider>
        </DataProvider>
      </body>
    </html>
  );
}
