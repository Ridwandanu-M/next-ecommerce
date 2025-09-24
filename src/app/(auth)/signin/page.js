"use client";

import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const res = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res?.error) {
      setError("Email atau password salah");
    } else {
      router.push("/");
    }
  }

  return (
    <div>
      <div>
        <div className="text-center">
          <h1 className="text-[3.2rem] font-[600]">Sign In</h1>
          <p className="text-[1.8rem] text-[#000]/70">
            Beli.com by Ridwandanu Maulana
          </p>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col gap-[2.4rem] border border-black/40 text-[1.4rem] mt-[2rem] p-[2.4rem] w-[40rem] shadow-lg"
        >
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
            <div className="flex justify-between">
              <h2 className="font-[600]">Password</h2>
              <Link href="/" className="font-[600] hover:underline">
                Forgot Password?
              </Link>
            </div>
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
          <p className="text-[1.4rem] text-[#fa5252] text-center mt-[1.2rem]">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
