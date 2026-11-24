import { NextResponse } from "next/server";
import { sanity } from "@/lib/sanity";

// Public certificate register lookup. Certificates are published from Sanity
// (document type "certificate"); only published, explicitly public documents are returned.
export async function GET(req: Request) {
  const n = new URL(req.url).searchParams.get("n")?.trim() ?? "";
  if (n.length < 4 || n.length > 64 || !/^[A-Za-z0-9./\-_ ]+$/.test(n)) {
    return NextResponse.json({ error: "Invalid certificate number" }, { status: 400 });
  }
  try {
    const certificate = await sanity.fetch(
      `*[_type == "certificate" && public == true && lower(number) == lower($n)][0]{
        number, holder, standard, status, "validUntil": validUntil, issuer
      }`,
      { n }
    );
    return NextResponse.json({ certificate: certificate ?? null }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Register unavailable" }, { status: 502 });
  }
}
