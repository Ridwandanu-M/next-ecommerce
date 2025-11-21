"use client";
import { Plus } from "lucide-react";
import { useData } from "@/app/providers";
import { useState, useEffect } from "react";
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
  const [prodCategory, setProdCategory] = useState("0");
  const [prodPrice, setProdPrice] = useState("");
  const [prodStock, setProdStock] = useState("");
  const [prodImage, setProdImage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    if (category.length > 0 && !prodCategory) {
      setProdCategory(category[0].id);
    }
  }, [category, prodCategory]);

  function showProductForm() {
    setShowForm((prev) => !prev);
    setMessage({ text: "", type: "" });
    if (!showForm) {
      setProdName("");
      setProdDesc("");
      setProdCategory("0"); 
      setProdPrice("");
      setProdStock(""); 
      setProdImage([]);
    }
  }

  function showEditProductForm(item) {
    console.log('Editing product:', item);
    setEditId(item.id);
    setProdName(item.name || "");
    setProdDesc(item.desc || "");
    setProdCategory(item.categoryId || category[0]?.id || "");
    setProdPrice(item.price || "");
    setProdStock(item.stock || "ready");
    setProdImage([]); 
    setMessage({ text: "", type: "" });
  }

  function cancelEdit() {
    setEditId(null);
    setProdName("");
    setProdDesc("");
    setProdCategory(category[0]?.id || "");
    setProdPrice("");
    setProdStock("ready");
    setProdImage([]);
    setMessage({ text: "", type: "" });
  }

  function showMessage(text, type = "success") {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 5000);
  }

  function formatText(desc) {
    if (!desc) return "";
    if (desc.length <= 40) {
      return desc;
    } else {
      return `${desc.slice(0, 40)}...`;
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    try {
      if (!prodName.trim()) {
        throw new Error("Product name is required");
      }
      if (!prodPrice || Number(prodPrice) <= 0) {
        throw new Error("Valid price is required");
      }
      if (!prodCategory) {
        throw new Error("Category is required");
      }

      let imageUrls = [];
      if (prodImage && prodImage.length > 0) {
        imageUrls = await Promise.all(prodImage.map(uploadImageFile));
      }

      const payload = {
        name: prodName.trim(),
        desc: prodDesc.trim(),
        categoryId: Number(prodCategory),
        price: String(prodPrice),
        stock: prodStock,
        images: imageUrls,
      };

      console.log('Creating product with payload:', payload);

      await createProduct(payload);
      showMessage("Product created successfully!", "success");

      // Reset form
      setProdName("");
      setProdDesc("");
      setProdCategory(category[0]?.id || "");
      setProdPrice("");
      setProdStock("ready");
      setProdImage([]);
      setShowForm(false);
    } catch (e) {
      console.error("Create error:", e);
      showMessage(`Error: ${e.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleEditProduct(e) {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ text: "", type: "" });
    
    try {
      if (!prodName.trim()) {
        throw new Error("Product name is required");
      }
      if (!prodPrice || Number(prodPrice) <= 0) {
        throw new Error("Valid price is required");
      }
      if (!prodCategory) {
        throw new Error("Category is required");
      }

      console.log('Editing product ID:', editId, 'Type:', typeof editId);

      let imageUrls = [];
      if (prodImage && prodImage.length > 0) {
        imageUrls = await Promise.all(prodImage.map(uploadImageFile));
      }

      const payload = {
        name: prodName.trim(),
        desc: prodDesc.trim(),
        categoryId: Number(prodCategory),
        price: String(prodPrice),
        stock: prodStock,
      };

      // Only include images if new ones were uploaded
      if (imageUrls.length > 0) {
        payload.images = imageUrls;
      }

      console.log('Sending update payload:', payload);

      await updateProduct(editId, payload);
      showMessage("Product updated successfully!", "success");
      cancelEdit();
    } catch (e) {
      console.error("Edit error:", e);
      showMessage(`Error: ${e.message}`, "error");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleDeleteProduct(id, name) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }

    setMessage({ text: "", type: "" });
    
    try {
      console.log('Deleting product ID:', id, 'Type:', typeof id);
      await deleteProduct(id);
      showMessage("Product deleted successfully!", "success");
    } catch (e) {
      console.error("Delete error:", e);
      showMessage(`Error: ${e.message}`, "error");
    }
  }

  // Fungsi untuk handle image error dengan aman
  const handleImageError = (e) => {
    e.target.style.display = 'none';
    const nextSibling = e.target.nextSibling;
    if (nextSibling) {
      nextSibling.style.display = 'flex';
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <AdminTitle>List of Products</AdminTitle>
        <button
          type="button"
          onClick={showProductForm}
          className="flex items-center gap-2 bg-[#111] text-white px-4 py-2 rounded hover:bg-[#000] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isLoading}
        >
          <Plus size={20} />
          Add Product
        </button>
      </div>

      {message.text && (
        <div className={`p-4 mb-6 rounded-lg border ${
          message.type === "error" 
            ? "bg-red-50 text-red-700 border-red-200" 
            : "bg-green-50 text-green-700 border-green-200"
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900">
              <tr>
                <th className="w-16 px-6 py-4 font-semibold text-white border-b">No</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Product Name</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Description</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Category</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Price</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Stock</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Image</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading products...</span>
                    </div>
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
                    No products found. Click "Add Product" to create one.
                  </td>
                </tr>
              ) : (
                products.map((item, index) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-center">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{formatText(item.name)}</td>
                    <td className="px-6 py-4 text-gray-600">{formatText(item.desc)}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {item.category?.name || "Uncategorized"}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                      }).format(item.price)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.stock === "ready" 
                          ? "bg-green-100 text-green-800" 
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {item.stock === "ready" ? "Ready" : "Pre-order"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                        {item.images?.[0] ? (
                          <Image
                            src={item.images[0]}
                            alt={item.name}
                            width={64}
                            height={64}
                            className="object-cover w-full h-full"
                            onError={handleImageError}
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">No Image</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => showEditProductForm(item)}
                          className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors disabled:bg-blue-300 disabled:cursor-not-allowed"
                          disabled={isLoading}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(item.id, item.name)}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors disabled:bg-red-300 disabled:cursor-not-allowed"
                          disabled={isLoading}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Form Modal */}
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
          isLoading={isLoading}
        />
      )}

      {/* Edit Product Form Modal */}
      {editId && (
        <EditProductForm
          onHandleSubmit={handleEditProduct}
          onClose={cancelEdit}
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
          isLoading={isLoading}
        />
      )}
    </div>
  );
}