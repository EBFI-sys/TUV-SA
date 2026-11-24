"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { photos, serviceLines } from "@/lib/content";

export default function HeroConsole() {
  const [i, setI] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const s = serviceLines[i];

  const onKey = (e: React.KeyboardEvent) => {
    const n = serviceLines.length;
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (i + 1) % n;
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    else return;
    e.preventDefault();
    setI(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="glass border border-line-dark text-white">
      <div className="flex items-center justify-between px-5 pb-3 pt-5">
        <p className="code !text-[0.6875rem] text-sky">SERVICE CONSOLE</p>
        <p className="code !text-[0.6875rem] text-white/60">{String(i + 1).padStart(2, "0")} / {String(serviceLines.length).padStart(2, "0")}</p>
      </div>
      <div role="tablist" aria-label="Service lines" aria-orientation="vertical" onKeyDown={onKey}>
        {serviceLines.map((line, k) => (
          <button
            key={line.slug}
            ref={(el) => { tabs.current[k] = el; }}
            role="tab"
            id={`tab-${line.slug}`}
            aria-selected={k === i}
            aria-controls="console-panel"
            tabIndex={k === i ? 0 : -1}
            onClick={() => setI(k)}
            onMouseEnter={() => setI(k)}
            className={`flex w-full items-center gap-3 border-t border-line-dark px-5 py-3.5 text-left transition-colors ${k === i ? "bg-ink-3" : "hover:bg-ink-2"}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full transition-colors ${k === i ? "bg-signal" : "bg-white/25"}`} />
            <span className={`flex-1 text-[1.0625rem] font-semibold ${k === i ? "text-white" : "text-white/70"}`} style={{ fontFamily: "var(--font-display)" }}>
              {line.slug === "testing" ? "Testing & Technical" : line.name}
            </span>
            <span className={`code hidden !text-[0.625rem] sm:inline ${k === i ? "text-sky" : "text-sky/80"}`}>{line.codes.slice(0, 3).join(" · ")}</span>
          </button>
        ))}
      </div>
      <div id="console-panel" role="tabpanel" aria-labelledby={`tab-${s.slug}`} className="border-t border-line-dark p-5">
        <div className="relative aspect-[16/7] overflow-hidden">
          {serviceLines.map((line, k) => (
            <Image
              key={line.slug}
              src={photos[line.photo].src}
              alt={k === i ? photos[line.photo].alt : ""}
              fill
              sizes="360px"
              className={`object-cover transition-opacity duration-500 ${k === i ? "opacity-100" : "opacity-0"}`}
              priority={k === 0}
            />
          ))}
        </div>
        <p className="mt-4 text-[0.9375rem] leading-snug">{s.short}</p>
        <ul className="mt-3 space-y-1.5 text-[0.8125rem] text-white/70">
          {s.subs.slice(0, 3).map((sub) => (
            <li key={sub.name} className="flex gap-2.5"><span className="mt-[0.55rem] h-px w-2.5 shrink-0 bg-sky" />{sub.name}</li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link href={`/contact?service=${s.slug}`} className="btn btn-light !h-11 justify-center !px-3 !text-[0.875rem]">{s.cta}</Link>
          <Link href={`/${s.slug}`} className="btn btn-ghost-dark !h-11 justify-center !px-3 !text-[0.875rem]">All {s.subs.length} services</Link>
        </div>
      </div>
    </div>
  );
}
