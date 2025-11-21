"use client";
import { useState } from "react";
import { useData } from "@/app/providers";
import { Plus } from "lucide-react";
import AdminTitle from "@/components/AdminTitle";

export default function AdminCategoryPage() {
  const { category, createCategory, editCategory, deleteCategory, loading } =
    useData();
  const [addCategory, setAddCategory] = useState("");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState("");

  function showAddCategory() {
    setShowAddCategoryForm((prev) => !prev);
    setEditId(null);
    setAddCategory("");
  }

  function showEditCategory(items) {
    setEditId(items.id);
    setEditCategoryName(items.name);
    setShowAddCategoryForm(false);
  }

  function cancelEdit() {
    setEditId(null);
    setEditCategoryName("");
  }

  async function handleAddCategory(e) {
    e.preventDefault();
    if (!addCategory.trim()) return;
    
    await createCategory({ name: addCategory });
    setAddCategory("");
    setShowAddCategoryForm(false);
  }

  async function handleEditCategory(e) {
    e.preventDefault();
    if (!editCategoryName.trim()) return;
    
    await editCategory(editId, editCategoryName);
    cancelEdit();
  }

  async function handleDeleteCategory(id, name) {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) {
      return;
    }
    await deleteCategory(id);
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <AdminTitle>Category of Product</AdminTitle>
        <button
          onClick={showAddCategory}
          className="flex items-center gap-2 bg-[#111] text-white px-4 py-2 rounded hover:bg-[#000] transition-colors"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Add Category Form */}
      {showAddCategoryForm && (
        <form onSubmit={handleAddCategory} className="mb-6">
          <div className="flex gap-3">
            <input
              type="text"
              value={addCategory}
              onChange={(e) => setAddCategory(e.target.value)}
              placeholder="Enter category name"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add
            </button>
            <button
              type="button"
              onClick={showAddCategory}
              className="px-4 py-2 text-gray-700 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-900">
              <tr>
                <th className="w-16 px-6 py-4 font-semibold text-white border-b">No</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Category Name</th>
                <th className="px-6 py-4 font-semibold text-white border-b">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center">
                    <div className="flex justify-center items-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      <span className="ml-2">Loading categories...</span>
                    </div>
                  </td>
                </tr>
              ) : category.length === 0 ? (
                <tr>
                  <td colSpan="3" className="px-6 py-8 text-center text-gray-500">
                    No categories found. Click "Add Category" to create one.
                  </td>
                </tr>
              ) : (
                category.map((items, index) => (
                  <tr key={items.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 text-center">{index + 1}</td>
                    <td className="px-6 py-4">
                      {editId === items.id ? (
                        <form onSubmit={handleEditCategory} className="flex gap-3">
                          <input
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                            placeholder="Enter category name"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                          />
                          <button
                            type="submit"
                            className="px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={cancelEdit}
                            className="px-3 py-2 text-gray-700 bg-gray-100 border border-gray-300 text-sm rounded hover:bg-gray-200 transition-colors"
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <span className="font-medium text-gray-900">{items.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {editId !== items.id && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => showEditCategory(items)}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteCategory(items.id, items.name)}
                            className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      )}
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