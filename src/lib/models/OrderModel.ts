import mongoose from "mongoose";
// import { shippingAddress } from "@/lib/models/OrderModel";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        name: { type: String, required: true },
        slug: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },
    paymentResult: { id: String, status: String, email_address: String },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    texPrice: { type: Number, required: true },
    totalPrie: { type: Number, required: true },
    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: Date },
    delivereAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const OrderModel =
  mongoose.models.Order || mongoose.model("Order", orderSchema);

export default OrderModel;

export type Order = {
  _id: string;
  user?: { name: string };
  items: [OrderItem];
  shippingAddress: {
    fullName: string;
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentResult?: { id: string; status: string; email_address: string };
  itemsPrice: number;
  texPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt: string;
  deliveredAt: string;
  createdAt: string;
};

export type OrderItem = {
  slug: any;
  name: string;
  qty: number;
  image: string;
  price: number;
  color: string;
  size: string;
};

export type shippingAddress = {
  fullName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
};
