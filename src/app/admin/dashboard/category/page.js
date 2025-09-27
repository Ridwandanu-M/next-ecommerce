"use client";
import { useEffect, useState } from "react";
import { useDashboardData } from "../providers";
import { Plus } from "lucide-react";

export default function AdminCategoryPage() {
  const { category, createCategory, editCategory } = useDashboardData();
  const [addCategory, setAddCategory] = useState("");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [showEditCategoryForm, setShowEditCategoryForm] = useState(false);
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

  return (
    <div>
      <h1 className="text-[3.2rem] font-[700] mb-[1.8rem]">
        Category of Products
      </h1>
      <div className="flex gap-[2.4rem]">
        <div className="relative">
          <table className="text-sm text-left rtl:text-right text-[#111] text-[1.4rem] border border-[#111] table-fixed shadow-lg">
            <thead className="text-xs text-[#fff] bg-[#111]">
              <tr className="text-[1.4rem]">
                <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                  No
                </th>
                <th scope="col" className="w-[80rem] px-[2.4rem] py-[1.4rem]">
                  Category
                </th>
                <th scope="col" className="w-[20rem] px-[2.4rem] py-[1.4rem]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="relative">
              {category.map((items, index) => (
                <tr key={items.id}>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {index + 1}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
                    {items.name}
                  </td>
                  <td className="px-[2.4rem] py-[1.4rem] border-t border-t-[#111]/25">
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
                        <button className="hover:underline cursor-pointer">
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={() => showAddCategory()}
            className="absolute top-0 right-[-4.8rem] bg-[#111] text-[#fff] p-[1.2rem] cursor-pointer hover:bg-[#000]"
          >
            <Plus />
          </button>
          {showAddCategoryForm && (
            <form onSubmit={handleAddCategory}>
              <div className="absolute top-0 right-[-36rem] flex shadow-lg">
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
      </div>
    </div>
  );
}
