import React from "react";

// const CheckoutSteps = (current = 0) => ❌ Problem current as a positional argument, not a prop use {}
const CheckoutSteps = ({ current = 0 }) => {
  return (
    <div>
      <ul className="steps steps-vertical lg:steps-horizontal w-full mt-4">
        {[
          "User Login",
          "Shipping Address",
          "Payment Method",
          "Place Order",
        ].map((step, index) => (
          <li
            key={index}
            className={`step ${index <= current ? "step-primary" : ""}`}
          >
            {step}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CheckoutSteps;
