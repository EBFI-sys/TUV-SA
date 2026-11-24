import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { industries, serviceBySlug } from "@/lib/content";

export const metadata: Metadata = { title: "Industries", description: "Inspection, marine survey, certification and testing for heavy industry and trade." };

export default function IndustriesPage() {
  return (
    <>
      <PageHero crumb="Industries" title="Built for heavy industry and trade." lead="The same inspectors, surveyors and auditors work across these sectors, to the codes each one uses." />
      <section className="py-16 md:py-24">
        <div className="container-x">
          <ul className="grid gap-px border border-line bg-line md:grid-cols-2">
            {industries.map((i, k) => (
              <li key={i.name} className="flex flex-col bg-white p-8">
                <span className="code !text-[0.6875rem] text-muted">{String(k + 1).padStart(2, "0")}</span>
                <h2 className="display mt-4 text-[1.75rem]">{i.name}</h2>
                <p className="mt-3 max-w-lg text-[1rem] leading-relaxed text-muted">{i.text}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {i.services.map((s) => (
                    <Link key={s} href={`/${s}`} className="code border border-line px-2.5 py-1.5 !text-[0.6875rem] text-tuv hover:border-tuv">
                      {serviceBySlug(s)?.name}
                    </Link>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
