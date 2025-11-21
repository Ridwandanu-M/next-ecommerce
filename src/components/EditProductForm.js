import { X } from "lucide-react";

export default function EditProductForm({
  onHandleSubmit,
  onClose,
  prodName,
  setProdName,
  prodDesc,
  setProdDesc,
  category,
  prodCategory,
  setProdCategory,
  prodPrice,
  setProdPrice,
  prodStock,
  setProdStock,
  setProdImage,
}) {
  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center backdrop-blur-xs">
      <form
        onSubmit={onHandleSubmit}
        className="relative flex flex-col justify-center w-[36rem] border border-[#111] py-16 px-12 bg-[#fff]"
      >
        <h2 className="text-2xl font-semibold text-center mb-6">
          Edit Product
        </h2>

        <div className="flex flex-col gap-1 mb-3">
          <label className="font-semibold">Name</label>
          <input
            type="text"
            value={prodName}
            onChange={(e) => setProdName(e.target.value)}
            placeholder="Product name"
            className="border border-[#111] p-2 px-3 focus:outline-none focus:ring"
          />
        </div>

        <div className="flex flex-col gap-1 mb-3">
          <label className="font-semibold">Description</label>
          <textarea
            placeholder="Product description"
            value={prodDesc}
            onChange={(e) => setProdDesc(e.target.value)}
            className="border border-[#111] p-2 px-3 focus:outline-none focus:ring"
          ></textarea>
        </div>

        <div className="flex flex-col gap-1 mb-3">
          <label className="font-semibold">Category</label>
          <select
            value={prodCategory}
            onChange={(e) => setProdCategory(e.target.value)}
            className="border border-[#111] p-2 px-3 focus:outline-none"
          >
            <option disabled>Select Category</option>
            {category.map((items, index) => (
              <option key={index} value={items.id}>
                {items.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 mb-3">
          <label className="font-semibold">Price</label>
          <input
            type="number"
            value={prodPrice}
            onChange={(e) => setProdPrice(e.target.value)}
            placeholder="Product price"
            className="border border-[#111] p-2 px-3 focus:outline-none focus:ring"
          />
        </div>

        <div className="flex flex-col gap-1 mb-3">
          <label className="font-semibold">Stock</label>
          <select
            value={prodStock}
            onChange={(e) => setProdStock(e.target.value)}
            className="border border-[#111] p-2 px-3 focus:outline-none"
          >
            <option disabled>Select Stock</option>
            <option value="ready">Ready</option>
            <option value="preorder">Pre Order</option>
          </select>
        </div>

        <div className="flex flex-col gap-1 mb-3">
          <label className="font-semibold">Image</label>
          <input
            type="file"
            multiple
            onChange={(e) => setProdImage(Array.from(e.target.files))}
            className="border border-[#111] p-2 px-3 focus:outline-none focus:ring"
          />
        </div>

        <button
          type="submit"
          className="font-[600] text-[#fff] bg-[#111] hover:bg-[#000] py-2 mt-4 cursor-pointer"
        >
          Edit Product
        </button>

        <button type="button" onClick={onClose} className="cursor-pointer">
          <X className="absolute top-4 right-4" />
        </button>
      </form>
    </div>
  );
}
