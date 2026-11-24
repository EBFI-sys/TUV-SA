import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = localFont({
  src: "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});
const archivo = localFont({
  src: "../../node_modules/@fontsource-variable/archivo/files/archivo-latin-wdth-normal.woff2",
  variable: "--font-archivo",
  display: "swap",
  weight: "100 900",
});
const mono = localFont({
  src: "../../node_modules/@fontsource-variable/jetbrains-mono/files/jetbrains-mono-latin-wght-normal.woff2",
  variable: "--font-jbmono",
  display: "swap",
  weight: "100 800",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://tuv-tsa.com"),
  title: {
    default: "TUV Thuringen SouthAsia | Inspection, Certification and Testing",
    template: "%s | TUV Thuringen SouthAsia",
  },
  description:
    "Inspection, marine survey, certification and testing worldwide. TUV Thuringen SouthAsia is a company of the TÜV Thüringen Group, headquartered in Navi Mumbai, India.",
  openGraph: {
    type: "website",
    siteName: "TUV Thuringen SouthAsia",
    images: ["/brand/logo.svg"],
  },
  icons: { icon: "/brand/shield.svg" },
};

export const viewport: Viewport = {
  themeColor: "#061A33",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
