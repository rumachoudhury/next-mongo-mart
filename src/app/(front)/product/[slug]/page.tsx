// import Image from "next/image";
// import Link from "next/link";
// import data from "../../../../lib/data";
// import AddToCart from "@/components/AddToCart";
// import { productService } from "@/lib/services/productService";

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

// export default async function ProductDetails(props: {
//   params: { slug: string };
// }) {
//   const { slug } = await Promise.resolve(props.params); //  FIX

//   const product = data.products.find((product) => product.slug === slug);
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
//             width={500}
//             height={500}
//             sizes="100vw"
//             priority={true}
//             style={{
//               width: "100%",
//               height: "auto",
//             }}
//           />
//         </div>
//         <div>
//           <ul className="space-y-4">
//             <li>
//               <h1 className="text-xl">{product.name}</h1>
//             </li>
//             <li>
//               {product.rating} of {product.numReviews} reviews
//             </li>
//             <li>{product.brand}</li>
//             <li>
//               <div className="divider"></div>
//             </li>
//             <li>
//               Description: <p>{product.description}</p>
//             </li>
//           </ul>
//         </div>
//         <div>
//           <div className="card bg-base-300 shadow-xl mt-3 md:mt-0">
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
//               {product.countInStock > 0 && (
//                 <div className="card-actions justify-center">
//                   <AddToCart
//                     item={{ ...product, qty: 0, color: "", size: "" }}
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
// --------------------

import AddToCart from "@/components/AddToCart";
import { convertDocToObj } from "@/lib/utils";
import { productService } from "@/lib/services/productService";
import Image from "next/image";
import Link from "next/link";
// import { Rating } from "@/components/products/Rating";

// export async function generateMetadata({
//   params,
// }: {
//   params: { slug: string };
// }) {
//   const product = await productService.getProductBySlug(params.slug);
//   if (!product) {
//     return { title: "Product not found" };
//   }
//   return {
//     title: product.name,
//     description: product.description,
//   };
// }

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getProductBySlug(params.slug);

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

export default async function ProductDetails({
  params,
}: {
  params: { slug: string };
}) {
  const product = await productService.getProductBySlug(params.slug);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <>
      <div className="my-2">
        <Link href="/">back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            src={product.image}
            alt={product.name}
            width={640}
            height={640}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
          ></Image>
        </div>
        <div>
          <ul className="space-y-4">
            <li>
              <h1 className="text-xl">{product.name}</h1>
            </li>
            {/* <li>
              <Rating
                value={product.rating}
                caption={`${product.numReviews} ratings`}
              />
            </li> */}
            <li> {product.brand}</li>
            <li>
              <div className="divider"></div>
            </li>
            <li>
              Description: <p>{product.description}</p>
            </li>
          </ul>
        </div>
        <div>
          <div className="card  bg-base-300 shadow-xl mt-3 md:mt-0">
            <div className="card-body">
              <div className="mb-2 flex justify-between">
                <div>Price</div>
                <div>${product.price}</div>
              </div>
              <div className="mb-2 flex justify-between">
                <div>Status</div>
                <div>
                  {product.countInStock > 0 ? "In stock" : "Unavailable"}
                </div>
              </div>
              {product.countInStock !== 0 && (
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
    </>
  );
}
