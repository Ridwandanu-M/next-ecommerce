import { ShoppingCart, Bell, CircleUserRound, Search } from "lucide-react";

export default function NavBot() {
  return (
    <div className="flex items-center gap-[8rem] border-y py-[.4rem] px-[1.8rem]">
      <h1 className="text-[3.2rem]">Beli.com</h1>
      <div className="w-full relative">
        <Search className="absolute left-[1.2rem] top-1/2 -translate-y-1/2 text-[#000]/50" />
        <input
          placeholder="Search..."
          className="border h-[3.2rem] w-full text-[1.4rem] placeholder:text-[1.4rem] p-[1.4rem] pl-[4rem] focus:outline-none focus:ring"
        />
      </div>
      <div className="flex gap-[1.8rem]">
        <ShoppingCart />
        <Bell />
        <CircleUserRound />
      </div>
    </div>
  );
}
