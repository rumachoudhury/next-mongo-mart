"use client";
import { cartStore } from "@/lib/hooks/useCartStore";
import { useEffect, useState } from "react";
// import { SessionProvider } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [selectedTheme, setSelectedTheme] = useState("light");
  const updateStore = () => {
    cartStore.persist.rehydrate();
  };

  useEffect(() => {
    document.addEventListener("visibilitychange", updateStore);
    window.addEventListener("focus", updateStore);
  }, []);

  return (
    <SWRConfig
      value={{
        onError: (error, key) => {
          toast.error(error.message);
        },
        fetcher: async (resource, init) => {
          const res = await fetch(resource, init);
          if (!res.ok) {
            throw new Error("An error occurred while fetching the data.");
          }
          return res.json();
        },
      }}
    >
      <div data-theme={selectedTheme}>
        <Toaster toastOptions={{ className: "toaster-con" }} />
        {children}
      </div>
    </SWRConfig>
  );
}
