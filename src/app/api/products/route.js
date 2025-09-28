import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function serializeProduct(product) {
  return { ...product, price: product.price ? product.price.toString() : null };
}

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { created_at: "desc" },
  });

  return new Response(JSON.stringify(products.map(serializeProduct)), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, desc, price, categoryId, stock, images } = body;

    if (!name || !price || !categoryId) {
      return new Response("Missing fields", { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        desc: desc || "",
        price: BigInt(price),
        categoryId: Number(categoryId),
        stock,
        images: images || [],
      },
    });

    return new Response(JSON.stringify(serializeProduct(product)), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error(e);
    return new Response("Server error", { status: 500 });
  }
}
