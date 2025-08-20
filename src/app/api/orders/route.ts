// import { NextResponse } from "next/server";
// import { auth } from "@/lib/auth";
// import dbConnect from "@/lib/dbConnect";
// import OrderModel, { OrderItem } from "@/lib/models/OrderModel";
// import ProductModel from "@/lib/models/ProductModel";
// import { round2 } from "@/lib/utils";

// // Helper: calculate order prices
// const calcPrices = (orderItems: OrderItem[]) => {
//   const itemsPrice = round2(
//     orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
//   );
//   const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
//   const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)));
//   const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

//   return { itemsPrice, shippingPrice, taxPrice, totalPrice };
// };

// // Define Product interface here
// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   quantity: number;
// }

// // POST /api/orders
// export const POST = auth(async (req: any) => {
//   if (!req.auth) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   const { user } = req.auth;

//   try {
//     await dbConnect();
//     const payload = await req.json();

//     // Ensure we got items
//     if (!payload?.items || payload.items.length === 0) {
//       return NextResponse.json(
//         { message: "No items in order" },
//         { status: 400 }
//       );
//     }

//     // Get product prices from DB
//     const dbProductPrice = await ProductModel.find(
//       {
//         _id: { $in: payload.items.map((x: { _id: string }) => x._id) },
//       },
//       "price"
//     );

//     const dbOrderItems = payload.items.map(
//       (item: { price: any; _id: string }) => {
//         const product = dbProductPrice.find(
//           (p) => p._id.toString() === item._id.toString()
//         );
//         return {
//           ...item,
//           product: item._id,
//           price: product?.price ?? item.price, // fallback
//           _id: undefined,
//         };
//       }
//     );

//     const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
//       calcPrices(dbOrderItems);

//     const newOrder = new OrderModel({
//       items: dbOrderItems,
//       itemsPrice,
//       taxPrice,
//       shippingPrice,
//       totalPrice,
//       shippingAddress: payload.shippingAddress,
//       paymentMethod: payload.paymentMethod,
//       user: user._id,
//     });

//     const createdOrder = await newOrder.save();

//     return NextResponse.json(
//       { message: "Order has been created", order: createdOrder },
//       { status: 201 }
//     );
//   } catch (err) {
//     console.error("Order creation failed:", err);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// });

// ___________________

import { getServerSession } from "next-auth"; // updated import
import { authOptions } from "../auth/[...nextauth]/route"; // should now work
import dbConnect from "@/lib/dbConnect";
import OrderModel, { OrderItem } from "@/lib/models/OrderModel";
import ProductModel from "@/lib/models/ProductModel";
import { round2 } from "@/lib/utils";

const calcPrices = (orderItems: OrderItem[]) => {
  const itemsPrice = round2(
    orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = round2(itemsPrice > 100 ? 0 : 10);
  const taxPrice = round2(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);
  return { itemsPrice, shippingPrice, taxPrice, totalPrice };
};

export const POST = async (req: Request) => {
  // Check session
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    await dbConnect();
    const payload = await req.json();

    // Fetch product prices from DB
    const dbProducts = await ProductModel.find(
      { _id: { $in: payload.items.map((x: { _id: string }) => x._id) } },
      "price"
    );

    const dbOrderItems = payload.items.map((item: { _id: string }) => {
      const product = dbProducts.find(
        (p) => p._id.toString() === item._id.toString()
      );
      return {
        ...item,
        product: item._id,
        price: product?.price ?? item.price,
        _id: undefined,
      };
    });

    const { itemsPrice, taxPrice, shippingPrice, totalPrice } =
      calcPrices(dbOrderItems);

    const newOrder = new OrderModel({
      items: dbOrderItems,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      shippingAddress: payload.shippingAddress,
      paymentMethod: payload.paymentMethod,
      user: session.user._id,
    });

    const createdOrder = await newOrder.save();

    return new Response(
      JSON.stringify({
        message: "Order created successfully",
        order: createdOrder,
      }),
      { status: 201 }
    );
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
    });
  }
};
