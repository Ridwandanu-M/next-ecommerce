"use client";
import UserInformation from "@/components/UserInformation";
import UserImageProfile from "@/components/UserImageProfile";
import HomeAddress from "@/components/HomeAddress";

export default function ProfilePage() {
  // TODO: Replace with your own auth solution
  const username = "User";
  const email = "user@example.com";
  const status = "authenticated";

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
