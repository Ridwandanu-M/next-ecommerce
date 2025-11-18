import {
  getCartSummary,
  getCartTotalQuantity,
  getCartTotalValue,
} from "@/lib/services/cart.service";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

async function getUserIdFromSession() {
  const session = await getServerSession(authOptions);
  if (!session) return null;

  return session?.user?.id;
}

export async function GET(request) {
  try {
    const userId = await getUserIdFromSession();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");

    switch (type) {
      case "quantity":
        const totalQuantity = await getCartTotalQuantity(userId);
        return NextResponse.json({ totalQuantity }, { status: 200 });

      case "value":
        const totalValue = await getCartTotalValue(userId);
        return NextResponse.json({ totalValue }, { status: 200 });

      case "full":
      default:
        const summary = await getCartSummary(userId);
        return NextResponse.json(summary, { status: 200 });
    }
  } catch (error) {
    console.error("Failed to fetch cart summary:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart summary" },
      { status: 500 }
    );
  }
}
