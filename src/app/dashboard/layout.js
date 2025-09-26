import Sidebar from "@/component/Sidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex h-screen">
      <Sidebar />
      <div className="p-[8rem]">{children}</div>
    </section>
  );
}
