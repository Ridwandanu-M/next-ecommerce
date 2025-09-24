import { Inter } from "next/font/google";
import "../globals.css";
import NavTop from "@/component/NavTop";
import NavBot from "@/component/NavBot";

export const metadata = {
  title: "Beli.com",
  description:
    "This website are build for Management Information System course",
};

export default function HomeLayout({ children }) {
  return (
    <>
      <header>
        <NavTop />
        <NavBot />
      </header>
      <main>{children}</main>
    </>
  );
}

// className="py-[.4rem] px-[1.8rem]"
