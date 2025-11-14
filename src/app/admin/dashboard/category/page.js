"use client";
import { useEffect, useState } from "react";
import { DataProvider, useData } from "@/app/providers";
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
  }

  function showEditCategory(items) {
    setEditId(items.id);
    setEditCategoryName(items.name);
    setShowAddCategoryForm(false);
  }

  async function handleAddCategory(e) {
    e.preventDefault();
    await createCategory({ name: addCategory });
    setAddCategory("");
  }

  async function handleEditCategory(e) {
    e.preventDefault();
    await editCategory(editId, editCategoryName);
    setEditId(null);
    setEditCategoryName("");
  }

  async function handleDeleteCategory(id) {
    if (confirm("Delete this category?")) {
      await deleteCategory(id);
    }
  }

  return (
    <div>
      <div>
        <div className="flex items-center gap-4 mb-4">
          <AdminTitle>Category of Product</AdminTitle>
          <button
            onClick={() => showAddCategory()}
            className="bg-[#111] text-[#fff] p-2 cursor-pointer hover:bg-[#000]"
          >
            <Plus />
          </button>
        </div>
        {showAddCategoryForm && (
          <form onSubmit={handleAddCategory}>
            <div className="flex shadow-lg">
              <input
                type="text"
                value={addCategory}
                onChange={(e) => setAddCategory(e.target.value)}
                placeholder="Add Category"
                className="border border-black/40 py-[1.25rem] px-[1.4rem] focus:outline-none focus:border focus:border-[#111] text-[1.4rem]"
              />
              <button className="bg-[#111] text-[#fff] p-[1.2rem] cursor-pointer hover:bg-[#000]">
                <Plus />
              </button>
            </div>
          </form>
        )}
      </div>
      <div className="relative max-h-[880px] overflow-y-auto no-scrollbar border-y border-y-[#111]">
        <table className="w-full text-left rtl:text-right text-[#111] border border-[#111] table-fixed shadow-lg">
          <thead className="text-[#fff] bg-[#111] sticky top-0 z-10">
            <tr>
              <th scope="col" className="w-16 text-center px-4 py-4">
                No
              </th>
              <th scope="col" className="px-4 py-4">
                Category
              </th>
              <th scope="col" className="px-4 py-4">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="w-full">
                <td colSpan="3" className="px-[40%] py-[3.2rem]">
                  Loading category data
                </td>
              </tr>
            ) : (
              category.map((items, index) => (
                <tr key={items.id}>
                  <td className="w-16 text-center px-4 py-4 border-t border-t-[#111]/25">
                    {index + 1}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    {items.name}
                  </td>
                  <td className="px-4 py-4 border-t border-t-[#111]/25">
                    {editId === items.id ? (
                      <form
                        onSubmit={handleEditCategory}
                        className="flex gap-[1.2rem]"
                      >
                        <input
                          value={editCategoryName}
                          onChange={(e) => setEditCategoryName(e.target.value)}
                          className="outline outline-[#111]"
                        />
                        <button
                          type="submit"
                          className="px-[1.2rem] bg-[#111] text-[#fff] cursor-pointer hover:bg-[#000]"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditId(null)}
                          className="px-[1.2rem] bg-[#111] text-[#fff] cursor-pointer hover:bg-[#000]"
                        >
                          Cancel
                        </button>
                      </form>
                    ) : (
                      <>
                        <button
                          onClick={() => showEditCategory(items)}
                          className="hover:underline cursor-pointer"
                        >
                          Edit
                        </button>
                        <span> | </span>
                        <button
                          onClick={() => handleDeleteCategory(items.id)}
                          className="hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </>
                    )}
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
