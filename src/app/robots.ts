import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/api/"] }],
    sitemap: "https://tuv-tsa.com/sitemap.xml",
    host: "https://tuv-tsa.com",
  };
}
