// "use client";

// import { SessionProvider } from "next-auth/react";
// import { auth } from "@/lib/auth";

// export default async function Providers({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const session = await auth();
//   return <SessionProvider session={session}>{children}</SessionProvider>;
// }

"use client";

import { SessionProvider } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
