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
        <main className={`${inter.variable}`}>{children}</main>
      </body>
    </html>
  );
}
