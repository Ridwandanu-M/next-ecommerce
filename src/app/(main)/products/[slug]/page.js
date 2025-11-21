import OrderBox from "@/components/OrderBox";
import { PrismaClient } from "@prisma/client";
import Image from "next/image";

const prisma = new PrismaClient();

export default async function ProductPage({ params }) {
  const { slug } = await params;

  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) return <div className="text-center py-12">Product not found</div>;

  return (
    <section className="py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="relative aspect-square w-full bg-gray-100 rounded-lg overflow-hidden">
          {product.images?.[0] ? (
            <>
              <Image
                src={product.images?.[0] ?? "/placeholder-image.png"}
                alt={product.name}
                fill
                className="object-contain"
              />
            </>
          ) : (
            <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image Available</span>
            </div>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-3xl font-semibold text-blue-600 my-6">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </p>
          <div className="mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              product.stock === "ready" 
                ? "bg-green-100 text-green-800" 
                : "bg-yellow-100 text-yellow-800"
            }`}>
              {product.stock === "ready" ? "In Stock" : "Pre-order"}
            </span>
            <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {product.category?.name}
            </span>
          </div>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {product.desc || "No description available."}
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Create Order</h2>
          <OrderBox price={product.price} id={product.id} />
        </div>
      </div>
    </section>
  );
}