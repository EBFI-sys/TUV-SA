"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/ui/border-beam";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { photos, serviceLines } from "@/lib/content";

// 21st.dev · shadcn/ui Tabs (vertical, Radix roving focus) + Magic UI Border Beam
export default function HeroConsole() {
  const [value, setValue] = useState(serviceLines[0].slug);
  const i = serviceLines.findIndex((s) => s.slug === value);

  return (
    <div className="glass relative overflow-hidden border border-line-dark text-white">
      <BorderBeam size={120} duration={9} colorFrom="#8fbfff" colorTo="#c90618" borderWidth={1} />
      <div className="flex items-center justify-between px-5 pb-3 pt-5">
        <p className="code !text-[0.6875rem] text-sky">SERVICE CONSOLE</p>
        <p className="code !text-[0.6875rem] text-white/60">
          {String(i + 1).padStart(2, "0")} / {String(serviceLines.length).padStart(2, "0")}
        </p>
      </div>

      <Tabs value={value} onValueChange={setValue} orientation="vertical" className="flex-col gap-0">
        <TabsList aria-label="Service lines" variant="line" className="h-auto w-full items-stretch gap-0 rounded-none p-0 text-white">
          {serviceLines.map((line) => (
            <TabsTrigger
              key={line.slug}
              value={line.slug}
              onMouseEnter={() => setValue(line.slug)}
              className="group/t h-auto w-full justify-start gap-3 rounded-none border-0 border-t border-line-dark px-5 py-3.5 text-left text-white/70 shadow-none after:hidden hover:bg-ink-2 hover:text-white data-[state=active]:bg-ink-3 data-[state=active]:text-white data-[state=active]:shadow-none"
            >
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/25 transition-colors group-data-[state=active]/t:bg-signal" />
              <span className="flex-1 text-[1.0625rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                {line.tab ?? line.name}
              </span>
              <span className="code hidden !text-[0.625rem] text-sky/80 sm:inline group-data-[state=active]/t:text-sky">
                {line.codes.slice(0, 3).join(" · ")}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {serviceLines.map((s, k) => (
          <TabsContent key={s.slug} value={s.slug} className="border-t border-line-dark p-5 animate-in fade-in-0 duration-500">
            <div className="relative aspect-[16/7] overflow-hidden">
              <Image src={photos[s.photo].src} alt={photos[s.photo].alt} fill sizes="360px" className="object-cover" priority={k === 0} />
              <div className="absolute bottom-2 left-2 flex gap-1">
                {s.codes.slice(0, 2).map((c) => (
                  <Badge key={c} variant="outline" className="code rounded-[2px] border-white/40 bg-ink/60 !text-[0.625rem] text-white backdrop-blur-sm">{c}</Badge>
                ))}
              </div>
            </div>
            <p className="mt-4 text-[0.9375rem] leading-snug">{s.short}</p>
            <ul className="mt-3 space-y-1.5 text-[0.8125rem] text-white/70">
              {s.subs.slice(0, 3).map((sub) => (
                <li key={sub.name} className="flex gap-2.5"><span className="mt-[0.55rem] h-px w-2.5 shrink-0 bg-sky" />{sub.name}</li>
              ))}
            </ul>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Button asChild variant="light" className="h-11 min-w-0 px-3 text-[0.875rem] font-semibold">
                <Link href={`/contact?service=${s.slug}`}>{s.cta}</Link>
              </Button>
              <Button asChild variant="ghost-dark" className="h-11 min-w-0 px-3 text-[0.875rem] font-semibold">
                <Link href={`/${s.slug}`}>All {s.subs.length} services <ArrowRight /></Link>
              </Button>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
