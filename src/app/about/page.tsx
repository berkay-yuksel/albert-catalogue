import type { Metadata } from "next";
import Link from "next/link";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "About | Albert C Jewelry",
  description: "About Albert C Jewelry, a B2B wholesale supplier of gold chains, fine jewelry, and tobacco pipes.",
};

export default function AboutPage() {
  return (
    <>
      <div className="sticky-header">
        <Topbar />
      </div>
      <main className="static-page">
        <Link href="/" className="back-link">
          ← Back to Catalog
        </Link>
        <h1>About Albert C Jewelry</h1>
        <p className="static-lede">
          Albert C Jewelry is a B2B wholesale supplier of gold chains, fine jewelry, and tobacco
          pipes, built around a simple idea: give retailers and distributors a straightforward
          way to browse a real, working catalog and place orders without friction.
        </p>

        <div className="static-section">
          <h2>What We Offer</h2>
          <p>
            Our catalog spans hundreds of gold chain styles, from classic curb and figaro links
            to hollow and handcrafted designs, alongside a growing Fine Jewelry collection
            covering bracelets, rings, necklaces, earrings, and specialty pieces available as
            special orders. We also carry a curated selection of tobacco pipes for retailers
            looking to diversify their offering.
          </p>
        </div>

        <div className="static-section">
          <h2>How Wholesale Ordering Works</h2>
          <p>
            Browse the catalog, add the items you need to your order list, and send the request
            directly to our team; no account or checkout process required. For Fine Jewelry
            items, pricing is quoted per order based on current gold rates, craftsmanship, and
            quantity; our team will follow up directly once your request comes in.
          </p>
        </div>

        <div className="static-section">
          <h2>Quality &amp; Craftsmanship</h2>
          <p>
            Every piece in our catalog is organized with real product codes, weights, and
            thickness specifications so you know exactly what you&apos;re ordering. Our
            craftsmanship tiers give you a quick read on the complexity and detail behind each
            design, from everyday essentials to intricate, made-to-order pieces.
          </p>
        </div>

        <div className="static-cta">
          <p>Ready to place an order or have a question about our catalog?</p>
          <Link href="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>
      </main>
    </>
  );
}
