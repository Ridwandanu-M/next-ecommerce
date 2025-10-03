import Image from "next/image";
import Link from "next/link";

export default function ProductSection({ products }) {
  function formatText(desc) {
    if (desc.length <= 30) {
      return desc;
    } else {
      return `${desc.slice(0, 30)}...`;
    }
  }
  return (
    <section className="mt-[9.6rem]">
      <h2 className="text-[3.2rem] mb-[1.8rem] text-center">Products</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.slug}`}
            className="flex flex-col border border-black/40 shadow-md p-[1.8rem]"
          >
            <div className="relative w-64 h-64 mb-[1.2rem] mx-auto">
              <Image
                alt={item.name}
                src={item.images?.[0] ?? "/placeholder-image.png"}
                layout="fill"
                objectFit="contain"
                className="flex items-center"
              />
            </div>
            <div className="text-left w-full">
              <h3 className="text-[1.8rem] font-semibold mb-[.4rem]">
                {formatText(item.name)}
              </h3>
              <p className="text-[1.4rem] text-[#111] mb-[.4rem]">
                {item.category?.name}
              </p>
              <p className="text-[1.4rem] text-[#111] mb-[1.8rem]">
                {item.stock}
              </p>
              <p className="text-[1.8rem] font-bold text-[#111]">
                {new Intl.NumberFormat("id-ID", {
                  style: "currency",
                  currency: "IDR",
                  minimumFractionDigits: 0,
                }).format(item.price)}
              </p>
            </div>
          </Link>
        ))}
      </ul>
    </section>
  );
}
