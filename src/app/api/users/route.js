import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const category = await prisma.category.findMany({
    orderBy: { created_at: "desc" },
  });

  return Response.json(category);
}
