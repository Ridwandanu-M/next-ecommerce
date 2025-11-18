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

export async function getCartSummary(userId) {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: userId },
    include: {
      product: true,
    },
  });

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + item.quantity * Number(item.product.price);
  }, 0);

  return {
    totalQuantity,
    totalPrice,
    itemCount: cartItems.length,
  };
}

export async function getCartTotalQuantity(userId) {
  const aggregate = await prisma.cartItem.aggregate({
    where: { userId: userId },
    _sum: {
      quantity: true,
    },
  });

  return aggregate._sum.quantity || 0;
}

export async function getCartTotalValue(userId) {
  const cartItems = await prisma.cartItem.findMany({
    where: { userId: userId },
    include: {
      product: {
        select: {
          price: true,
        },
      },
    },
  });

  return cartItems.reduce((total, item) => {
    return total + item.quantity * Number(item.product.price);
  }, 0);
}
