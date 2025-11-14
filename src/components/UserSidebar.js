"use client";

import {
  CircleUserRound,
  UsersRound,
  Heart,
  LogOut,
  House,
} from "lucide-react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function UserSidebar() {
  const { data: session, status } = useSession();

  const menus = [
    {
      menu: "Profile",
      path: "/dashboard/profile",
      icon: <UsersRound strokeWidth={1.5} />,
    },
    {
      menu: "Wishlist",
      path: "/dashboard/wishlist",
      icon: <Heart strokeWidth={1.5} />,
    },
  ];

  function formatName(username) {
    if (!username) return "";
    const indexOfSpace = username.indexOf(" ");
    if (indexOfSpace === -1) {
      return username;
    }
    return username.substring(0, indexOfSpace);
  }

  return (
    <aside className="w-[256px] bg-white border-r p-6 flex flex-col h-full shadow-md">
      <div className="flex flex-col items-center">
        <CircleUserRound size={60} strokeWidth={1} />
        <p className="text-lg">
          {status === "loading" ? "Loading" : formatName(session?.user?.name)}
        </p>
      </div>
      <div className="mt-8 flex-1 flex flex-col justify-between">
        <ul className="flex flex-col gap-4">
          {menus.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="flex gap-4 px-4 py-2 border border-transparent hover:border hover:border-[#111]"
            >
              {item.icon}
              {item.menu}
            </Link>
          ))}
        </ul>
        <div className="flex flex-col gap-4">
          <Link
            href="/"
            className="flex gap-4 px-4 py-2 border border-transparent hover:border hover:border-[#111]"
          >
            <House strokeWidth={1.5} />
            Home
          </Link>
          <Link
            href=""
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex gap-4 px-4 py-2 border border-transparent hover:border hover:border-[#111]"
          >
            <LogOut /> Sign Out
          </Link>
        </div>
      </div>
    </aside>
  );
}
