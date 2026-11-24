"use client";

import { useEffect, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import type { SubService } from "@/lib/content";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// 21st.dev · shadcn/ui Accordion, deep-linkable by #hash
export default function ServiceAccordion({ subs }: { subs: SubService[] }) {
  const [open, setOpen] = useState<string>(slug(subs[0].name));

  useEffect(() => {
    const fromHash = () => {
      const h = decodeURIComponent(location.hash.slice(1));
      if (subs.some((s) => slug(s.name) === h)) setOpen(h);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [subs]);

  return (
    <Accordion type="single" collapsible value={open} onValueChange={setOpen} className="mt-8 border-b border-line">
      {subs.map((s) => {
        const id = slug(s.name);
        return (
          <AccordionItem key={s.name} value={id} id={id} className="scroll-mt-28 border-line border-t last:border-b-0">
            <AccordionTrigger className="items-center gap-6 rounded-none py-5 hover:no-underline [&>svg]:size-5 [&>svg]:text-tuv">
              <span className="text-[1.125rem] font-semibold md:text-[1.25rem]" style={{ fontFamily: "var(--font-display)" }}>{s.name}</span>
            </AccordionTrigger>
            <AccordionContent className="pb-8">
              <p className="text-[1rem] leading-relaxed text-muted">{s.summary}</p>
              <div className="mt-6 grid gap-6 sm:grid-cols-[1.4fr_1fr]">
                <div>
                  <p className="code !text-[0.6875rem] text-muted">WHAT WE CHECK</p>
                  <ul className="mt-3 space-y-2 text-[0.9375rem]">
                    {s.checks.map((c) => <li key={c} className="flex gap-3"><span className="mt-[0.7rem] h-px w-3 shrink-0 bg-tuv" />{c}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="code !text-[0.6875rem] text-muted">TYPICAL REFERENCES</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.codes.map((c) => (
                      <li key={c}><Badge variant="outline" className="code rounded-[2px] border-line !text-[0.6875rem] text-tuv">{c}</Badge></li>
                    ))}
                  </ul>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        );
      })}
    </Accordion>
  );
}
