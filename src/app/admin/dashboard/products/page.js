"use client";
import Link from "next/link";
import { Plus, X } from "lucide-react";
import { useData } from "@/app/providers";
import { useState } from "react";
import { uploadImageFile } from "@/lib/upload";
import Image from "next/image";
import AddProductForm from "@/component/AddProductForm";

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
            {loading ? (
              <tr className="w-full">
                <td colSpan="8" className="px-[40%] py-[3.2rem]">
                  Loading product data
                </td>
              </tr>
            ) : (
              products.map((item, index) => (
                <tr key={item.id} className="bg-white border-b border-[#111] ">
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {index + 1}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {formatText(item.name)}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {formatText(item.desc)}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {item.category?.name ?? "-"}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
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
                      width="75"
                      height="75"
                      unoptimized
                    />
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {editId === item.id ? (
                      <div className="fixed inset-0 z-20 flex justify-center items-center backdrop-blur-xs">
                        <form
                          onSubmit={handleEditProduct}
                          className="relative text-[1.4rem] flex flex-col justify-center w-[48rem] border border-[#111] py-[5.6rem] px-[4rem] bg-[#fff]"
                        >
                          <h2 className="text-[3.2rem] font-[700] text-center mb-[1.8rem]">
                            Edit Product
                          </h2>
                          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
                            <label className="font-[700]">Name</label>
                            <input
                              type="text"
                              value={prodName}
                              onChange={(e) => setProdName(e.target.value)}
                              placeholder="Product name"
                              className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
                            <label className="font-[700]">Description</label>
                            <textarea
                              placeholder="Product description"
                              value={prodDesc}
                              onChange={(e) => setProdDesc(e.target.value)}
                              className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
                            ></textarea>
                          </div>
                          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
                            <label className="font-[700]">Category</label>
                            <select
                              value={prodCategory}
                              onChange={(e) => setProdCategory(e.target.value)}
                              className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none"
                            >
                              <option disabled>Select Category</option>
                              {category.map((items, index) => (
                                <option key={index} value={items.id}>
                                  {items.name}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
                            <label className="font-[700]">Price</label>
                            <input
                              type="number"
                              value={prodPrice}
                              onChange={(e) => setProdPrice(e.target.value)}
                              placeholder="Product price"
                              className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
                            />
                          </div>
                          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
                            <label className="font-[700]">Stock</label>
                            <select
                              value={prodStock}
                              onChange={(e) => setProdStock(e.target.value)}
                              className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none"
                            >
                              <option disabled>Select Stock</option>
                              <option value="ready">Ready</option>
                              <option value="preorder">Pre Order</option>
                            </select>
                          </div>
                          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
                            <label className="font-[700]">Image</label>
                            <input
                              type="file"
                              multiple
                              onChange={(e) =>
                                setProdImage(Array.from(e.target.files))
                              }
                              className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
                            />
                          </div>
                          <button
                            type="submit"
                            className="font-[600] text-[#fff] bg-[#111] hover:bg-[#000] py-[.8rem] mt-[1.2rem] cursor-pointer"
                          >
                            Edit Product
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditId(null)}
                            className="cursor-pointer"
                          >
                            <X className="absolute top-[1.8rem] right-[1.8rem]" />
                          </button>
                        </form>
                      </div>
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
