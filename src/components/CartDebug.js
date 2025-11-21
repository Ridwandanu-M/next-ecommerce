"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function CartDebug() {
  const [cartData, setCartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/cart");
        console.log("Raw response:", response);
        console.log("Response data:", response.data);
        setCartData(response.data);
      } catch (err) {
        console.error("Cart fetch error:", err);
        if (err.response) {
          console.error("Error response:", err.response.data);
          console.error("Error status:", err.response.status);
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartData();
  }, []);

  if (loading) {
    return (
      <div className="p-4 bg-yellow-100 border border-yellow-400 rounded">
        <h3 className="font-bold">Cart Debug - Loading...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-100 border border-red-400 rounded">
        <h3 className="font-bold text-red-800">Cart Debug - Error</h3>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-blue-100 border border-blue-400 rounded">
      <h3 className="font-bold text-blue-800 mb-4">Cart Debug Information</h3>

      <div className="mb-4">
        <h4 className="font-semibold">Raw Response Structure:</h4>
        <pre className="bg-white p-2 rounded mt-2 text-xs overflow-auto">
          {JSON.stringify(cartData, null, 2)}
        </pre>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold">Data Analysis:</h4>
        <ul className="list-disc list-inside text-sm">
          <li>Response type: {typeof cartData}</li>
          <li>Has cartItems property: {cartData?.cartItems ? "Yes" : "No"}</li>
          <li>CartItems is array: {Array.isArray(cartData?.cartItems) ? "Yes" : "No"}</li>
          <li>CartItems length: {cartData?.cartItems?.length || 0}</li>
        </ul>
      </div>

      {cartData?.cartItems?.length > 0 && (
        <div>
          <h4 className="font-semibold">First Cart Item Structure:</h4>
          <pre className="bg-white p-2 rounded mt-2 text-xs overflow-auto">
            {JSON.stringify(cartData.cartItems[0], null, 2)}
          </pre>

          <div className="mt-2">
            <h5 className="font-medium">Product Data Check:</h5>
            <ul className="list-disc list-inside text-sm">
              <li>Has product: {cartData.cartItems[0]?.product ? "Yes" : "No"}</li>
              <li>Product name: {cartData.cartItems[0]?.product?.name || "N/A"}</li>
              <li>Product price: {cartData.cartItems[0]?.product?.price || "N/A"}</li>
              <li>Product price type: {typeof cartData.cartItems[0]?.product?.price}</li>
              <li>Has category: {cartData.cartItems[0]?.product?.category ? "Yes" : "No"}</li>
              <li>Category name: {cartData.cartItems[0]?.product?.category?.name || "N/A"}</li>
              <li>Has images: {cartData.cartItems[0]?.product?.images ? "Yes" : "No"}</li>
              <li>Images array: {Array.isArray(cartData.cartItems[0]?.product?.images) ? "Yes" : "No"}</li>
              <li>First image: {cartData.cartItems[0]?.product?.images?.[0] || "N/A"}</li>
            </ul>
          </div>
        </div>
      )}

      {cartData?.cartItems?.length === 0 && (
        <div className="text-sm text-gray-600">
          Cart is empty. Try adding some products to cart first.
        </div>
      )}
    </div>
  );
}
