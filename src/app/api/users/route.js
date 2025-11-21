import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const category = await prisma.user.findMany({
    orderBy: { created_at: "desc" },
  });

  return Response.json(category);
}
