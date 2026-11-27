import { ImageResponse } from "next/og";
import { logoSvg } from "@/lib/logo-svg";

export const dynamic = "force-static";
export const alt = "TUV Thuringen SouthAsia. Inspection, certification and testing.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  const logo = `data:image/svg+xml;base64,${Buffer.from(logoSvg("full", "white")).toString("base64")}`;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 80, background: "linear-gradient(135deg,#061A33,#0B2A52)", color: "#fff" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logo} height={240} width={Math.round(240 * (3628 / 1930))} alt="" />
        <div style={{ display: "flex", flexDirection: "column", fontSize: 46, fontWeight: 700, lineHeight: 1.15 }}>
          <span>Inspection, certification and testing.</span>
          <span style={{ color: "#8FB8E8" }}>One TÜV partner, worldwide.</span>
        </div>
        <div style={{ fontSize: 24, color: "rgba(255,255,255,0.65)" }}>tuv-tsa.com · Navi Mumbai, India</div>
      </div>
    ),
    size,
  );
}
