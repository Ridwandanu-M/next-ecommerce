"use client";
import { useData } from "@/app/providers";
import AdminTitle from "@/components/AdminTitle";

export default function AdminUsersPage() {
  const { user, loading } = useData();

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <AdminTitle>List of Users</AdminTitle>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900">
              <tr>
                <th className="w-16 px-6 py-4 font-semibold text-white border-b">No</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Username</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Email</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Address</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Created At</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading users...</span>
                    </div>
                  </td>
                </tr>
              ) : user.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                    No users found.
                  </td>
                </tr>
              ) : (
                user.map((items, index) => (
                  <tr key={items.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-center">{index + 1}</td>
                    <td className="px-6 py-4 font-medium">{items.name}</td>
                    <td className="px-6 py-4 text-gray-600">{items.email}</td>
                    <td className="px-6 py-4">
                      {items.address ? (
                        <span className="text-gray-600">{items.address}</span>
                      ) : (
                        <span className="text-gray-400 italic">No address</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(items.created_at).toLocaleDateString('id-ID', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors">
                          Edit
                        </button>
                        <button className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors">
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
    </div>
  );
}