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

export default function Sidebar() {
  const { data: session, status } = useSession();

  const menus = [
    {
      menu: "Profile",
      path: "/dashboard/profile",
      icon: <UsersRound />,
    },
    {
      menu: "Wishlist",
      path: "/wishlist",
      icon: <Heart />,
    },
  ];

  return (
    <div className="w-[28rem] border-r border-r-black/40 p-[3.2rem] flex flex-col justify-between">
      <div>
        <div className="flex flex-col items-center">
          <CircleUserRound size={144} />
          <h2 className="text-[2rem]">{session?.user?.name ?? "Loading"}</h2>
        </div>
        <div className="flex flex-col items-center">
          <ul className="text-[2rem] flex flex-col gap-[1.2rem] mt-[4.8rem]">
            {menus.map((item, index) => (
              <Link
                key={index}
                href={item.path}
                className="flex items-center gap-[2.4rem]"
              >
                {item.icon}
                {item.menu}
              </Link>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <ul className="text-[2rem] flex flex-col gap-[1.2rem]">
          <li>
            <button>
              <Link href="/" className="flex items-center gap-[2.4rem]">
                <House /> Home
              </Link>
            </button>
          </li>
          <li>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="flex items-center gap-[2.4rem] cursor-pointer"
            >
              <LogOut /> Sign Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
