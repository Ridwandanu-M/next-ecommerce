"use client";

import { ShoppingCart } from "lucide-react";
import { useCartCount } from "@/hooks/useCart";

export default function CartBadge({
  className = "",
  showIcon = true,
  size = 20,
}) {
  const { count, loading } = useCartCount();

  if (loading) {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        {showIcon && <ShoppingCart size={size} />}
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {showIcon && <ShoppingCart size={size} />}
      {count > 0 && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
          {count > 99 ? "99+" : count}
        </div>
      )}
    </div>
  );
}

export function CartCountOnly({ className = "" }) {
  const { count, loading } = useCartCount();

  if (loading) {
    return (
      <span className={`animate-pulse text-gray-400 ${className}`}>...</span>
    );
  }

  return <span className={className}>{count}</span>;
}

export function CartBadgeCustom({
  className = "",
  badgeClassName = "",
  iconClassName = "",
  showIcon = true,
  size = 20,
  children,
}) {
  const { count, loading } = useCartCount();

  return (
    <div className={`relative inline-flex items-center ${className}`}>
      {children ||
        (showIcon && <ShoppingCart size={size} className={iconClassName} />)}
      {!loading && count > 0 && (
        <div
          className={`absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium ${badgeClassName}`}
        >
          {count > 99 ? "99+" : count}
        </div>
      )}
    </div>
  );
}
