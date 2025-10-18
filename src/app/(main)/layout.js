import "../globals.css";
import NavBar from "@/component/NavBar";
import Footer from "@/component/Footer";

export const metadata = {
  title: "Beli.com",
  description:
    "This website are build for Management Information System course",
};

export default function HomeLayout({ children }) {
  return (
    <section>
      <NavBar />
      <main className="mt-[14.4rem] max-w-[144rem] mx-auto">{children}</main>
      <Footer />
    </section>
  );
}
