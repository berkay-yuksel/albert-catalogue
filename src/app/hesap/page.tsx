import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fiyat Paneli | Albert C. Wholesale",
  description: "İç kullanım: altın zincir fiyat hesaplama paneli.",
  robots: { index: false, follow: false }, // internal tool, keep out of search engines
};

export default function HesapPage() {
  return (
    <iframe
      src="/hesap-panel.html"
      title="Altın Zincir Fiyat Paneli"
      style={{
        display: "block",
        width: "100%",
        height: "100vh",
        border: "none",
      }}
    />
  );
}
