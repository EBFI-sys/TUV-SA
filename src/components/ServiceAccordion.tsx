"use client";

import { useEffect, useState } from "react";
import type { SubService } from "@/lib/content";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function ServiceAccordion({ subs }: { subs: SubService[] }) {
  const [open, setOpen] = useState<number>(0);

  useEffect(() => {
    const fromHash = () => {
      const k = subs.findIndex((s) => slug(s.name) === decodeURIComponent(location.hash.slice(1)));
      if (k >= 0) setOpen(k);
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [subs]);

  return (
    <div className="mt-8 border-b border-line">
      {subs.map((s, k) => {
        const on = open === k;
        const id = slug(s.name);
        return (
          <div key={s.name} id={id} className="scroll-mt-28 border-t border-line">
            <h3>
              <button
                type="button"
                aria-expanded={on}
                aria-controls={`${id}-panel`}
                onClick={() => setOpen(on ? -1 : k)}
                className="flex w-full items-center justify-between gap-6 py-5 text-left"
              >
                <span className="text-[1.125rem] font-semibold md:text-[1.25rem]" style={{ fontFamily: "var(--font-display)" }}>{s.name}</span>
                <span aria-hidden className={`relative h-3.5 w-3.5 shrink-0 text-tuv transition-transform duration-300 ${on ? "rotate-45" : ""}`}>
                  <span className="absolute left-0 top-1/2 h-[1.5px] w-full -translate-y-1/2 bg-current" />
                  <span className="absolute left-1/2 top-0 h-full w-[1.5px] -translate-x-1/2 bg-current" />
                </span>
              </button>
            </h3>
            <div id={`${id}-panel`} role="region" aria-label={s.name} className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
              <div className="overflow-hidden">
                <div className="pb-8">
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
                        {s.codes.map((c) => <li key={c} className="code border border-line px-2 py-1 !text-[0.6875rem] text-tuv">{c}</li>)}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
