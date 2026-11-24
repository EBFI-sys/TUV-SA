import { logoSvg, type LogoTone, type LogoVariant } from "@/lib/logo-svg";

// Logo files served as SVG: /brand/logo.svg, /brand/logo-white.svg, /brand/lockup.svg,
// /brand/lockup-white.svg, /brand/mark.svg, /brand/mark-white.svg, /brand/shield.svg
const files: Record<string, [LogoVariant, LogoTone]> = {
  "logo.svg": ["full", "color"],
  "logo-white.svg": ["full", "white"],
  "lockup.svg": ["lockup", "color"],
  "lockup-white.svg": ["lockup", "white"],
  "mark.svg": ["mark", "color"],
  "mark-white.svg": ["mark", "white"],
  "shield.svg": ["shield", "color"],
};

export const dynamic = "force-static";

export function generateStaticParams() {
  return Object.keys(files).map((file) => ({ file }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ file: string }> }) {
  const { file } = await params;
  const v = files[file];
  if (!v) return new Response("Not found", { status: 404 });
  return new Response(logoSvg(v[0], v[1]), {
    headers: { "Content-Type": "image/svg+xml", "Cache-Control": "public, max-age=31536000, immutable" },
  });
}
