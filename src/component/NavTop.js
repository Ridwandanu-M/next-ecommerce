import Link from "next/link";

export default function NavTop() {
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
    <div className="flex text-[1.4rem] text-[#000]/75 hover:text-[#000] justify-between py-[.4rem] px-[1.8rem]">
      <h2>Created by Ridwandanu Maulana</h2>
      <ul className="flex gap-[1.2rem]">
        {menus.map((item, index) => (
          <Link key={index} href={item.link}>
            {item.menu}
          </Link>
        ))}
      </ul>
    </div>
  );
}
