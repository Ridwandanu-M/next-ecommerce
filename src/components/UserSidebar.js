"use client";

import {
  CircleUserRound,
  UsersRound,
  Heart,
  LogOut,
  House,
} from "lucide-react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function UserSidebar() {
  const { data: session, status } = useSession();
  const username = session?.user?.name;

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
          {status === "loading" ? "Loading data..." : formatName(username)}
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
          <button
            onClick={() => redirect("/")}
            className="flex gap-4 px-4 py-2 border border-transparent hover:border hover:border-[#111] cursor-pointer"
          >
            <House strokeWidth={1.5} />
            Home
          </button>
          <button
            onClick={() => signOut()}
            className="flex gap-4 px-4 py-2 border border-transparent hover:border hover:border-[#111] cursor-pointer"
          >
            <LogOut /> Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
