import { X } from "lucide-react";

export default function AddProductForm({
  onHandleSubmit,
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
  showProductForm,
}) {
  return (
    <div className="fixed inset-0 z-20 flex justify-center items-center backdrop-blur-xs">
      <form
        onSubmit={onHandleSubmit}
        className="relative text-[1.4rem] flex flex-col justify-center w-[48rem] border border-[#111] py-[5.6rem] px-[4rem] bg-[#fff]"
      >
        <h2 className="text-[3.2rem] font-[700] text-center mb-[1.8rem]">
          Add Product
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
            onChange={(e) => setProdImage(Array.from(e.target.files))}
            className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          className="font-[600] text-[#fff] bg-[#111] hover:bg-[#000] py-[.8rem] mt-[1.2rem] cursor-pointer"
        >
          Add Product
        </button>
        <button
          type="button"
          onClick={() => showProductForm()}
          className="cursor-pointer"
        >
          <X className="absolute top-[1.8rem] right-[1.8rem]" />
        </button>
      </form>
    </div>
  );
}
