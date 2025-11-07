import FormLayout from "@/components/AuthLayout";

export default function AuthLayout({ children }) {
  return (
    <section className="relative">
      <FormLayout />
      <main>{children}</main>
    </section>
  );
}
