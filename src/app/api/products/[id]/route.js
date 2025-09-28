import { PrismaClient } from "@prisma/client";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

const prisma = new PrismaClient();

function urlToBucketPath(publicUrl) {
  try {
    const url = new URL(publicUrl);
    const parts = url.pathname.split("/");
    const idx = parts.indexOf("product-images");
    if (idx >= 0) {
      return parts.slice(idx + 1).join("/");
    }
    return null;
  } catch {
    return null;
  }
}

export async function PATCH(req, { params }) {
  const { id } = params;
  try {
    const body = await req.json();
    const updateData = {};
    if (body.name) updateData.name = body.name;
    if (body.desc) updateData.desc = body.desc;
    if (body.price) updateData.price = BigInt(body.price);
    if (body.categoryId) updateData.categoryId = Number(body.categoryId);
    if (body.stock) updateData.stock = body.stock;
    if (Array.isArray(body.images)) updateData.body = body.images;

    const updated = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
    });

    return new Response(
      JSON.stringify({ ...updated, price: updated.price.toString() }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error(e);
    return new Response("Failed to update products", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });
    if (!product) return new Response("Not found", { status: 404 });

    if (product.images && product.images.length) {
      const paths = product.images.map(urlToBucketPath).filter(Boolean);
      if (paths.length) {
        const { error } = await supabaseAdmin.storage
          .from("product-images")
          .remove(paths);
        if (error) console.error("Failed to remove files: ", error);
      }
    }

    await prisma.product.delete({ where: { id: Number(id) } });
    return new Response(null, { status: 204 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to delete", { status: 500 });
  }
}
