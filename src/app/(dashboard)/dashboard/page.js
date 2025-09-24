"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  return (
    <div>
      <div></div>
    </div>
  );
}
