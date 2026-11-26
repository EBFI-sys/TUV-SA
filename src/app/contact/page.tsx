import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/PageHero";
import QuoteForm from "@/components/QuoteForm";
import { company, workflow } from "@/lib/content";

export const metadata: Metadata = {
  title: "Request a quote",
  description: "Request a quote for inspection, marine survey, certification or testing anywhere in the world.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero crumb="Request a quote" title="Request a quote." lead="Tell us what, where and when. We reply with the specialist, the attendance date and the fee." />
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <Suspense fallback={<div className="h-96" />}>
              <QuoteForm />
            </Suspense>
          </div>
          <aside className="lg:col-span-4">
            <div className="border border-line bg-paper p-6 lg:sticky lg:top-28">
              <p className="code !text-[0.6875rem] text-muted">WHAT HAPPENS NEXT</p>
              <ol className="mt-5 space-y-5">
                {workflow.map((w, i) => (
                  <li key={w.title} className="flex gap-4">
                    <span className="code flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-tuv !text-[0.6875rem] text-tuv">{i + 1}</span>
                    <span>
                      <span className="block font-semibold" style={{ fontFamily: "var(--font-display)" }}>{w.title}</span>
                      <span className="mt-0.5 block text-[0.875rem] text-muted">{w.text}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <div className="mt-8 border-t border-line pt-6 text-[0.875rem] text-muted">
                <p className="code !text-[0.6875rem]">OFFICE</p>
                <address className="mt-2 not-italic leading-relaxed text-text">
                  {company.legalName}<br />{company.address}
                  <br />
                  <a href={`mailto:${company.email}`} className="mt-2 inline-block font-semibold text-tuv hover:underline">{company.email}</a>
                </address>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
