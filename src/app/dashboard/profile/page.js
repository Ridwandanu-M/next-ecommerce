import UserInformation from "@/components/UserInformation";
import UserImageProfile from "@/components/UserImageProfile";
import HomeAddress from "@/components/HomeAddress";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userData = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
  });

  const username = userData.name || null;
  const email = userData.email || null;
  const birth = userData.birthOfDate?.toLocaleDateString().slice(0, 10) || null;
  const gender = userData.gender || null;
  const contact = userData.phone || null;

  if (!userData)
    return (
      <Link
        href="/signin"
        className="fixed top-1/2 left-1/2 -translate-1/2 cursor-pointer hover:underline"
      >
        Data tidak ditemukan. Harap kembali &rarr;
      </Link>
    );

  return (
    <div className="flex flex-col gap-8">
      <div className="flex gap-8">
        <UserImageProfile image={userData.image} />
        <UserInformation
          username={username}
          email={email}
          birth={birth}
          gender={gender}
          contact={contact}
        />
      </div>
      <div className="flex flex-col">
        <HomeAddress address={userData.address} />
      </div>
    </div>
  );
}
