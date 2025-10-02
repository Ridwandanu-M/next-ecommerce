import AdminSidebar from "@/component/AdminSidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <section className="flex h-screen relative">
      <AdminSidebar />
      <main className="p-[3.2rem] w-full">{children}</main>
    </section>
  );
}
