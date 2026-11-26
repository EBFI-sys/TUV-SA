import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CommandPalette from "@/components/CommandPalette";
import { company } from "@/lib/content";

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TUV Thuringen SouthAsia",
  legalName: company.legalName,
  url: "https://tuv-tsa.com",
  email: company.email,
  logo: "https://tuv-tsa.com/brand/logo.svg",
  address: { "@type": "PostalAddress", streetAddress: "Office 604, One Platinum, Plot 8, Sector 15", addressLocality: "Navi Mumbai", postalCode: "400614", addressRegion: "Maharashtra", addressCountry: "IN" },
  contactPoint: { "@type": "ContactPoint", contactType: "sales", email: company.email, availableLanguage: ["English"] },
};

const plex = localFont({
  src: "../../node_modules/@fontsource-variable/ibm-plex-sans/files/ibm-plex-sans-latin-wght-normal.woff2",
  variable: "--font-plex",
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
    <html lang="en" className={`${plex.variable} ${archivo.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CommandPalette />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </body>
    </html>
  );
}
