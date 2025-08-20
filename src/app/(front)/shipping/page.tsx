import React from "react";
import Form from "./Form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shipping Address",
};

async function ShippingPage() {
  return <Form />;
}

export default ShippingPage;
