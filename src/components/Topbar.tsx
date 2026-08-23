"use client";

import Link from "next/link";

export function Topbar() {
  return (
    <div className="topbar">
      <div className="brand">
        <div className="brand-mark" />
        <div>
          <h1>Albert Family</h1>
          <span>B2B Wholesale Catalog · Chains · Jewelry · Pipes</span>
        </div>
      </div>
      <nav className="topbar-pages">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
}
