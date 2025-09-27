"use client";
import { useEffect, useState } from "react";
import { useDashboardData } from "../providers";

export default function AdminCategoryPage() {
  const { category, loading } = useDashboardData();

  return (
    <div>
      <h1 className="text-[3.2rem] font-[700] mb-[1.8rem]">
        Category of Products
      </h1>
      <div className="flex gap-[2.4rem]">
        <div className="relative overflow-x-auto">
          <table className="text-sm text-left rtl:text-right text-[#111] text-[1.4rem] border border-[#111] table-fixed shadow-lg">
            <thead className="text-xs text-[#fff] bg-[#111]">
              <tr className="text-[1.4rem]">
                <th scope="col" className="px-[2.4rem] py-[1.4rem]">
                  No
                </th>
                <th scope="col" className="w-[40rem] px-[2.4rem] py-[1.4rem]">
                  Category
                </th>
                <th scope="col" className="w-[20rem] px-[2.4rem] py-[1.4rem]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {category.map((c, index) => (
                <tr key={c.id}>
                  <td className="px-[2.4rem] py-[1.4rem]">{index + 1}</td>
                  <td className="px-[2.4rem] py-[1.4rem]">{c.name}</td>
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
