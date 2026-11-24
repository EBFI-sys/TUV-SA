"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { nav, serviceLines } from "@/lib/content";

type Entry = { title: string; group: string; href: string; keywords: string };

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const entries: Entry[] = [
  ...serviceLines.flatMap((s) => [
    { title: s.name, group: "Service lines", href: `/${s.slug}`, keywords: `${s.short} ${s.codes.join(" ")}` },
    ...s.subs.map((sub) => ({
      title: sub.name,
      group: s.name,
      href: `/${s.slug}#${slugify(sub.name)}`,
      keywords: `${sub.summary} ${sub.codes.join(" ")}`,
    })),
  ]),
  ...nav.slice(4).map((n) => ({ title: n.label, group: "Company", href: n.href, keywords: "" })),
  { title: "Accreditations", group: "Company", href: "/accreditations", keywords: "notified body 0090 0867 dakks" },
  { title: "Request a quote", group: "Contact", href: "/contact", keywords: "price fee enquiry book" },
  { title: "Verify a certificate", group: "Contact", href: "/#verify", keywords: "register check validity" },
];

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const show = () => {
      restoreRef.current = document.activeElement as HTMLElement;
      setOpen(true);
    };
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("tsa:palette", show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("tsa:palette", show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    } else restoreRef.current?.focus?.();
  }, [open]);

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!t) return entries.filter((e) => e.group === "Service lines" || e.group === "Contact");
    return entries
      .map((e) => {
        const title = e.title.toLowerCase();
        const score = title.startsWith(t) ? 3 : title.includes(t) ? 2 : `${e.group} ${e.keywords}`.toLowerCase().includes(t) ? 1 : 0;
        return { e, score };
      })
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 9)
      .map((x) => x.e);
  }, [q]);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-ink/60 px-4 pt-[12vh] backdrop-blur-sm" onMouseDown={() => setOpen(false)}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Find a service"
        className="w-full max-w-xl border border-line bg-white shadow-[0_32px_64px_-24px_rgb(6_26_51/0.45)]"
        onMouseDown={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
          if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, results.length - 1)); }
          if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, 0)); }
          if (e.key === "Enter" && results[active]) go(results[active].href);
          if (e.key === "Tab") e.preventDefault();
        }}
      >
        <div className="flex items-center gap-3 border-b border-line px-5">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="text-muted"><circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" /><path d="m11 11 3.5 3.5" stroke="currentColor" strokeWidth="1.5" /></svg>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(0); }}
            placeholder="Draft survey, PED, FAT, ISO 9001…"
            aria-label="Search services"
            aria-controls="palette-results"
            aria-activedescendant={results[active] ? `pal-${active}` : undefined}
            className="h-14 flex-1 bg-transparent text-[1rem] outline-none placeholder:text-faint"
          />
          <kbd className="code !text-[0.625rem] text-muted">ESC</kbd>
        </div>
        <ul id="palette-results" role="listbox" className="max-h-[50vh] overflow-y-auto py-2">
          {results.length === 0 && <li className="px-5 py-6 text-[0.9375rem] text-muted">Nothing matches. Try a code such as PED or ISO 9001, or request a quote and describe the work.</li>}
          {results.map((r, i) => (
            <li
              key={r.href + r.title}
              id={`pal-${i}`}
              role="option"
              aria-selected={i === active}
              onMouseEnter={() => setActive(i)}
              onClick={() => go(r.href)}
              className={`flex cursor-pointer items-center justify-between gap-4 px-5 py-3 ${i === active ? "bg-paper" : ""}`}
            >
              <span>
                <span className="block text-[0.9375rem] font-medium text-text">{r.title}</span>
                <span className="code mt-0.5 block !text-[0.6875rem] text-muted">{r.group}</span>
              </span>
              <span aria-hidden className={i === active ? "text-tuv" : "text-faint"}>↵</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
