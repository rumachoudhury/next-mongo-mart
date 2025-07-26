import { NextRequest, NextResponse } from "next/server";
import data from "../../../../lib/data";
import dbConnect from "../../../../lib/dbConnect";
import UserModel from "../../../../lib/models/UserModel";
import ProductModel from "../../../../lib/models/ProductModel";

export const GET = async (request: NextRequest) => {
  const { users, products } = data;
  await dbConnect();
  await UserModel.deleteMany(); // Clear existing users
  await UserModel.insertMany(users); // Insert new users
  await ProductModel.insertMany(products); // Insert new products

  return NextResponse.json({
    // Return a JSON response
    message: "Database seeded successfully",
    users,
    products,
  });
};
