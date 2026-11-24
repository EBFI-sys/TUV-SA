import { NextResponse } from "next/server";
import { createClient } from "@sanity/client";
import { serviceLines } from "@/lib/content";

// Stores quote requests as "quoteRequest" documents in Sanity (private: drafts are not public).
const writer = createClient({
  projectId: "lfctwwh9",
  dataset: "production",
  apiVersion: "2025-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

const str = (v: unknown, max = 2000) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  if (str(body.website)) return NextResponse.json({ reference: "TSA-OK" }); // honeypot
  const service = str(body.service, 40);
  const email = str(body.email, 200);
  if (!serviceLines.some((s) => s.slug === service) || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) || !str(body.name, 200) || body.consent !== "yes") {
    return NextResponse.json({ error: "Missing or invalid fields" }, { status: 422 });
  }
  if (!process.env.SANITY_WRITE_TOKEN) return NextResponse.json({ error: "Not configured" }, { status: 503 });

  const now = new Date();
  const reference = `TSA-${now.toISOString().slice(2, 10).replace(/-/g, "")}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  try {
    await writer.create({
      // the "drafts." prefix keeps the document out of the public dataset API
      _id: `drafts.quote-${reference}`,
      _type: "quoteRequest",
      reference,
      receivedAt: now.toISOString(),
      service,
      name: str(body.name, 200),
      company: str(body.company, 200),
      email,
      phone: str(body.phone, 60),
      scope: str(body.scope, 500),
      vessel: str(body.vessel, 200),
      location: str(body.location, 300),
      date: str(body.date, 100),
      sites: str(body.sites, 200),
      market: str(body.market, 200),
      details: str(body.details, 5000),
      consent: true,
      status: "new",
    });
    return NextResponse.json({ reference });
  } catch {
    return NextResponse.json({ error: "Could not store the request" }, { status: 502 });
  }
}
