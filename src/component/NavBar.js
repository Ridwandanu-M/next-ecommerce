import { getServerSession } from "next-auth";
import { authOption } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import { ShoppingCart, Bell, CircleUserRound, Search } from "lucide-react";

export default async function NavBar() {
  const session = await getServerSession(authOption);
  const menus = [
    {
      menu: "Contact",
      link: "#",
    },
    {
      menu: "Sponsor",
      link: "#",
    },
    {
      menu: "About Beli",
      link: "#",
    },
  ];

  return (
    <header className="fixed top-0 w-full z-10">
      <div className="flex text-[1.4rem] bg-[#fff] justify-between py-[.4rem] px-[1.8rem]">
        <h2>Created by Ridwandanu Maulana</h2>
        <ul className="flex gap-[1.2rem]">
          {menus.map((item, index) => (
            <Link
              className="text-[#000]/75 hover:text-[#000]"
              key={index}
              href={item.link}
            >
              {item.menu}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flex bg-[#fff] items-center gap-[8rem] border-y border-y-black/40 py-[.4rem] px-[1.8rem]">
        <Link href="/" className="text-[3.2rem] font-[700]">
          Beli.com
        </Link>
        <div className="w-full relative">
          <Search className="absolute left-[1.2rem] top-1/2 -translate-y-1/2 text-[#000]/50" />
          <input
            placeholder="Search..."
            className="border border-black/40 h-[3.2rem] w-full text-[1.4rem] placeholder:text-[1.4rem] p-[1.4rem] pl-[4rem] focus:outline-none focus:ring"
          />
        </div>
        <div className="flex items-center gap-[1.8rem]">
          <ShoppingCart />
          <Bell />
          <div>
            {session ? (
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-[.8rem] text-[1.4rem]"
              >
                <CircleUserRound /> {session.user?.name}
              </Link>
            ) : (
              <div className="flex gap-[.8rem]">
                <Link
                  href="/signin"
                  className="bg-[#fff] border border-[#111] px-[3.2rem] py-[.8rem] text-[#111] font-[700] text-[1.2rem] text-nowrap hover:bg-[#111] hover:text-[#fff] hover:border-[#fff]"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#111] border border-[#111] px-[3.2rem] py-[.8rem] text-[#fff] font-[700] text-[1.2rem] text-nowrap hover:bg-[#fff] hover:text-[#111] hover:border-[#111]"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
