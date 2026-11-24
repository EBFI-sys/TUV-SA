import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = { title: "Insights", description: "Technical notes on inspection, marine survey, certification and EU market access." };

const planned = [
  ["PED", "Exporting pressure equipment to the EU: modules, notified bodies and what an Indian manufacturer needs on file."],
  ["CBAM", "Embedded-emissions data for EU CBAM reporting and how verification fits in."],
  ["DRAFT", "How a draft survey works, and why dock-water density matters."],
];

export default function InsightsPage() {
  return (
    <>
      <PageHero crumb="Insights" title="Insights." lead="Technical notes written by our inspectors, surveyors and auditors. The first articles are being prepared." />
      <section className="py-16 md:py-24">
        <div className="container-x">
          <p className="code !text-[0.6875rem] text-muted">IN PREPARATION</p>
          <ul className="mt-6 grid gap-px border border-line bg-line md:grid-cols-3">
            {planned.map(([code, text]) => (
              <li key={code} className="bg-white p-6">
                <span className="code border border-line px-2 py-1 !text-[0.6875rem] text-tuv">{code}</span>
                <p className="mt-5 text-[1rem] leading-relaxed">{text}</p>
              </li>
            ))}
          </ul>
          <Button asChild variant="outline" size="xl" className="mt-10"><Link href="/contact">Ask a technical question <ArrowRight /></Link></Button>
        </div>
      </section>
    </>
  );
}
