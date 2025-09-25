"use client";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const userSession = {
    name: session?.user?.name,
    email: session?.user?.email,
  };
  const userNameInfo = userSession.name ?? "Loading Information";
  const userEmailInfo = userSession.email ?? "Loading Information";
  return (
    <div>
      <div>
        <h2 className="text-[2.4rem] font-[700]">Account Information</h2>
      </div>
      <div>
        <p>{userNameInfo}</p>
        <p>{userEmailInfo}</p>
      </div>
    </div>
  );
}
