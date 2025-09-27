import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(req, { params }) {
  const { id } = params;
  const { name } = await req.json();

  if (!name || name.trim() === "") {
    return new Response("Category name is required", { status: 400 });
  }

  try {
    const updated = await prisma.category.update({
      where: { id: parseInt(id) },
      data: { name: name.trim() },
    });
    return Response.json(updated);
  } catch (e) {
    console.error(e);
    return new Response("Failed to update category", { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;

  try {
    await prisma.category.delete({
      where: { id: parseInt(id) },
    });
    return new Response(null, { status: 204 });
  } catch (e) {
    console.error(e);
    return new Response("Failed to delete category", { status: 500 });
  }
}
