"use client";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { useDashboardData } from "../providers";
import { useState } from "react";
import { uploadImageFile } from "@/lib/upload";
import Image from "next/image";
import AddProductForm from "@/component/AddProductForm";

export default function AdminProductsPage() {
  const { category, createProduct, products } = useDashboardData();
  const [prodName, setProdName] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodCategory, setProdCategory] = useState(1);
  const [prodPrice, setProdPrice] = useState("");
  const [prodStock, setProdStock] = useState("ready");
  const [prodImage, setProdImage] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showForm, setShowForm] = useState(false);

  function showProductForm() {
    setShowForm((prev) => !prev);
  }

  function formatDesc(desc) {
    if (desc.length <= 40) {
      return desc;
    } else {
      return `${desc.slice(0, 40)}...`;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      let imageUrls = [];
      if (prodImage && prodImage.length > 0) {
        imageUrls = await Promise.all(prodImage.map(uploadImageFile));
      }

      const payload = {
        name: prodName,
        desc: prodDesc,
        categoryId: prodCategory,
        price: String(prodPrice),
        stock: prodStock,
        images: imageUrls,
      };

      await createProduct(payload);
      alert("Product created");

      setProdName("");
      setProdDesc("");
      setProdCategory(1);
      setProdPrice("");
      setProdStock("ready");
      setProdImage([]);

      showProductForm();
    } catch (e) {
      console.error(e);
      alert("Failed to create product");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-[1.8rem] mb-[1.8rem]">
        <h1 className="text-[3.2rem] font-[700]">List of Products</h1>
        <button
          type="button"
          onClick={() => showProductForm()}
          className="bg-[#111] text-[#fff] p-[1.2rem] cursor-pointer hover:bg-[#000]"
        >
          <Plus />
        </button>
      </div>
      <div className="flex">
        <div className="relative max-h-[85rem] overflow-y-scroll border-y border-y-[#111]">
          <table className="w-full text-sm text-left rtl:text-right text-[#111] text-[1.4rem] border border-[#111] table-fixed shadow-lg">
            <thead className="text-xs text-[#fff] bg-[#111]">
              <tr className="text-[1.4rem]">
                <th scope="col" className="w-[6rem] px-[2.4rem] py-[1.4rem]">
                  No
                </th>
                <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                  Product Name
                </th>
                <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                  Product Description
                </th>
                <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                  Category
                </th>
                <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                  Price
                </th>
                <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                  Stock
                </th>
                <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                  Image
                </th>
                <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, index) => (
                <tr key={item.id} className="bg-white border-b border-[#111]">
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {index + 1}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {item.name}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {formatDesc(item.desc)}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {item.category?.name ?? "-"}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    Rp.{" "}
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(item.price)}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {item.stock}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    <Image
                      alt="product image"
                      src={item.images?.[0] ?? ""}
                      width="100"
                      height="0"
                      unoptimized
                    />
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    <button className="hover:underline cursor-pointer">
                      Edit
                    </button>
                    <span> | </span>
                    <button className="hover:underline cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {showForm && (
        <AddProductForm
          onHandleSubmit={handleSubmit}
          prodName={prodName}
          setProdName={setProdName}
          prodDesc={prodDesc}
          setProdDesc={setProdDesc}
          category={category}
          prodCategory={prodCategory}
          setProdCategory={setProdCategory}
          prodPrice={prodPrice}
          setProdPrice={setProdPrice}
          prodStock={prodStock}
          setProdStock={setProdStock}
          setProdImage={setProdImage}
          showProductForm={showProductForm}
        />
      )}
    </div>
  );
}
