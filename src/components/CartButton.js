"use client";

import axios from "axios";
import { useState } from "react";

export default function CartButton({ productId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleAddToCart() {
    setIsLoading(true);
    setError("");
    try {
      await axios.post("/api/cart", { productId: productId });
    } catch (e) {
      console.error(`Failed to add product to cart: ${e}`);
      setError("Failed to add product, try again later");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="flex justify-center border border-[#111] bg-[#111] text-[#fff] text-md py-2 hover:text-[#111] hover:bg-[#fff] cursor-pointer"
    >
      {isLoading ? "Adding to cart..." : "Add to Cart"}
    </button>
  );
}
