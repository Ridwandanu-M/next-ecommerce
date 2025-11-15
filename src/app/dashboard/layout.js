"use client";

import LoadingScreen from "@/components/LoadingScreen";
import UserSidebar from "@/components/UserSidebar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function DashboardLayout({ children }) {
  const { status } = useSession();
  if (status === "unauthenticated") return redirect("/signin");
  if (status === "loading") return <LoadingScreen />;

  return (
    <section className="flex h-screen">
      <UserSidebar />

      <div className="w-[1200px] mx-auto p-24 my-16 bg-white border shadow-md">
        {children}
      </div>
    </section>
  );
}
