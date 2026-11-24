import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({ src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2", variable: "--font-inter", display: "swap", weight: "100 900" });
const display = localFont({ src: "../../node_modules/@fontsource-variable/inter-tight/files/inter-tight-latin-wght-normal.woff2", variable: "--font-inter-tight", display: "swap", weight: "100 900" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuv-tsa.com"),
  title: {
    default: "TUV Thuringen SouthAsia | Inspection, Certification and Testing",
    template: "%s | TUV Thuringen SouthAsia",
  },
  description:
    "Inspection, certification and testing. One TÜV partner, worldwide. TUV Thuringen SouthAsia is part of the TÜV Thüringen Group.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable}`}>
      <body>{children}</body>
    </html>
  );
}
