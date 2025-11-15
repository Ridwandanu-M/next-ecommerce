"use client";
import { useSession } from "next-auth/react";
import UserInformation from "@/components/UserInformation";
import UserImageProfile from "@/components/UserImageProfile";
import HomeAddress from "@/components/HomeAddress";

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const username = session?.user?.name ?? "N/A";
  const email = session?.user?.email ?? "N/A";

  const loadInfo = () => {
    if (status === "loading") {
      return (
        <div>
          <p>Loading data, please wait...</p>
        </div>
      );
    }
  };

  return (
    <>
      {loadInfo() ?? (
        <div className="flex flex-col gap-8">
          <div className="flex gap-8">
            <UserImageProfile />
            <UserInformation username={username} email={email} />
          </div>
          <div className="flex flex-col">
            <HomeAddress />
          </div>
        </div>
      )}
    </>
  );
}
