import UserSidebar from "@/components/UserSidebar";

export default function DashboardLayout({ children }) {
  return (
    <section className="flex h-screen">
      <UserSidebar />
      <div className="w-[1200px] mx-auto p-24 my-16 bg-white border shadow-md">
        {children}
      </div>
    </section>
  );
}
