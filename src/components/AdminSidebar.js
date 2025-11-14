"use client";
import Link from "next/link";
import {
  Package2,
  SquareChartGantt,
  ArrowRightLeft,
  LogOut,
  UsersRound,
} from "lucide-react";

export default function AdminSidebar() {
  const menus = [
    {
      menu: "Users",
      path: "/admin/dashboard/users",
      icon: <UsersRound />,
    },
    {
      menu: "Products",
      path: "/admin/dashboard/products",
      icon: <Package2 />,
    },
    {
      menu: "Category",
      path: "/admin/dashboard/category",
      icon: <SquareChartGantt />,
    },
    {
      menu: "Orders",
      path: "/admin/dashboard/orders",
      icon: <ArrowRightLeft />,
    },
  ];

  return (
    <nav className="w-[256px] bg-[#111] text-[#fff] p-6 h-screen">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div>
            <h1 className="text-2xl font-bold">Beli.com</h1>
          </div>
          <div>
            <ul className="flex flex-col mt-8 gap-4">
              {menus.map((items, index) => (
                <Link
                  key={index}
                  href={items.path}
                  className="flex items-center gap-4 border border-transparent text-lg px-4 py-4 hover:border hover:border-[#fff]"
                >
                  {items.icon}
                  {items.menu}
                </Link>
              ))}
            </ul>
          </div>
        </div>
        <div>
          <Link
            href="/"
            className="flex items-center gap-4 border border-transparent text-lg px-6 py-4 hover:border hover:border-[#fff]"
          >
            <LogOut /> Log out
          </Link>
        </div>
      </div>
    </nav>
  );
}
