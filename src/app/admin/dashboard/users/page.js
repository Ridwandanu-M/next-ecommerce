"use client";
import { useDashboardData } from "../providers";

export default function AdminUsersPage() {
  const { user } = useDashboardData();
  return (
    <div>
      <div className="mb-[1.8rem]">
        <h1 className="text-[3.2rem] font-[700]">List of Users</h1>
      </div>
      <div className="relative max-h-[85rem] overflow-y-scroll border-y border-y-[#111]">
        <table className="w-full text-sm text-left rtl:text-right text-[#111] text-[1.4rem] border border-[#111] table-fixed shadow-lg">
          <thead className="text-xs text-[#fff] bg-[#111]">
            <tr className="text-[1.4rem]">
              <th scope="col" className="w-[6rem] px-[2.4rem] py-[1.4rem]">
                No
              </th>
              <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                Username
              </th>
              <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                Email
              </th>
              <th scope="col" className="w-[24rem] px-[2.4rem] py-[1.4rem]">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {user.map((items, index) => (
              <tr key={items.id}>
                <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                  {index + 1}
                </td>
                <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                  {items.name}
                </td>
                <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                  {items.email}
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
  );
}
