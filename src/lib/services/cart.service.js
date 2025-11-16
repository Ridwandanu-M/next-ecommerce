import prisma from "../prisma";

export async function getCartByUserId(userId) {
  return await prisma.cartItem.findMany({
    where: { userId: userId },
    include: {
      product: {
        include: {
          category: true,
        },
      },
    },
  });
}

export async function addItemToCart(userId, productId) {
  return await prisma.cartItem.upsert({
    where: {
      userId_productId: {
        userId: userId,
        productId: productId,
      },
    },
    update: {
      quantity: { increment: 1 },
    },
    create: {
      userId: userId,
      productId: productId,
      quantity: 1,
    },
  });
}

export async function removeCartItem(userId, productId) {
  return await prisma.cartItem.delete({
    where: {
      userId_productId: {
        userId: userId,
        productId: productId,
      },
    },
  });
}
