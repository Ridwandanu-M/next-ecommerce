import AdminSidebar from "@/component/AdminSidebar";
import { DashboardProvider } from "./providers";

export default function AdminDashboardLayout({ children }) {
  return (
    <DashboardProvider>
      <section className="flex h-screen relative">
        <AdminSidebar />
        <main className="p-[3.2rem] w-full">{children}</main>
      </section>
    </DashboardProvider>
  );
}
