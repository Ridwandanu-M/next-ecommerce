"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
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
    if (data.message) {
      setMessage(data.message);
      router.push("/signin");
    } else {
      setMessage(data.error);
    }
  }

  return (
    <div className="fixed top-1/2 left-1/2 -translate-1/2">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Sign Up</h1>
        <p className="text-md text-[#000]/70">Beli.com by Ridwandanu Maulana</p>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border border-black/40 text-md mt-4 p-12 w-md shadow-lg"
      >
        <div>
          <h2 className="font-medium">Username</h2>
          <input
            type="text"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Your name"
            className="border border-black/40 w-full p-1 px-2 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <h2 className="font-medium">Email</h2>
          <input
            type="email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="example@email.com"
            className="border border-black/40 w-full p-1 px-2 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <h2 className="font-medium">Password</h2>
          <input
            type="password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Create password"
            className="border border-black/40 w-full p-1 px-2 focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          className="font-medium text-[#fff] bg-[#111] hover:bg-[#000] py-2 cursor-pointer"
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
        <p className="text-md text-[#fa5252] text-center mt-2">{message}</p>
      )}
    </div>
  );
}
