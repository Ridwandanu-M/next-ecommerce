"use client";

import Link from "next/link";

export default function CategorySection({ category }) {
  // Function to create URL-friendly slug
  const createSlug = (name) => {
    return encodeURIComponent(name.toLowerCase().replace(/\s+/g, '-'));
  };

  return (
    <section className="mt-24">
      <h2 className="text-3xl mb-12 text-center">Category</h2>
      <ul className="grid grid-cols-4 gap-4">
        {category.map((item) => {
          const categorySlug = createSlug(item.name);
          
          return (
            <li key={item.id}>
              <Link 
                href={`/category/${categorySlug}`}
                className="block"
              >
                <div className="flex justify-center items-center py-6 gap-4 bg-[#fff] border border-black/40 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                  <p className="text-lg text-[#111]">{item.name}</p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}