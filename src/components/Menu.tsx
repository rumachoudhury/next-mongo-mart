"use client";

import { signOut, useSession } from "next-auth/react";
import useCartService from "../lib/hooks/useCartStore";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function Menu() {
  const { items, init } = useCartService(); // Get the items from the cart service

  //
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    //
    setMounted(true);
  }, []);

  const signOutHandler = () => {
    signOut({ callbackUrl: "/signin" });
    init(); // Reinitialize the cart service after sign out
  };
  const { data: session } = useSession();
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
          <button
            className="btn btn-ghost rounded-btn"
            type="button"
            onClick={signOutHandler}
          >
            Sign out
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
