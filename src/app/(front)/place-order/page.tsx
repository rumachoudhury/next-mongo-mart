import { Metadata } from "next";
import Form from "./Form";

export const metadata: Metadata = {
  title: "Place Order",
};

export default function PlaceOrderPage() {
  return <Form />;
}
