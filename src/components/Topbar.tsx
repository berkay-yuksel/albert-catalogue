"use client";

import Link from "next/link";

export function Topbar() {
  return (
    <div className="topbar">
      <Link href="/" className="brand">
        <div>
          <h1>Albert C. Wholesale</h1>
          <span>Chains · Jewelry · Pipes</span>
        </div>
      </Link>
      <nav className="topbar-pages">
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
      </nav>
    </div>
  );
}
