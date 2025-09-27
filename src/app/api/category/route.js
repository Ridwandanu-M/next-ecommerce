import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const category = await prisma.category.findMany({
    orderBy: { created_at: "desc" },
  });

  return Response.json(category);
}

export async function POST(req) {
  const { name } = await req.json();

  if (!name || name.trim() === "") {
    return new Response("Category name is required", { status: 400 });
  }

  const category = await prisma.category.create({
    data: { name: name.trim() },
  });

  return Response.json(category);
}
