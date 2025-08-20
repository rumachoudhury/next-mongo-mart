// "use client";

import { SessionProvider } from "next-auth/react";
import ClientProvider from "./ClientProvider";
import { auth } from "@/lib/auth";

export default async function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // Assuming auth() is a function that retrieves the session
  return (
    <SessionProvider>
      <ClientProvider>{children}</ClientProvider>
      //{" "}
    </SessionProvider>
  );
}
