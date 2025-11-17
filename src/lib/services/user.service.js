import prisma from "../prisma";

export async function getUserId(userId) {
  return await prisma.user.findUnique({
    where: {
      userId: userId,
    },
  });
}
