"use client";
import Link from "next/link";
import { useState } from "react";
import { Heart, Share2 } from "lucide-react";
import CartButton from "./CartButton";

export default function OrderBox({ price, id }) {
  const [multiple, setMultiple] = useState(1);

  const total = Number(price) * multiple;

  return (
    <section>
      <div className="flex items-center justify-between ">
        <div className="flex items-center">
          <button
            onClick={
              multiple === 1
                ? () => setMultiple(1)
                : () => setMultiple((prev) => prev - 1)
            }
            className="px-3 py-1 border border-[#111] hover:bg-[#111] hover:text-[#fff] active:bg-[#111] cursor-pointer"
          >
            -
          </button>
          <p className="text-center w-16 py-1 border border-y-[#111]">
            {multiple}
          </p>
          <button
            onClick={() => setMultiple((prev) => prev + 1)}
            className="px-3 py-1 border border-[#111] hover:bg-[#111] hover:text-[#fff] active:bg-[#111] cursor-pointer"
          >
            +
          </button>
        </div>
        <p className="text-2xl font-semibold">
          {new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
          }).format(total)}
        </p>
      </div>
      <div className="flex flex-col mt-8 gap-2">
        <CartButton productId={id} />
        <button
          href="#"
          className="flex justify-center border border-[#111] bg-[#fff] text-[#111] text-md py-2 hover:text-[#fff] hover:bg-[#111] cursor-pointer"
        >
          Buy Now
        </button>
      </div>
      <div className="flex justify-evenly mt-6 font-semibold">
        <Link href="#" className="flex items-center gap-3">
          <Heart />
          Wishlist
        </Link>
        <div className="border border-l-[#111]"></div>
        <Link href="#" className="flex items-center gap-3">
          <Share2 />
          Share
        </Link>
      </div>
    </section>
  );
}
