import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

function serializeProduct(product) {
  return { 
    ...product, 
    price: product.price ? product.price.toString() : null 
  };
}

export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { created_at: "desc" },
      include: {
        category: true,
      },
    });

    console.log('Products fetched:', products.length);
    if (products.length > 0) {
      console.log('First product ID:', products[0].id, 'Type:', typeof products[0].id);
    }

    return new Response(JSON.stringify(products.map(serializeProduct)), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Error fetching products:", e);
    return new Response(
      JSON.stringify({ error: "Failed to fetch products" }),
      { 
        status: 500,
        headers: { "Content-Type": "application/json" } 
      }
    );
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, desc, price, categoryId, stock, images } = body;

    if (!name || !price || !categoryId) {
      return new Response("Missing fields", { status: 400 });
    }

    const categoryExists = await prisma.category.findUnique({
      where: { id: Number(categoryId) },
    });
    if (!categoryExists) {
      return new Response("Invalid category", { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug: slugify(name, { lower: true, strict: true }),
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