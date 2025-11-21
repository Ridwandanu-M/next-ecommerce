"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [user, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getCategory() {
    try {
      const res = await fetch("/api/category");
      if (!res.ok) throw new Error("Failed to fetch category");
      const data = await res.json();
      setCategory(data);
    } catch (e) {
      console.error("Error fetching category: ", e);
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
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to create category");
      }

      const newCategory = await res.json();
      setCategory((prev) => [...prev, newCategory]);
      return newCategory;
    } catch (e) {
      console.error("Error creating category: ", e);
      throw e;
    }
  }

  async function editCategory(id, name) {
    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || "Failed to update category");
      }

      const updated = await res.json();
      setCategory((prev) =>
        prev.map((item) => (item.id === id ? updated : item)),
      );
      return updated;
    } catch (e) {
      console.error("Error updating category", e);
      throw e;
    }
  }

  async function deleteCategory(id) {
    try {
      const res = await fetch(`/api/category/${id}`, {
        method: "DELETE",
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to delete category");
      }

      setCategory((prev) => prev.filter((items) => items.id !== id));
      return { success: true };
    } catch (e) {
      console.error("Error deleting category", e);
      throw e;
    }
  }

  async function getProduct() {
    try {
      const res = await fetch("/api/products");
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(
        data.map((item) => ({ ...item, price: item.price?.toString() })),
      );
    } catch (e) {
      console.error("Error fetching products:", e);
    } finally {
      setLoading(false);
    }
  }

  async function createProduct(payload) {
    try {
      console.log('Creating product with payload:', payload);
      
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      if (!res.ok) {
        const errorText = await res.text();
        console.error('Create product failed:', errorText);
        throw new Error(errorText || `HTTP error! status: ${res.status}`);
      }
      
      const created = await res.json();
      console.log('Product created successfully:', created);
      
      setProducts((prev) => [...prev, { ...created, price: created.price?.toString() }]);
      return created;
    } catch (e) {
      console.error("Error creating product:", e);
      throw new Error(e.message || "Failed to create product");
    }
  }

async function updateProduct(id, payload) {
  try {
    console.log('Updating product - ID:', id, 'Type:', typeof id);
    console.log('Update payload:', payload);
    
    // Validasi ID untuk string (Prisma ID string)
    if (!id || typeof id !== 'string') {
      throw new Error(`Invalid product ID: ${id}`);
    }

    const res = await fetch(`/api/products/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Update failed:', errorText);
      throw new Error(errorText || `HTTP error! status: ${res.status}`);
    }
    
    const updated = await res.json();
    console.log('Update successful:', updated);
    
    setProducts((prev) =>
      prev.map((item) => 
        item.id === id 
          ? { ...updated, price: updated.price?.toString() } 
          : item
      ),
    );
    return updated;
  } catch (e) {
    console.error("Update product error:", e);
    throw new Error(e.message || "Failed to update product");
  }
}

async function deleteProduct(id) {
  try {
    console.log('Deleting product - ID:', id, 'Type:', typeof id);
    
    // Validasi ID untuk string (Prisma ID string)
    if (!id || typeof id !== 'string') {
      throw new Error(`Invalid product ID: ${id}`);
    }

    const res = await fetch(`/api/products/${id}`, { 
      method: "DELETE" 
    });
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error('Delete failed:', errorText);
      throw new Error(errorText || `HTTP error! status: ${res.status}`);
    }
    
    // Jika status 204 (No Content), tidak ada response body
    if (res.status === 204) {
      setProducts((prev) => prev.filter((item) => item.id !== id));
      return { success: true };
    }
    
    const result = await res.json();
    setProducts((prev) => prev.filter((item) => item.id !== id));
    return result;
  } catch (e) {
    console.error("Delete product error:", e);
    throw new Error(e.message || "Failed to delete product");
  }
}

  async function getUser() {
    setLoading(true);
    try {
      const res = await fetch("/api/users");
      if (!res.ok) throw new Error("Failed to fetch users");
      const data = await res.json();
      setUsers(data);
    } catch (e) {
      console.error("Error fetching users:", e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCategory();
    getProduct();
    getUser();
  }, []);

  return (
    <DataContext.Provider
      value={{
        category,
        createCategory,
        editCategory,
        deleteCategory,
        products,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        user,
        setLoading,
        loading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}