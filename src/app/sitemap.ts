import type { MetadataRoute } from "next";
import { serviceLines } from "@/lib/content";

const base = "https://tuv-tsa.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: [string, number][] = [
    ["", 1],
    ...serviceLines.map((s): [string, number] => [`/${s.slug}`, 0.9]),
    ["/industries", 0.8],
    ["/accreditations", 0.7],
    ["/about", 0.6],
    ["/contact", 0.8],
    ["/insights", 0.6],
  ];
  return pages.map(([path, priority]) => ({ url: `${base}${path}`, lastModified: now, changeFrequency: "monthly", priority }));
}
