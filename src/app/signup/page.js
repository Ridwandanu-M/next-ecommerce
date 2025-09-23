"use client";
import Link from "next/link";
import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
  }

  return (
    <div className="h-[100vh] flex justify-center items-center">
      <div>
        <div className="text-center">
          <h1 className="text-[3.2rem] font-[600]">Sign Up</h1>
          <p className="text-[1.8rem] text-[#000]/70">
            Beli.com by Ridwandanu Maulana
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-[2.4rem] border border-black/40 text-[1.4rem] mt-[2rem] p-[2.4rem] w-[40rem] shadow-lg"
        >
          <div>
            <h2 className="font-[600]">Username</h2>
            <input
              type="text"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Your name"
              className="border border-black/40 w-full p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
            />
          </div>
          <div>
            <h2 className="font-[600]">Email</h2>
            <input
              type="email"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="example@email.com"
              className="border border-black/40 w-full p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
            />
          </div>
          <div>
            <h2 className="font-[600]">Password</h2>
            <input
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Create password"
              className="border border-black/40 w-full p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
            />
          </div>
          <button
            type="submit"
            className="font-[600] text-[#fff] bg-[#111] hover:bg-[#000] py-[.8rem] cursor-pointer"
          >
            Sign Up
          </button>
          <div className="w-full border-t border-t-[#000]/40"></div>
          <Link
            href="/signin"
            className="text-center text-[#000]/90 hover:underline"
          >
            Already have an account?
          </Link>
        </form>
        {message && (
          <p className="text-[1.4rem] text-[#fa5252] text-center mt-[1.2rem]">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
