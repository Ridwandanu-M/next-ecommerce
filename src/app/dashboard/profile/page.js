"use client";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <section className="bg-gray-100">
        <div className="bg-white p-8 w-full">
          <h2 className="text-[3.2rem] font-bold mb-4 text-gray-[#111]">
            Memuat Informasi Akun...
          </h2>
          <p className="text-[#111] text-[1.4rem]">
            Mohon tunggu selagi kami mengambil detail profil Anda.
          </p>
        </div>
      </section>
    );
  }

  const simulatedCreatedAt = "2023-01-15T10:00:00Z"; // Example date

  const userNameInfo = session?.user?.name ?? "N/A";
  const userEmailInfo = session?.user?.email ?? "N/A";

  return (
    <section className="bg-gray-100">
      <div className="bg-white p-8 w-full">
        <h2 className="text-[3.2rem] font-bold mb-[3.2rem] text-[#111]">
          Informasi Akun
        </h2>
        <div className="space-y-4">
          <div>
            <p className="text-[2.4rem] font-medium text-[#111]">Name</p>
            <p className="text-[1.4rem] font-semibold text-[#111]">
              {userNameInfo}
            </p>
          </div>
          <div>
            <p className="text-[2.4rem] font-medium text-[#111]">Email</p>
            <p className="text-[1.4rem] font-semibold text-[#111]">
              {userEmailInfo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
