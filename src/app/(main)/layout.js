import "../globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Beli.com",
  description:
    "This website are build for Management Information System course",
};

export default function HomeLayout({ children }) {
  return (
    <section>
      <NavBar />
      <main className="mt-36 max-w-[1440px] mx-auto">{children}</main>
      <Footer />
    </section>
  );
}
