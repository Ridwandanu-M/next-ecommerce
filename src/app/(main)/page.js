"use client";

import Banner from "@/components/Banner";
import Brands from "@/components/Brands";
import CategorySection from "@/components/CategorySection";
import { useData } from "../providers";
import ProductSection from "@/components/ProductSection";

export default function Homepage() {
  const { products, category } = useData();
  return (
    <div>
      <Banner />
      <Brands />
      <CategorySection category={category} />
      <ProductSection products={products} />
    </div>
  );
}
