import { PrismaClient } from "@prisma/client";

const globalForPirsma = globalThis;

export const prisma = globalForPirsma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPirsma.prisma = prisma;
