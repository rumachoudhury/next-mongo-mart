import Header from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/components/Providers";
// import DrawerButton from "@/components/DrawerButton";
// import Sidebar from "@/components/Sidebar";
// import Header from "@/components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next Mongo Mart",
  description: "Modern ECommerce Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="drawer">
            {/* <DrawerButton /> */}
            <div className="drawer-content">
              <div className="min-h-screen flex flex-col">
                <Header />
                {children}
                <footer className="footer footer-center p-4 bg-base-300 text-base-content">
                  <p>
                    Copyright © 2023 - All right reserved by Next Mongo Mart
                  </p>
                </footer>
              </div>
            </div>
            <div className="drawer-side">
              <label
                htmlFor="my-drawer"
                aria-label="close sidebar"
                className="drawer-overlay"
              ></label>
              {/* <Sidebar /> */}
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
