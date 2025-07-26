"use client";

import useCartService from "../lib/hooks/useCartStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Menu() {
  const { items } = useCartService(); // Get the items from the cart service

  //
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    //
    setMounted(true);
  }, []);
  return (
    <div>
      <ul className="flex items-stretch">
        <li>
          <Link className="btn btn-ghost rounded-btn" href="/cart">
            Cart
            {mounted && items.length != 0 && (
              <div className="badge badge-secondary">
                {items.reduce((a, c) => a + c.qty, 0)}{" "}
              </div>
            )}
          </Link>
        </li>

        <li>
          <button className="btn btn-ghost rounded-btn" type="button">
            Signin
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
