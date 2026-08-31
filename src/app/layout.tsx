import type { Metadata } from "next";
import "./globals.css";
import { PricingSettingsProvider } from "@/lib/PricingSettingsContext";

export const metadata: Metadata = {
  title: "Albert C. Wholesale Catalog",
  description: "Wholesale catalog for gold chains, fine jewelry and tobacco pipes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PricingSettingsProvider>{children}</PricingSettingsProvider>
      </body>
    </html>
  );
}
