"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCategory() {
    try {
      const res = await fetch("/api/category");
      if (!res.ok) throw new Error("Failed to fetch category");
      const data = await res.json();
      setCategory(data);
    } catch (e) {
      console.error("Error: ", e);
    } finally {
      setLoading(false);
    }
  }

  async function createCategory(categoryData) {
    try {
      const res = await fetch("/api/category", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryData),
      });

      if (!res.ok) {
        throw new Error("Failed to create category");
      }

      const newCategory = await res.json();
      setCategory((prev) => [...prev, newCategory]);
    } catch (e) {
      console.error("Error: ", e);
    }
  }

  async function editCategory(id, name) {
    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) return new Error("Failed to update category");

      const update = await res.json();

      setCategory((prev) =>
        prev.map((item) => (item.id === id ? update : item)),
      );
    } catch (e) {
      console.error("Error updating category", e);
    }
  }

  async function deleteCategory(id) {
    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete category");

      setCategory((prev) => prev.filter((items) => items.id !== id));
    } catch (e) {
      console.error("Error deleting category", e);
    }
  }

  async function getProduct() {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) return new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(
        data.map((item) => ({ ...item, price: item.price?.toString() })),
      );
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(payload) {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to create product");
      const created = await res.json();
      setProducts((prev) => [...prev, created]);
      return created;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async function updateProduct(id, payload) {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to update");
      const updated = await res.json();
      setProducts((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item)),
      );
      return updated;
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async function deleteProduct(id, payload) {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((item) => item.id !== Number(id)));
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        category,
        createCategory,
        editCategory,
        deleteCategory,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardData() {
  return useContext(DashboardContext);
}
