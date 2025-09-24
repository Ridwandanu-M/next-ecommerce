export default function AuthLayout({ children }) {
  return (
    <section className="h-[100vh] flex justify-center items-center">
      <main>{children}</main>
    </section>
  );
}
