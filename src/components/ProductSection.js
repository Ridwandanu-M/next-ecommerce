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

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const placeholder = e.target.nextSibling;
    if (placeholder) {
      placeholder.style.display = 'flex';
    }
  };

  return (
    <section className="mt-24">
      <h2 className="text-3xl mb-12 text-center">Products</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {products.map((item) => (
          <Link
            key={item.id}
            href={`/products/${item.slug}`}
            className="flex flex-col border border-gray-200 rounded-lg shadow-sm p-6 hover:shadow-lg transition-shadow"
          >
            <div className="relative w-48 h-48 mb-4 mx-auto bg-gray-100 rounded-lg overflow-hidden">
              {item.images?.[0] ? (
                <>
                  <Image
                    alt={item.name}
                    src={item.images[0]}
                    fill
                    style={{ objectFit: "contain" }}
                    className="hover:scale-105 transition-transform"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gray-200 flex; items-center justify-center hidden">
                    <span className="text-sm text-gray-500">No Image</span>
                  </div>
                </>
              ) : (
                <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
                  <span className="text-sm text-gray-500">No Image</span>
                </div>
              )}
            </div>
            <div className="text-left w-full flex-1 flex flex-col">
              <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                {formatText(item.name)}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{item.category?.name}</p>
              <p className="inline-block text-xs font-medium mb-4 bg-gray-200 px-2 py-1 rounded-full self-start">
                {item.stock === "ready" ? "Ready Stock" : "Pre-order"}
              </p>
              <p className="text-xl font-bold text-gray-900 mt-auto">
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