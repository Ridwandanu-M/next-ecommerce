import {
  getCartByUserId,
  addItemToCart,
  removeCartItem,
} from "@/lib/services/cart.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import { serializePrismaData } from "@/lib/utils/serialize";

async function getUserIdFromSession() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return session?.user?.id;
}

export async function GET() {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const cartItems = await getCartByUserId(userId);

    const serializedCartItems = serializePrismaData(cartItems);

    return NextResponse.json(
      { cartItems: serializedCartItems },
      { status: 200 },
    );
  } catch (e) {
    console.error("Failed to fetch cart:", e);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    const newItem = await addItemToCart(userId, productId);

    const serializedItem = serializePrismaData(newItem);

    return NextResponse.json({ newItem: serializedItem }, { status: 200 });
  } catch (e) {
    console.error("Failed to add item to cart:", e);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 },
    );
  }
}

export async function DELETE(req) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 },
      );
    }

    await removeCartItem(userId, productId);
    return NextResponse.json({ message: "Item removed" }, { status: 200 });
  } catch (e) {
    console.error("Failed to remove item:", e);
    return NextResponse.json(
      { error: "Failed to remove item" },
      { status: 500 },
    );
  }
}
