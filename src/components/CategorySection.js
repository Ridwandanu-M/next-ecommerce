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
    <section className="mt-24">
      <h2 className="text-3xl mb-12 text-center">Category</h2>
      <ul className="grid grid-cols-4 gap-4">
        {category.map((item, index) => {
          const Icon = categoryIcons[index];
          return (
            <li
              key={item.id}
              className="flex justify-center items-center py-6 gap-4 bg-[#fff] border border-black/40 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <Icon size={24} color="#111" />
              <p className="text-lg text-[#111]">{item.name}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
