import { NextRequest, NextResponse } from "next/server";
import { getChainPricingSettings, setChainPricingSettings, isPricingStoreConfigured } from "@/lib/chainPricingStore";

export async function GET() {
  const settings = await getChainPricingSettings();
  return NextResponse.json({ settings, storeConfigured: isPricingStoreConfigured() });
}

export async function POST(request: NextRequest) {
  if (!isPricingStoreConfigured()) {
    return NextResponse.json(
      {
        error:
          "Redis isn't configured yet. Add an Upstash Redis database (via the Vercel Marketplace " +
          "or upstash.com) and set UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN, then redeploy.",
      },
      { status: 503 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const { password, workmanshipMilyem, wholesaleProfitMilyem, goldPricePerGram } = (body ?? {}) as Record<
    string,
    unknown
  >;

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD isn't set on the server, so no one can save changes yet. Add it in your environment variables." },
      { status: 503 }
    );
  }
  if (password !== adminPassword) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }

  const w = Number(workmanshipMilyem);
  const p = Number(wholesaleProfitMilyem);
  const g = Number(goldPricePerGram);
  if (!Number.isFinite(w) || !Number.isFinite(p) || !Number.isFinite(g)) {
    return NextResponse.json({ error: "workmanshipMilyem, wholesaleProfitMilyem, and goldPricePerGram must all be numbers." }, { status: 400 });
  }

  const saved = await setChainPricingSettings({
    workmanshipMilyem: w,
    wholesaleProfitMilyem: p,
    goldPricePerGram: g,
  });
  return NextResponse.json({ settings: saved });
}
