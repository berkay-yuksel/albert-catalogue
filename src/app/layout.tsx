import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gold Chain & Jewelry Wholesale Catalog",
  description: "Wholesale catalog for gold chains, bracelets, rings, necklaces and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
