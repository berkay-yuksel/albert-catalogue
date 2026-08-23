import type { Metadata } from "next";
import Link from "next/link";
import { Topbar } from "@/components/Topbar";

export const metadata: Metadata = {
  title: "Contact | Albert C Jewelry",
  description: "Get in touch with Albert C Jewelry for wholesale gold chain, fine jewelry, and tobacco pipe orders.",
};

export default function ContactPage() {
  return (
    <>
      <div className="sticky-header">
        <Topbar />
      </div>
      <main className="static-page">
        <Link href="/" className="back-link">
          ← Back to Catalog
        </Link>
        <h1>Contact Us</h1>
        <p className="static-lede">
          Have a question about an order, a product, or wholesale pricing? Reach out, our team
          typically responds within one business day.
        </p>

        <div className="contact-grid">
          <div className="contact-card">
            <span className="contact-label">Email</span>
            <a href="mailto:info@albertexport.com" className="contact-value">
              info@albertexport.com
            </a>
          </div>
          <div className="contact-card">
            <span className="contact-label">Phone</span>
            <span className="contact-value">+1 (555) 010-2024</span>
          </div>
          <div className="contact-card">
            <span className="contact-label">Business Hours</span>
            <span className="contact-value">Mon–Fri, 9:00 AM – 6:00 PM</span>
          </div>
          <div className="contact-card">
            <span className="contact-label">Location</span>
            <span className="contact-value">Wholesale Jewelry District</span>
          </div>
        </div>

        <div className="static-section">
          <h2>Placing an Order</h2>
          <p>
            The fastest way to order is directly through the catalog: add items to your order
            list, then use <b>Send Order Request</b> or <b>Copy Order</b> from the order panel.
            For Fine Jewelry (Special Order) items, our team will follow up with pricing and
            lead time once we receive your request.
          </p>
        </div>

        <div className="static-cta">
          <p>Prefer to browse first?</p>
          <Link href="/" className="btn-primary">
            Back to Catalog
          </Link>
        </div>
      </main>
    </>
  );
}
