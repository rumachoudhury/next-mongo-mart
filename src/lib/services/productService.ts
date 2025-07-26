import { cache } from "react";
import dbConnect from "../dbConnect";
import ProductModel from "../models/ProductModel";
import type { Product } from "../models/ProductModel";
// import { productService } from "../services/productService";

export const revalidate = 3600; //update every hour

const getLatest = cache(async () => {
  // Fetch the latest products
  await dbConnect();
  const products = await ProductModel.find({}).sort({ _id: -1 }).limit(4);
  return products as Product[];
});

const getFeatured = cache(async () => {
  await dbConnect();
  const product = await ProductModel.find({ isFeatured: true }).limit(3).lean();
  return product;
});

const getProductBySlug = cache(async (slug: string) => {
  await dbConnect();
  const product = await ProductModel.findOne({ slug }).lean();
  return product as Product | null;
});

const productService = {
  getLatest: getLatest,
  getFeatured: getFeatured,
  getProductBySlug: getProductBySlug,
};
export { productService };
