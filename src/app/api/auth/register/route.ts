import prisma from '@/app/libs/db';
import { connectToDb } from "../../../../helpers/server-helpers";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async (request:Request) => {
  const { name, email, password } = await request.json();

  await connectToDb();

    // Check if the user already exists
    const existingUser = await prisma.register.findUnique({ where: { email } });

    if (existingUser) {
      return new NextResponse("Email is already in use", { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 5);

    // Create a new user using Prisma
    const newUser = await prisma.register.create({
        //@ts-ignore
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    try{
    return new NextResponse("User is registered", { status: 201 }); // Use 201 for resource creation
  } catch (error) {
    // @ts-ignore
    return new NextResponse(error.message || "Internal Server Error", { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
