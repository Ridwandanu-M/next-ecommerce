"use client";
import { useData } from "@/app/providers";
import AdminTitle from "@/components/AdminTitle";

export default function AdminUsersPage() {
  const { user, loading } = useData();
  return (
    <div>
      <div className="mb-4">
        <AdminTitle>List of Users</AdminTitle>
      </div>
      <div className="relative max-h-[880px] overflow-y-auto no-scrollbar border-y border-y-[#111]">
        <table className="w-full text-left rtl:text-right text-[#111] border border-[#111] table-fixed shadow-lg">
          <thead className="text-[#fff] bg-[#111] sticky top-0 z-10">
            <tr>
              <th scope="col" className="w-16 text-center px-4 py-4">
                No
              </th>
              <th scope="col" className="px-4 py-4">
                Username
              </th>
              <th scope="col" className="px-4 py-4">
                Email
              </th>
              <th scope="col" className="px-4 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="w-full">
                <td colSpan="4" className="px-[40%] py-[3.2rem]">
                  Loading user data
                </td>
              </tr>
            ) : (
              user.map((items, index) => (
                <tr key={items.id}>
                  <td className="w-16 text-center px-4 py-4 border-t border-t-[#111]/25">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    {items.name}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    {items.email}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    <button className="hover:underline cursor-pointer">
                      Edit
                    </button>
                    <span> | </span>
                    <button className="hover:underline cursor-pointer">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
