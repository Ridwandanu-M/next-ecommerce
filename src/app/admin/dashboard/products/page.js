import Link from "next/link";

export default function AdminProductsPage() {
  return (
    <div>
      <h1 className="text-[3.2rem] font-[700] mb-[1.8rem]">List of Products</h1>
      <div className="flex gap-[2.4rem]">
        <div class="relative overflow-x-auto">
          <table class="text-sm text-left rtl:text-right text-[#111] text-[1.4rem] border border-[#111] table-fixed shadow-lg">
            <thead class="text-xs text-[#fff] uppercase bg-[#111] py-[1.2re]">
              <tr className="text-[1.4rem]">
                <th scope="col" class="px-[2.4rem] py-[1.4rem]">
                  No
                </th>
                <th scope="col" class="w-[40rem] px-[2.4rem] py-[1.4rem]">
                  Product Name
                </th>
                <th scope="col" class="w-[20rem] px-[2.4rem] py-[1.4rem]">
                  Category
                </th>
                <th scope="col" class="w-[20rem] px-[2.4rem] py-[1.4rem]">
                  Price
                </th>
                <th scope="col" class="w-[20rem] px-[2.4rem] py-[1.4rem]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b border-[#111]">
                <td class="px-[2.4rem] py-[1.4rem]">1</td>
                <td class="px-[2.4rem] py-[1.4rem]">Silver</td>
                <td class="px-[2.4rem] py-[1.4rem]">Laptop</td>
                <td class="px-[2.4rem] py-[1.4rem]">$2999</td>
                <td class="px-[2.4rem] py-[1.4rem]">
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
        <div>
          <form className="text-[1.4rem] border border-[#111] px-[2.4rem] py-[3.2rem] w-[40rem] shadow-lg">
            <h2 className="font-[700] mb-[1.2rem] text-center">
              Manage Products
            </h2>
            <div className="flex flex-col gap-[1.2rem]">
              <div className="flex flex-col">
                <label>Name</label>
                <input
                  type="text"
                  className="border border-[#111] p-[.4rem] px-[.8rem]"
                />
              </div>
              <div className="flex flex-col">
                <label>Category</label>
                <input
                  type="text"
                  className="border border-[#111] p-[.4rem] px-[.8rem]"
                />
              </div>
              <div className="flex flex-col">
                <label>Price</label>
                <input
                  type="text"
                  className="border border-[#111] p-[.4rem] px-[.8rem]"
                />
              </div>
              <button className="bg-[#111] text-[#fff] py-[.8rem] hover:bg-[#000] cursor-pointer">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
