import LoadingScreen from "@/components/LoadingScreen";
import UserSidebar from "@/components/UserSidebar";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/signin");

  return (
    <section className="flex h-screen">
      <UserSidebar />
      <div className="w-[1440px] mx-auto p-12 h-[800px] my-auto bg-white border shadow-md">
        {children}
      </div>
    </section>
  );
}
