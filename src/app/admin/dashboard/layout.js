import AdminSidebar from "@/component/AdminSidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <section className="flex h-screen">
      <AdminSidebar />
      <main className="p-[2.4rem]">{children}</main>
    </section>
  );
}
