import AdminSidebar from "@/components/AdminSidebar";

export default function AdminDashboardLayout({ children }) {
  return (
    <section className="flex">
      <AdminSidebar />
      <main className="w-[1440px] mx-auto overflow-hidden h-screen ">
        <div className="h-full py-4">{children}</div>
      </main>
    </section>
  );
}
