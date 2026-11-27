import { company, serviceLines } from "@/lib/content";

export const dynamic = "force-static";

export function GET() {
  const lines = [
    "# TUV Thuringen SouthAsia",
    "",
    "> Inspection, marine survey, audits, certification and testing worldwide. A company of the TÜV Thüringen Group, based in Navi Mumbai, India.",
    "",
    "## Services",
    ...serviceLines.map((s) => `- [${s.name}](https://tuv-tsa.com/${s.slug}): ${s.short} ${s.lead}`),
    "",
    "## Company",
    "- [About](https://tuv-tsa.com/about): who we are and how we work",
    "- [Industries](https://tuv-tsa.com/industries): sectors we serve",
    "- [Accreditations](https://tuv-tsa.com/accreditations): accreditations of the TÜV Thüringen Group companies that issue certificates",
    "- [Contact](https://tuv-tsa.com/contact): request a quote",
    "",
    `Address: ${company.address}`,
    `Email: ${company.email}`,
    "",
  ];
  return new Response(lines.join("\n"), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
