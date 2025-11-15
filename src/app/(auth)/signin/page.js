"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    // TODO: Implement your own authentication logic here
    console.log("Login attempt:", form);
    setError("Authentication not implemented yet");
  }

  return (
    <div className="fixed left-1/2 top-1/2 -translate-1/2">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Sign In</h1>
        <p className="text-md text-[#000]/70">Beli.com by Ridwandanu Maulana</p>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 border border-black/40 text-md mt-4 p-12 w-md shadow-lg"
      >
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
          <div className="flex justify-between">
            <h2 className="font-medium">Password</h2>
            <Link href="/" className="font-medium hover:underline">
              Forgot Password?
            </Link>
          </div>
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
          Sign In
        </button>
        <div className="w-full border-t border-t-[#000]/40"></div>
        <Link
          href="/signup"
          className="text-center text-[#000]/90 hover:underline"
        >
          New to Beli.com?
        </Link>
      </form>
      {error && (
        <p className="text-md text-[#fa5252] text-center mt-2">{error}</p>
      )}
    </div>
  );
}
