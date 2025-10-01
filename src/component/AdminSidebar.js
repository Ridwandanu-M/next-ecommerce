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
    <nav className="w-[28rem] bg-[#111] text-[#fff] p-[3.2rem]">
      <div className="h-full flex flex-col justify-between">
        <div>
          <div>
            <h1 className="text-[3.2rem] font-[700] px-[2.4rem]">Beli.com</h1>
          </div>
          <div>
            <ul className="flex flex-col mt-[2.4rem] gap-[2.4rem]">
              {menus.map((items, index) => (
                <Link
                  key={index}
                  href={items.path}
                  className="flex items-center gap-[1.2rem] border border-transparent text-[1.8rem] px-[2.4rem] py-[1.2rem] hover:border hover:border-[#fff]"
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
            className="flex items-center gap-[1.2rem] border border-transparent text-[1.8rem] px-[2.4rem] py-[1.2rem] hover:border hover:border-[#fff]"
          >
            <LogOut /> Log out
          </Link>
        </div>
      </div>
    </nav>
  );
}
