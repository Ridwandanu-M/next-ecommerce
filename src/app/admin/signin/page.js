"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminSigninPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const res = await fetch("/api/admin/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin/dashboard");
    } else {
      alert("Invalid Username or Password");
    }
  }

  return (
    <div className="fixed left-1/2 top-1/2 -translate-1/2">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Admin</h1>
        <p className="text-md text-[#000]/70">Admin Beli.com</p>
      </div>
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-4 border border-black/40 text-md mt-4 p-12 w-md shadow-lg"
      >
        <div>
          <h2 className="font-medium">Username</h2>
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Admin username"
            className="border border-black/40 w-full p-1 px-2 focus:outline-none focus:ring"
          />
        </div>
        <div>
          <div className="flex justify-between">
            <h2 className="font-[600]">Password</h2>
          </div>
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="border border-black/40 w-full p-1 px-2 focus:outline-none focus:ring"
          />
        </div>
        <button
          type="submit"
          className="font-medium text-[#fff] bg-[#111] hover:bg-[#000] py-2 cursor-pointer"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}
