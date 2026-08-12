import type { Metadata } from "next";
import "./globals.css";
import Topbar from "@/components/Topbar/Topbar";

export const metadata: Metadata = {
  title: "Gold Chain & Jewelry Wholesale Catalog",
  description: "B2B Wholesale Catalog for Chains, Jewelry and Pipes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Topbar />
        {children}
      </body>
    </html>
  );
}