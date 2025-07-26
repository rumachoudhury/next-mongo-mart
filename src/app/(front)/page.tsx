import ProductItem from "@/components/ProductItem";
import data from "../../lib/data";
import { Metadata } from "next";
import { productService } from "../../lib/services/productService";

import Link from "next/link";

export const metadata: Metadata = {
  title: process.env.NEXT_PUBLIC_APP_NAME || "Next Mongo Mart",
  description:
    process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
    "nextjs, Server components, next auth, daisyui, zustand",
};

export default async function Home() {
  const featuredProducts = await productService.getFeatured();
  const latestProducts = await productService.getLatest();

  return (
    <>
      <div className="w-full carousel rounded-box mt-4">
        {featuredProducts.map((product, index) => (
          <div
            key={String(product._id)}
            id={`slide${index}`}
            className="carousel-item relative w-full "
          >
            <Link href={`/product/${product.slug}`}>
              <img
                src={product.banner}
                alt={product.name}
                className="w-full "
              />
            </Link>

            <div className="absolute flex items-center justify-between transform translate-y-1/2 top-1/2 left-5 right-5">
              <a
                href={`#slide-${
                  index === 0 ? featuredProducts.length - 1 : index - 1
                }`}
                className="btb btn-circle"
              ></a>
              <a
                href={`#slide-${(index + 1) % featuredProducts.length}`}
                className="btn btn-circle"
              ></a>
            </div>
          </div>
        ))}
      </div>
      <h2 className="text-2xl py-2 font-semibold">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {latestProducts.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
}
