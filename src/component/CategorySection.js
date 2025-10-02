import {
  Gamepad2,
  Smartphone,
  Speaker,
  Joystick,
  Headset,
  Keyboard,
  Monitor,
  Laptop,
} from "lucide-react";

export default function CategorySection({ category }) {
  const categoryIcons = [
    Gamepad2,
    Smartphone,
    Speaker,
    Joystick,
    Headset,
    Keyboard,
    Monitor,
    Laptop,
  ];
  return (
    <section className="mt-[9.6rem]">
      <h2 className="text-[3.2rem] mb-[1.8rem] text-center">Category</h2>
      <ul className="grid grid-cols-4 gap-[1.2rem]">
        {category.map((item, index) => {
          const Icon = categoryIcons[index];
          return (
            <li
              key={item.id}
              className="flex justify-center items-center py-[1.8rem] gap-[1.2rem] bg-[#fff] border border-black/40 shadow-md hover:shadow-xl hover:-translate-y-[.4rem] transition-all"
            >
              <Icon color="#111" />
              <p className="text-[1.4rem] text-[#111]">{item.name}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
