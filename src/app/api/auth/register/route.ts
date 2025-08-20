import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/lib/models/UserModel";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, password } = await request.json();
  await dbConnect();
  const hashpassword = await bcrypt.hash(password, 10);
  const newUser = new UserModel({
    name,
    email,
    password: hashpassword,
  });

  try {
    await newUser.save();
    return Response.json(
      {
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error: any) {
    return Response.json({ message: error.message }, { status: 500 });
  }
};
