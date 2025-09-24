import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const { username, password } = body;
  const adminUser = process.env.ADMIN_USERNAME;
  const adminPass = process.env.ADMIN_PASSWORD;

  const isValid = username === adminUser && password === adminPass;

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid Username or Password" },
      { status: 401 },
    );
  }

  return NextResponse.json({ message: "Welcome Admin!" });
}
