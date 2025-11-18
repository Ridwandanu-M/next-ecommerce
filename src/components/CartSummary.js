"use client";

import { useCart } from "@/hooks/useCart";
import {
  ShoppingCart,
  Package,
  DollarSign,
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
import Link from "next/link";

export default function CartSummary({
  showItems = true,
  showActions = true,
  className = "",
  compact = false,
}) {
  const {
    cartItems,
    totalQuantity,
    totalValue,
    itemCount,
    loading,
    error,
    removeFromCart,
    addToCart,
    formatPrice,
    isEmpty,
    hasItems,
  } = useCart();

  if (loading) {
    return (
      <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-gray-300 rounded"></div>
            <div className="w-24 h-6 bg-gray-300 rounded"></div>
          </div>
          <div className="space-y-2">
            <div className="w-full h-4 bg-gray-300 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
            <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={`bg-red-50 border border-red-200 rounded-lg p-6 ${className}`}
      >
        <p className="text-red-600">Error loading cart: {error}</p>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className={`bg-gray-50 rounded-lg p-6 text-center ${className}`}>
        <ShoppingCart size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-600 mb-2">
          Your cart is empty
        </h3>
        <p className="text-gray-500 mb-4">Add some products to get started</p>
        <Link
          href="/products"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  if (compact) {
    return (
      <div className={`bg-white rounded-lg shadow-sm border p-4 ${className}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShoppingCart size={20} className="text-gray-600" />
            <div>
              <p className="font-medium">{totalQuantity} items</p>
              <p className="text-sm text-gray-500">{formatPrice(totalValue)}</p>
            </div>
          </div>
          <Link
            href="/dashboard/cart"
            className="px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
          >
            View Cart
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-lg shadow-md ${className}`}>
      <div className="p-6 border-b">
        <div className="flex items-center gap-2 mb-4">
          <ShoppingCart size={24} className="text-gray-700" />
          <h2 className="text-xl font-semibold">Cart Summary</h2>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="bg-blue-50 rounded-lg p-3">
            <Package size={20} className="mx-auto text-blue-600 mb-1" />
            <p className="text-2xl font-bold text-blue-600">{itemCount}</p>
            <p className="text-sm text-gray-600">Products</p>
          </div>
          <div className="bg-green-50 rounded-lg p-3">
            <div className="w-5 h-5 mx-auto mb-1 rounded-full bg-green-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">
                {totalQuantity}
              </span>
            </div>
            <p className="text-2xl font-bold text-green-600">{totalQuantity}</p>
            <p className="text-sm text-gray-600">Quantity</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-3">
            <DollarSign size={20} className="mx-auto text-purple-600 mb-1" />
            <p className="text-lg font-bold text-purple-600">
              {formatPrice(totalValue)}
            </p>
            <p className="text-sm text-gray-600">Total</p>
          </div>
        </div>
      </div>

      {showItems && hasItems && (
        <div className="p-6">
          <h3 className="font-medium text-gray-700 mb-4">Items in Cart</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {cartItems.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onRemove={removeFromCart}
                onAdd={addToCart}
                showActions={showActions}
              />
            ))}
          </div>
        </div>
      )}

      {showActions && hasItems && (
        <div className="p-6 border-t bg-gray-50 rounded-b-lg">
          <div className="flex gap-3">
            <Link
              href="/dashboard/cart"
              className="flex-1 text-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
            >
              View Full Cart
            </Link>
            <Link
              href="/checkout"
              className="flex-1 text-center py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function CartItemRow({ item, onRemove, onAdd, showActions = true }) {
  const handleRemove = async () => {
    try {
      await onRemove(item.productId);
    } catch (error) {
      console.error("Failed to remove item:", error);
    }
  };

  const handleAdd = async () => {
    try {
      await onAdd(item.productId);
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const itemTotal = item.quantity * Number(item.product.price);

  return (
    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
      <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
        <Package size={16} className="text-gray-400" />
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-gray-900 truncate">
          {item.product.name}
        </h4>
        <p className="text-sm text-gray-500">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(item.product.price)}{" "}
          × {item.quantity}
        </p>
      </div>

      <div className="text-right">
        <p className="font-medium text-gray-900">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
          }).format(itemTotal)}
        </p>
        <div className="flex items-center gap-1 mt-1">
          {showActions && (
            <>
              <button
                onClick={handleAdd}
                className="w-6 h-6 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors"
                title="Add one more"
              >
                <Plus size={12} className="text-green-600" />
              </button>
              <span className="text-sm text-gray-600 mx-1">
                {item.quantity}
              </span>
              <button
                onClick={handleRemove}
                className="w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                title="Remove item"
              >
                <Trash2 size={12} className="text-red-600" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function CartSummaryCompact({ className = "" }) {
  return <CartSummary compact={true} className={className} />;
}

export function CartSummaryNoItems({ className = "" }) {
  return <CartSummary showItems={false} className={className} />;
}

export function CartSummaryReadOnly({ className = "" }) {
  return <CartSummary showActions={false} className={className} />;
}
