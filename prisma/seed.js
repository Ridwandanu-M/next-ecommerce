import { prisma } from "../lib/prisma.js";

async function main() {
  await prisma.category.createMany({
    data: [{ name: "Laptop" }, { name: "Smartphone" }, { name: "Tablet" }],
  });
}

main()
  .then(() => console.log("✅ Category seeded"))
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
