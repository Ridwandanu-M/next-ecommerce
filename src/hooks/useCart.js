"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export function useCart() {
  const { data: session } = useSession();
  const [cartItems, setCartItems] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalValue, setTotalValue] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    if (!session?.user?.id) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/cart");
      if (!response.ok) throw new Error("Failed to fetch cart");

      const data = await response.json();
      setCartItems(data.cartItems || []);

      const items = data.cartItems || [];
      const quantity = items.reduce((sum, item) => sum + item.quantity, 0);
      const value = items.reduce((sum, item) => {
        return sum + item.quantity * Number(item.product.price);
      }, 0);

      setTotalQuantity(quantity);
      setTotalValue(value);
      setItemCount(items.length);
      setError(null);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCartSummary = async () => {
    if (!session?.user?.id) return;

    try {
      const response = await fetch("/api/cart/summary");
      if (!response.ok) throw new Error("Failed to fetch cart summary");

      const data = await response.json();
      setTotalQuantity(data.totalQuantity || 0);
      setTotalValue(data.totalPrice || 0);
      setItemCount(data.itemCount || 0);
    } catch (err) {
      console.error("Error fetching cart summary:", err);
      setError(err.message);
    }
  };

  const addToCart = async (productId) => {
    if (!session?.user?.id) {
      throw new Error("User must be logged in");
    }

    try {
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) throw new Error("Failed to add item to cart");

      await fetchCart();
      return await response.json();
    } catch (err) {
      console.error("Error adding to cart:", err);
      setError(err.message);
      throw err;
    }
  };

  const removeFromCart = async (productId) => {
    if (!session?.user?.id) {
      throw new Error("User must be logged in");
    }

    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId }),
      });

      if (!response.ok) throw new Error("Failed to remove item from cart");

      await fetchCart();
      return await response.json();
    } catch (err) {
      console.error("Error removing from cart:", err);
      setError(err.message);
      throw err;
    }
  };

  const clearCart = async () => {
    if (!session?.user?.id) return;

    try {
      const promises = cartItems.map((item) => removeFromCart(item.productId));
      await Promise.all(promises);
    } catch (err) {
      console.error("Error clearing cart:", err);
      setError(err.message);
      throw err;
    }
  };

  const isInCart = (productId) => {
    return cartItems.some((item) => item.productId === productId);
  };

  const getProductQuantity = (productId) => {
    const item = cartItems.find((item) => item.productId === productId);
    return item ? item.quantity : 0;
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  useEffect(() => {
    if (session?.user?.id) {
      fetchCart();
    } else {
      setCartItems([]);
      setTotalQuantity(0);
      setTotalValue(0);
      setItemCount(0);
      setLoading(false);
    }
  }, [session?.user?.id]);

  return {
    cartItems,
    totalQuantity,
    totalValue,
    itemCount,
    loading,
    error,
    addToCart,
    removeFromCart,
    clearCart,
    fetchCart,
    fetchCartSummary,
    isInCart,
    getProductQuantity,
    formatPrice,
    isEmpty: cartItems.length === 0,
    hasItems: cartItems.length > 0,
  };
}

export function useCartCount() {
  const { data: session } = useSession();
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCount = async () => {
      if (!session?.user?.id) {
        setCount(0);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("/api/cart/summary?type=quantity");
        if (response.ok) {
          const data = await response.json();
          setCount(data.totalQuantity || 0);
        }
      } catch (err) {
        console.error("Error fetching cart count:", err);
        setCount(0);
      } finally {
        setLoading(false);
      }
    };

    fetchCount();
  }, [session?.user?.id]);

  return { count, loading };
}
