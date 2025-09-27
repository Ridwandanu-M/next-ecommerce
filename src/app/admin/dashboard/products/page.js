import Link from "next/link";
import { Plus } from "lucide-react";

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="text-[3.2rem] font-[700] mb-[1.8rem]">List of Products</h1>
      <div className="flex">
        <div className="relative">
          <table className="text-sm text-left rtl:text-right text-[#111] text-[1.4rem] border border-[#111] table-fixed shadow-lg">
            <thead className="text-xs text-[#fff] bg-[#111]">
              <tr className="text-[1.4rem]">
                <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                  No
                </th>
                <th scope="col" className="w-[40rem] px-[2.4rem] py-[1.4rem]">
                  Product Name
                </th>
                <th scope="col" className="w-[20rem] px-[2.4rem] py-[1.4rem]">
                  Category
                </th>
                <th scope="col" className="w-[20rem] px-[2.4rem] py-[1.4rem]">
                  Price
                </th>
                <th scope="col" className="w-[20rem] px-[2.4rem] py-[1.4rem]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-white border-b border-[#111]">
                <td className="px-[2.4rem] py-[1.4rem]">1</td>
                <td className="px-[2.4rem] py-[1.4rem]">Silver</td>
                <td className="px-[2.4rem] py-[1.4rem]">Laptop</td>
                <td className="px-[2.4rem] py-[1.4rem]">$2999</td>
                <td className="px-[2.4rem] py-[1.4rem]">
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
          <button className="absolute top-0 right-[-4.8rem] bg-[#111] text-[#fff] p-[1.2rem] cursor-pointer hover:bg-[#000]">
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
