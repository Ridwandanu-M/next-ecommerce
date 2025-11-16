"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function getCart() {
    setIsLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/cart");
      const data = res.data;

      if (data && data.cartItems) {
        setCartItems(data.cartItems);
        console.log("Cart data:", data.cartItems);
      } else {
        console.log("No cart items found");
        setCartItems([]);
      }
    } catch (e) {
      console.error("Error fetching cart:", e);
      if (e.response?.status === 401) {
        setError("Please sign in to view your cart");
      } else {
        setError("Failed to load cart items");
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function removeFromCart(productId) {
    try {
      await axios.delete("/api/cart", {
        data: { productId },
      });
      getCart();
    } catch (e) {
      console.error("Error removing item:", e);
      setError("Failed to remove item from cart");
    }
  }

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = Number(item.product?.price || 0);
      return total + price * item.quantity;
    }, 0);
  };

  useEffect(() => {
    getCart();
  }, []);

  if (isLoading) {
    return (
      <section>
        <h2 className="text-2xl font-medium">Cart</h2>
        <div className="flex justify-center items-center h-64">
          <p>Loading cart items...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section>
        <h2 className="text-2xl font-medium">Cart</h2>
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={getCart}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <h2 className="text-2xl font-medium">Cart</h2>

      {cartItems.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
              href="/"
              className="px-4 py-2 bg-[#111] text-white hover:bg-[#000]"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <>
          <div>
            <ul className="flex flex-col gap-4 mt-4 h-[650px] overflow-auto no-scrollbar">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex items-center justify-between border-b border-b-gray-200 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-32 h-32 bg-gray-200 rounded overflow-hidden p-2">
                      {item.product?.images?.[0] ? (
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name || "Product"}
                          width={128}
                          height={128}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-400 flex items-center justify-center">
                          <span className="text-xs text-gray-600">
                            No Image
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <p className="text-xl font-medium">
                        {item.product?.name || "Unknown Product"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.product?.category?.name || "No Category"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <p className="font-medium">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(Number(item.product?.price || 0))}
                    </p>
                    <button
                      onClick={() => removeFromCart(item.productId)}
                      className="px-3 py-1 text-sm bg-red-700 text-white rounded hover:bg-red-900 cursor-pointer"
                    >
                      <Trash2 strokeWidth={1.5} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </section>
  );
}
