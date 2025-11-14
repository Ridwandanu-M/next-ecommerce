"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useData } from "@/app/providers";
import { useState } from "react";
import { uploadImageFile } from "@/lib/upload";
import Image from "next/image";
import AddProductForm from "@/components/AddProductForm";
import EditProductForm from "@/components/EditProductForm";
import AdminTitle from "@/components/AdminTitle";

export default function AdminProductsPage() {
  const {
    category,
    createProduct,
    updateProduct,
    deleteProduct,
    products,
    loading,
  } = useData();
  const [prodName, setProdName] = useState("");
  const [prodDesc, setProdDesc] = useState("");
  const [prodCategory, setProdCategory] = useState(1);
  const [prodPrice, setProdPrice] = useState("");
  const [prodStock, setProdStock] = useState("ready");
  const [prodImage, setProdImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);

  function showProductForm() {
    setShowForm((prev) => !prev);
  }

  function showEditProductForm(item) {
    setEditId(item.id);
    setProdName(item.name);
    setProdDesc(item.desc);
    setProdCategory(item.categoryId);
    setProdPrice(item.price);
    setProdStock(item.stock);
    setProdImage(item.image);
  }

  function formatText(desc) {
    if (desc.length <= 40) {
      return desc;
    } else {
      return `${desc.slice(0, 40)}...`;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
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
      setIsLoading(false);
    }
  }

  async function handleEditProduct(e) {
    e.preventDefault();
    setIsLoading(true);
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
        images: imageUrls.length > 0 ? imageUrls : undefined,
      };

      await updateProduct(editId, payload);
      alert("Product updated");

      setEditId(null);
      setProdName("");
      setProdDesc("");
      setProdCategory(1);
      setProdPrice("");
      setProdStock("ready");
      setProdImage([]);
    } catch (e) {
      console.error(e);
      alert("Failed to update product");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteProduct(id) {
    if (confirm("Delete this product?")) {
      await deleteProduct(id);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-4 mb-4">
        <AdminTitle>List of Products</AdminTitle>
        <button
          type="button"
          onClick={() => showProductForm()}
          className="bg-[#111] text-[#fff] p-2 cursor-pointer hover:bg-[#000]"
        >
          <Plus />
        </button>
      </div>
      <div className="relative max-h-[880px] overflow-y-auto no-scrollbar border-y border-y-[#111]">
        <table className="w-full text-left rtl:text-right text-[#111] border border-[#111] table-fixed shadow-lg">
          <thead className="text-[#fff] bg-[#111] sticky top-0 z-10">
            <tr>
              <th scope="col" className="w-16 text-center px-4 py-4">
                No
              </th>
              <th scope="col" className="px-4 py-4">
                Product Name
              </th>
              <th scope="col" className="px-4 py-4">
                Product Description
              </th>
              <th scope="col" className="px-4 py-4">
                Category
              </th>
              <th scope="col" className="px-4 py-4">
                Price
              </th>
              <th scope="col" className="px-4 py-4">
                Stock
              </th>
              <th scope="col" className="px-4 py-4">
                Image
              </th>
              <th scope="col" className="px-4 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="w-full">
                <td colSpan="8" className="px-[40%] py-[3.2rem]">
                  Loading product data
                </td>
              </tr>
            ) : (
              products.map((item, index) => (
                <tr key={item.id} className="bg-white border-b border-[#111] ">
                  <td className="w-16 text-center px-4 py-4 border-t border-t-[#111]/25">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    {formatText(item.name)}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    {formatText(item.desc)}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    {item.category?.name ?? "-"}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    {new Intl.NumberFormat("id-ID", {
                      style: "currency",
                      currency: "IDR",
                      minimumFractionDigits: 0,
                    }).format(item.price)}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    {item.stock}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    <Image
                      alt="product image"
                      src={item.images?.[0] ?? ""}
                      width="75"
                      height="75"
                      unoptimized
                    />
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    {editId === item.id ? (
                      <EditProductForm
                        onHandleSubmit={handleEditProduct}
                        onClose={() => setEditId(null)}
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
                      />
                    ) : (
                      <>
                        <button
                          onClick={() => showEditProductForm(item)}
                          className="hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                        <span> | </span>
                        <button
                          onClick={() => handleDeleteProduct(item.id)}
                          className="hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
