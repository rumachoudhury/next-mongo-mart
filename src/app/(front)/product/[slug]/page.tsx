// import AddToCart from "@/components/AddToCart";
// import { convertDocToObj } from "@/lib/utils";
// import { productService } from "@/lib/services/productService";
// import Image from "next/image";
// import Link from "next/link";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const product = await productService.getProductBySlug(params.slug);

//   if (!product) {
//     return {
//       title: "Product not found",
//     };
//   }

//   return {
//     title: product.name,
//     description: product.description,
//   };
// }

// export default async function ProductDetails({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const product = await productService.getProductBySlug(params.slug);
//   if (!product) {
//     return <div>Product not found</div>;
//   }
//   return (
//     <>
//       <div className="my-2">
//         <Link href="/">back to products</Link>
//       </div>
//       <div className="grid md:grid-cols-4 md:gap-3">
//         <div className="md:col-span-2">
//           <Image
//             src={product.image}
//             alt={product.name}
//             width={640}
//             height={640}
//             sizes="100vw"
//             style={{
//               width: "100%",
//               height: "auto",
//             }}
//           ></Image>
//         </div>
//         <div>
//           <ul className="space-y-4">
//             <li>
//               <h1 className="text-xl">{product.name}</h1>
//             </li>
//             {/* <li>
//               <Rating
//                 value={product.rating}
//                 caption={`${product.numReviews} ratings`}
//               />
//             </li> */}
//             <li> {product.brand}</li>
//             <li>
//               <div className="divider"></div>
//             </li>
//             <li>
//               Description: <p>{product.description}</p>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <div className="card  bg-base-300 shadow-xl mt-3 md:mt-0">
//             <div className="card-body">
//               <div className="mb-2 flex justify-between">
//                 <div>Price</div>
//                 <div>${product.price}</div>
//               </div>
//               <div className="mb-2 flex justify-between">
//                 <div>Status</div>
//                 <div>
//                   {product.countInStock > 0 ? "In stock" : "Unavailable"}
//                 </div>
//               </div>
//               {product.countInStock !== 0 && (
//                 <div className="card-actions justify-center">
//                   <AddToCart
//                     item={{
//                       ...convertDocToObj(product),
//                       qty: 0,
//                       color: "",
//                       size: "",
//                     }}
//                   />
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// src/app/(front)/product/[slug]/page.tsx
// import AddToCart from "@/components/AddToCart";
import { convertDocToObj } from "@/lib/utils";
import { productService } from "@/lib/services/productService";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCart from "@/components/AddToCart";

type Params = {
  params: { slug: string };
};
// export async function generateMetadata({ params }: Params) {
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const awaitedParams = await params; // await the params Promise first
  const product = await productService.getProductBySlug(awaitedParams.slug);
  if (!product) {
    return {
      title: "Product not found",
    };
  }

  return {
    title: product.name,
    description: product.description,
  };
}

// Page Component
export default async function ProductDetails({ params }: Params) {
  const product = await productService.getProductBySlug(params.slug);

  if (!product) {
    notFound(); // triggers 404
  }

  return (
    <div className="container mx-auto px-4">
      <div className="my-4">
        <Link href="/" className="text-blue-500 underline">
          ← Back to products
        </Link>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {/* Product Image */}
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
            className="rounded shadow-md"
          />
        </div>

        {/* Product Details */}
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-2xl font-semibold">{product.name}</h1>
            </li>
            <li className="text-gray-700">Brand: {product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              <p className="text-gray-800">{product.description}</p>
            </li>
          </ul>
        </div>

        {/* Add to Cart Box */}
        <div>
          <div className="bg-base-300 rounded-lg shadow-lg p-4">
            <div className="mb-4 flex justify-between text-lg">
              <span>Price:</span>
              <span>${product.price}</span>
            </div>
            <div className="mb-4 flex justify-between text-lg">
              <span>Status:</span>
              <span>
                {product.countInStock > 0 ? "In Stock" : "Unavailable"}
              </span>
            </div>

            {product.countInStock > 0 && (
              <div className="card-actions justify-center">
                <AddToCart
                  item={{
                    ...convertDocToObj(product),
                    qty: 0,
                    color: "",
                    size: "",
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
