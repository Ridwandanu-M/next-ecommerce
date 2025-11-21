import Image from "next/image";
import Link from "next/link";

export default function ProductSection({ products }) {
  function formatText(desc) {
    if (!desc) return "";
    if (desc.length <= 30) {
      return desc;
    } else {
      return `${desc.slice(0, 30)}...`;
    }
  }

  function capitalizeFirst(str) {
    if (!str) return "";
    return String(str).charAt(0).toUpperCase() + String(str).slice(1);
  }

  return (
    <section className="mt-8">
      <h2 className="text-3xl mb-8 text-center">Products</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.slug}`}
            className="flex flex-col border border-black/40 shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="relative w-48 h-48 mb-4 mx-auto">
              <Image
                alt={item.name}
                src={item.images?.[0] ?? "/placeholder-image.png"}
                fill
                style={{ objectFit: "contain" }}
                className="flex items-center"
              />
            </div>
            <div className="text-left w-full">
              <h3 className="text-xl font-semibold mb-2">
                {formatText(item.name)}
              </h3>
              <p className="text-md text-[#111] mb-2">{item.category?.name}</p>
              <p className="inline-block text-sm text-[#111] font-medium mb-4 bg-gray-300 px-3 py-1 rounded-full">
                {item.stock === "ready" ? "Ready" : "Pre-order"}
              </p>
              <p className="text-xl font-bold text-[#111]">
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