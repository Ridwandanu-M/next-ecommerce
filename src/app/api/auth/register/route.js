import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "All input required!" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser)
      return NextResponse.json(
        { error: "Email already in use" },
        { status: 409 },
      );

    const passwordHash = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
    });

    return NextResponse.json(
      { message: "Registration success", user },
      { status: 201 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
