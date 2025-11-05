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
    <header className="fixed top-0 w-full z-50">
      <div className="flex text-md bg-[#fff] justify-between py-2 px-6">
        <h2>
          <Link href="/admin/signin">Created</Link> by Ridwandanu Maulana
        </h2>
        <ul className="flex gap-4">
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
      <div className="flex bg-[#fff] items-center gap-4 border-y border-y-black/40 py-2 px-6 z-50">
        <Link href="/" className="text-3xl font-[700]">
          Beli.com
        </Link>
        <div className="w-full relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[#000]/50" />
          <input
            placeholder="Search..."
            className="border border-black/40 h-2 w-full text-md placeholder:text-md p-6 pl-16 focus:outline-none focus:ring"
          />
        </div>
        <div className="flex items-center gap-6">
          <ShoppingCart size={24} />
          <Bell size={24} />
          <div>
            {session ? (
              <Link
                href="/dashboard/profile"
                className="flex items-center gap-4 text-md"
              >
                <CircleUserRound size={24} /> {session.user?.name}
              </Link>
            ) : (
              <div className="flex gap-4">
                <Link
                  href="/signin"
                  className="bg-[#fff] border border-[#111] px-10 py-2 text-[#111] font-[500] text-sm text-nowrap hover:bg-[#111] hover:text-[#fff] hover:border-[#fff]"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="bg-[#111] border border-[#111] px-10 py-2 text-[#fff] font-[500] text-sm text-nowrap hover:bg-[#fff] hover:text-[#111] hover:border-[#111]"
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
