"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
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
    <div className="h-[100vh] flex justify-center items-center">
      <div>
        <div className="text-center">
          <h1 className="text-[3.2rem] font-[600]">Admin</h1>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-[2.4rem] border border-black/40 text-[1.4rem] mt-[2rem] p-[2.4rem] w-[40rem] shadow-lg"
        >
          <div>
            <h2 className="font-[600]">Username</h2>
            <input
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Admin username"
              className="border border-black/40 w-full p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
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
              className="border border-black/40 w-full p-[.4rem] px-[.8rem] focus:outline-none focus:ring"
            />
          </div>
          <button
            type="submit"
            className="font-[600] text-[#fff] bg-[#111] hover:bg-[#000] py-[.8rem] cursor-pointer"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
