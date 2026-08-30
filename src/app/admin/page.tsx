"use client";

import { useState } from "react";
import Link from "next/link";
import {
  KARAT_ORDER,
  KARAT_MILYEM,
  computeChainPricesByKarat,
  type ChainPricingSettings,
} from "@/lib/pricingFormula";
import { usePricingSettings } from "@/lib/PricingSettingsContext";
import { fmtPrice, PRODUCTS } from "@/data/products";

const SAMPLE_CHAIN = PRODUCTS.find((p) => p.category === "Chain");

export default function AdminPage() {
  const { settings, saveSettings, ready, storeConfigured } = usePricingSettings();
  const [draft, setDraft] = useState<ChainPricingSettings>(settings);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<{ kind: "idle" | "saving" | "saved" | "error"; message?: string }>({
    kind: "idle",
  });
  const [syncedOnce, setSyncedOnce] = useState(false);

  // Keep the draft in sync once the real shared settings load in from the
  // server (avoids briefly editing against the hardcoded defaults).
  if (ready && !syncedOnce) {
    setSyncedOnce(true);
    setDraft(settings);
  }

  function updateField(field: keyof ChainPricingSettings, value: string) {
    const num = parseFloat(value);
    setDraft((prev) => ({ ...prev, [field]: Number.isFinite(num) ? num : 0 }));
  }

  async function handleSave() {
    setStatus({ kind: "saving" });
    const result = await saveSettings(draft, password);
    if (result.ok) {
      setStatus({ kind: "saved" });
      setTimeout(() => setStatus({ kind: "idle" }), 1800);
    } else {
      setStatus({ kind: "error", message: result.error });
    }
  }

  const previewPrices = SAMPLE_CHAIN ? computeChainPricesByKarat(SAMPLE_CHAIN.weight, draft) : null;

  return (
    <main className="static-page">
      <Link href="/" className="back-link">
        ← Back to Catalog
      </Link>
      <h1>Gold Chain Pricing</h1>
      <p className="static-lede">
        These settings drive the live price shown across every Gold Chain in the catalog and in
        the order cart, using: <b>Weight × (Workmanship Milyem + Wholesale Profit Milyem + Karat
        Milyem) ÷ 1000 × Gold Price per Gram</b>. Saving here updates the price for{" "}
        <b>every visitor</b>, not just this browser.
      </p>

      {!storeConfigured && (
        <div className="admin-notice">
          <b>Setup needed:</b> no Redis database is connected yet, so saves will fail. Add an
          Upstash Redis database (via the Vercel Marketplace or upstash.com) and set{" "}
          <code>UPSTASH_REDIS_REST_URL</code> / <code>UPSTASH_REDIS_REST_TOKEN</code> in your
          environment variables, then redeploy.
        </div>
      )}

      <div className="static-section">
        <h2>Business Inputs (editable)</h2>
        <div className="admin-form">
          <label className="admin-field">
            <span>Workmanship Milyem (İşçilik Milyem)</span>
            <input
              type="number"
              step="1"
              value={draft.workmanshipMilyem}
              onChange={(e) => updateField("workmanshipMilyem", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Wholesale Profit Milyem (Toptan Satış Karı Milyem)</span>
            <input
              type="number"
              step="1"
              value={draft.wholesaleProfitMilyem}
              onChange={(e) => updateField("wholesaleProfitMilyem", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Gold Price per Gram, USD (Gram Altın Fiyatı)</span>
            <input
              type="number"
              step="0.01"
              value={draft.goldPricePerGram}
              onChange={(e) => updateField("goldPricePerGram", e.target.value)}
            />
          </label>
          <label className="admin-field">
            <span>Admin Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Required to save"
            />
          </label>
        </div>
        {status.kind === "error" && <p className="admin-error">{status.message}</p>}
        <div className="admin-actions">
          <button className="btn-primary" onClick={handleSave} disabled={status.kind === "saving"}>
            {status.kind === "saving" ? "Saving…" : status.kind === "saved" ? "Saved ✓" : "Save for Everyone"}
          </button>
        </div>
      </div>

      <div className="static-section">
        <h2>Karat Milyem (fixed reference, not editable)</h2>
        <p>
          This is a standard fineness table, not a business decision, so it comes from our own
          data rather than being editable here.
        </p>
        <div className="admin-karat-table">
          {KARAT_ORDER.map((k) => (
            <div className="admin-karat-row" key={k}>
              <span>{k}</span>
              <span className="mono">{KARAT_MILYEM[k]}</span>
            </div>
          ))}
        </div>
      </div>

      {previewPrices && SAMPLE_CHAIN && (
        <div className="static-section">
          <h2>Live Preview</h2>
          <p>
            Resulting prices for <b>{SAMPLE_CHAIN.name}</b> ({SAMPLE_CHAIN.weight}g) at the values
            above, before saving:
          </p>
          <div className="admin-karat-table">
            {KARAT_ORDER.map((k) => (
              <div className="admin-karat-row" key={k}>
                <span>{k}</span>
                <span className="mono">{fmtPrice(previewPrices[k])}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
