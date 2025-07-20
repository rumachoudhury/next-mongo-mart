import ProductItem from "@/components/ProductItem";
import data from "../../../lib/data";

export default async function Home() {
  return (
    <>
      <h2 className="text-2xl py-2 font-semibold">Latest Products</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem key={product.slug} product={product} />
        ))}
      </div>
    </>
  );
}
