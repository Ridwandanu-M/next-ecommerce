"use client";
import Link from "next/link";
import { Package2, SquareChartGantt, ArrowRightLeft } from "lucide-react";

export default function AdminSidebar() {
  const menus = [
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
    <nav className="w-[28rem] bg-[#111] py-[1.8rem] text-[#fff]">
      <div>
        <div className="text-center">
          <h1 className="text-[3.2rem] font-[700]">Beli.com</h1>
        </div>
        <div className="mt-[2.4rem] flex justify-center">
          <ul className="flex flex-col gap-[1.2rem]">
            {menus.map((items, index) => (
              <Link
                key={index}
                href={items.path}
                className="flex items-center gap-[1.2rem] border border-transparent py-[1.4rem] px-[3.2rem] text-[1.8rem] hover:border hover:border-[#fff]"
              >
                {items.icon}
                {items.menu}
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
