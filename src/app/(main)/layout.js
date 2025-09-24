import { Inter } from "next/font/google";
import "../globals.css";
import NavBar from "@/component/NavBar";

export const metadata = {
  title: "Beli.com",
  description:
    "This website are build for Management Information System course",
};

export default function HomeLayout({ children }) {
  return (
    <>
      <NavBar />
      <main className="mt-[9.6rem]">{children}</main>
    </>
  );
}

// className="py-[.4rem] px-[1.8rem]"
