import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { industries, serviceBySlug } from "@/lib/content";

export const metadata: Metadata = { title: "Industries", description: "Inspection, marine survey, certification and testing for heavy industry and trade." };

export default function IndustriesPage() {
  return (
    <>
      <PageHero crumb="Industries" title="Built for heavy industry and trade." lead="The same inspectors, surveyors and auditors work across these sectors, to the codes each one uses." />
      <section className="py-16 md:py-24">
        <div className="container-x">
          <ul className="grid gap-4 md:grid-cols-2">
            {industries.map((i, k) => (
              <li key={i.name}>
                <Card className="h-full gap-0 rounded-md border-line py-0 shadow-none transition-colors hover:border-tuv">
                  <CardHeader className="gap-0 p-8 pb-0">
                    <span className="code !text-[0.6875rem] text-muted">{String(k + 1).padStart(2, "0")}</span>
                    <CardTitle className="display mt-4 text-[1.75rem] font-[620]"><h2>{i.name}</h2></CardTitle>
                    <CardDescription className="mt-3 max-w-lg text-[1rem] leading-relaxed text-muted">{i.text}</CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto flex flex-wrap gap-2 p-8 pt-6">
                    {i.services.map((s) => (
                      <Badge key={s} asChild variant="outline" className="code rounded-[2px] border-line px-2.5 py-1.5 !text-[0.6875rem] text-tuv hover:border-tuv">
                        <Link href={`/${s}`}>{serviceBySlug(s)?.name}</Link>
                      </Badge>
                    ))}
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
