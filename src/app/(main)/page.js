"use client";

import Banner from "@/component/Banner";
import Brands from "@/component/Brands";
import CategorySection from "@/component/CategorySection";
import { useData } from "../providers";
import ProductSection from "@/component/ProductSection";

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
