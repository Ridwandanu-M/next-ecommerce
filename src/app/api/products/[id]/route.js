import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

function serializeProduct(product) {
  return { ...product, price: product.price ? product.price.toString() : null };
}

export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const body = await req.json();
    const { name, desc, price, categoryId, stock, images } = body;

    console.log("🔍 [API] Updating product:", id, body);

    // Validation
    if (!name || !price || !categoryId) {
      return new Response("Missing required fields", { status: 400 });
    }

    // Check if product exists
    const existingProduct = await prisma.product.findUnique({
      where: { id }
    });

    if (!existingProduct) {
      return new Response("Product not found", { status: 404 });
    }

    // Check if category exists
    const categoryExists = await prisma.category.findUnique({
      where: { id: Number(categoryId) }
    });

    if (!categoryExists) {
      return new Response("Invalid category", { status: 400 });
    }

    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name: name.trim(),
        slug: slugify(name, { lower: true, strict: true }),
        desc: desc || "",
        price: BigInt(price),
        categoryId: Number(categoryId),
        stock,
        images: images || []
      },
      include: {
        category: true
      }
    });

    console.log("✅ [API] Product updated successfully");

    return new Response(JSON.stringify(serializeProduct(updatedProduct)), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("❌ [API] Error updating product:", error);
    return new Response("Server error", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;

    await prisma.product.delete({
      where: { id }
    });

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response("Failed to delete product", { status: 500 });
  }
}