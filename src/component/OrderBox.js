"use client";
import Link from "next/link";
import { useState } from "react";
import { Heart, Share2 } from "lucide-react";

export default function OrderBox({ price }) {
  const [multiple, setMultiple] = useState(1);

  const total = Number(price) * multiple;

  return (
    <section className="text-[1.4rem]">
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <button
            onClick={
              multiple === 1
                ? () => setMultiple(1)
                : () => setMultiple((prev) => prev - 1)
            }
            className="px-[1.8rem] py-[.4rem] border border-[#111] hover:bg-[#111] hover:text-[#fff] active:bg-[#111] cursor-pointer"
          >
            -
          </button>
          <p className="text-center w-[4.8rem] py-[.4rem] border border-y-[#111]">
            {multiple}
          </p>
          <button
            onClick={() => setMultiple((prev) => prev + 1)}
            className="px-[1.8rem] py-[.4rem] border border-[#111] hover:bg-[#111] hover:text-[#fff] active:bg-[#111] cursor-pointer"
          >
            +
          </button>
        </div>
        <p className="text-[1.8rem] font-[700]">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(total)}
        </p>
      </div>
      <div className="flex flex-col mt-[3.2rem] gap-[.4rem]">
        <Link
          href="#"
          className="flex justify-center border border-[#111] bg-[#111] text-[#fff] py-[1.2rem] hover:text-[#111] hover:bg-[#fff]"
        >
          Add to Cart
        </Link>
        <Link
          href="#"
          className="flex justify-center border border-[#111] bg-[#fff] text-[#111] py-[1.2rem] hover:text-[#fff] hover:bg-[#111]"
        >
          Buy Now
        </Link>
      </div>
      <div className="flex justify-evenly mt-[3.2rem] font-[700]">
        <Link href="#" className="flex items-center gap-[1.2rem]">
          <Heart />
          Wishlist
        </Link>
        <div className="border border-l-[#111]"></div>
        <Link href="#" className="flex items-center gap-[1.2rem]">
          <Share2 />
          Share
        </Link>
      </div>
    </section>
  );
}
