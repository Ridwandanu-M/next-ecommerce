"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { DataProvider } from "./providers";

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
          <main className={`${inter.variable}`}>{children}</main>
        </DataProvider>
      </body>
    </html>
  );
}
