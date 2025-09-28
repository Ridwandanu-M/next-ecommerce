"use client";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useDashboardData } from "../providers";

export default function AdminProductsPage() {
  const { category } = useDashboardData();

  return (
    <div>
      <div className="flex items-center gap-[1.8rem] mb-[1.8rem]">
        <h1 className="text-[3.2rem] font-[700]">List of Products</h1>
        <button className="bg-[#111] text-[#fff] p-[1.2rem] cursor-pointer hover:bg-[#000]">
          <Plus />
        </button>
      </div>
      <div className="flex">
        <div className="relative">
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
              <tr className="bg-white border-b border-[#111]">
                <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                  1
                </td>
                <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                  Gaming Keyboard
                </td>
                <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                  Description about this product....
                </td>
                <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                  Keyboard
                </td>
                <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                  Rp. 1.200.000
                </td>
                <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                  Pre Order
                </td>
                <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                  Images.Url
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
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed inset-0 z-20 flex justify-center items-center backdrop-blur-xs">
        <form className="text-[1.4rem] flex flex-col justify-center w-[48rem] border border-[#111] py-[5.6rem] px-[4rem] bg-[#fff]">
          <h2 className="text-[3.2rem] font-[700] text-center mb-[1.8rem]">
            Add Product
          </h2>
          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
            <label className="font-[700]">Name</label>
            <input
              type="text"
              placeholder="Product name"
              className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
            />
          </div>
          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
            <label className="font-[700]">Description</label>
            <textarea
              placeholder="Product description"
              className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
            ></textarea>
          </div>
          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
            <label className="font-[700]">Category</label>
            <select className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none">
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
              placeholder="Rp. 1.000.000"
              className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
            />
          </div>
          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
            <label className="font-[700]">Stock</label>
            <select className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none">
              <option disabled>Select Stock</option>
              <option value="1">Ready</option>
              <option value="2">Pre Order</option>
            </select>
          </div>
          <div className="flex flex-col gap-[.4rem] mb-[.8rem]">
            <label className="font-[700]">Image</label>
            <input
              type="file"
              className="border border-[#111] p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
            />
          </div>
          <button className="font-[600] text-[#fff] bg-[#111] hover:bg-[#000] py-[.8rem] mt-[1.2rem] cursor-pointer">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
