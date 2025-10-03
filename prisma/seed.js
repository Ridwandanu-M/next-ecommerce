import { PrismaClient } from "@prisma/client";
import slugify from "slugify";

const prisma = new PrismaClient();

async function main() {
  const products = await prisma.product.findMany();

  for (const product of products) {
    const slug = slugify(product.name, { lower: true, strict: true });

    await prisma.product.update({
      where: { id: product.id },
      data: { slug },
    });
  }
}

main()
  .then(() => {
    console.log("Slug updated for all products");
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
