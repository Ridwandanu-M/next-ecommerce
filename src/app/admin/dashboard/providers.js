"use client";
import { createContext, useContext, useState, useEffect } from "react";

export const DashboardContext = createContext();

export function DashboardProvider({ children }) {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [categoryRes] = await Promise.all([fetch("/api/category")]);
        const [categoryData] = await Promise.all([categoryRes.json()]);
        setCategory(categoryData);
      } catch (err) {
        console.error("Failed to fetch data: ", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <DashboardContext.Provider value={{ category, loading }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboardData() {
  return useContext(DashboardContext);
}
