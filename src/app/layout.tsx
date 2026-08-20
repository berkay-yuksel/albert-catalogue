import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Albert Family — Gold Chain & Jewelry Wholesale Catalog",
  description: "Wholesale catalog for gold chains, fine jewelry and tobacco pipes.",
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
