import OrderBox from "@/component/OrderBox";
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
      <div className="grid grid-cols-3 gap-[4.8rem] items-start">
        <div className="relative aspect-square w-full max-w-[48rem] mb-[1.2rem]">
          <Image
            src={product.images?.[0] ?? "/placeholder-image.png"}
            alt={product.name}
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-[2.4rem] font-[700]">{product.name}</h1>
          <p className="text-[3.2rem] font-[700] my-[1.8rem]">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(product.price)}
          </p>
          <p className="text-[1.4rem] whitespace-pre-line">{product.desc}</p>
        </div>
        <div className="px-[2.4rem]">
          <div className="bg-[#fff] border border-black/40 py-[1.2rem] px-[2.4rem]">
            <p className="text-[2.4rem] mb-[1.8rem]">Create orders</p>
            <OrderBox price={product.price} />
          </div>
        </div>
      </div>
    </section>
  );
}
