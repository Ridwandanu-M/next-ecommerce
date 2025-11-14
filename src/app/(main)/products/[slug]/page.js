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

  if (!product) return <div>Product not found</div>;

  return (
    <section>
      <div className="grid grid-cols-3 gap-12 items-start">
        <div className="relative aspect-square w-full">
          <Image
            src={product.images?.[0] ?? "/placeholder-image.png"}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <p className="text-3xl font-semibold my-[1.8rem]">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </p>
          <p className="text-md whitespace-pre-line">{product.desc}</p>
        </div>

        <div className="bg-[#fff] border border-black/40 p-8">
          <p className="text-2xl mb-[1.8rem]">Create orders</p>
          <OrderBox price={product.price} />
        </div>
      </div>
    </section>
  );
}
