import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <section className="min-h-screen relative">
      <AdminSidebar />
      <main className="ml-[28rem] p-[3.2rem] min-h-screen">{children}</main>
    </section>
  );
}
