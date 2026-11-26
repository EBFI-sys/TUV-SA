"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import type { COBEOptions } from "cobe";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Globe } from "@/components/ui/globe";
import { Input } from "@/components/ui/input";
import { locations, offices } from "@/lib/content";

const coord = (lat: number, lon: number) =>
  `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}  ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`;

// 21st.dev · Magic UI Globe (cobe), tuned to the TÜV night palette
const GLOBE: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 1,
  diffuse: 1.1,
  mapSamples: 18000,
  mapBrightness: 6,
  baseColor: [0.16, 0.34, 0.58],
  markerColor: [0.56, 0.75, 1],
  glowColor: [0.04, 0.16, 0.32],
  markers: offices.map((o) => ({ location: [o.lat, o.lon] as [number, number], size: o.hq ? 0.09 : 0.045 })),
};

export default function Coverage() {
  const [sel, setSel] = useState(locations[0].name);
  const [where, setWhere] = useState("");
  const router = useRouter();
  const loc = locations.find((l) => l.name === sel) ?? locations[0];
  const focus = useMemo<[number, number]>(() => [loc.lat, loc.lon], [loc]);

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="relative -mx-6 aspect-square lg:col-span-6 lg:-ml-16 lg:mr-0">
        <Globe config={GLOBE} focus={focus} className="max-w-none" />
        <p className="code absolute bottom-2 left-6 !text-[0.625rem] text-sky/90 lg:left-16">DRAG TO ROTATE · SELECT A REGION</p>
      </div>

      <div className="lg:col-span-6">
        <p className="eyebrow text-sky">Coverage</p>
        <h2 className="display mt-5 text-[2.25rem] md:text-[3.25rem]">Wherever the plant, the port or the vessel is.</h2>

        {/* 21st.dev · shadcn/ui Accordion */}
        <Accordion type="single" value={sel} onValueChange={(v) => v && setSel(v)} className="mt-10 border-b border-line-dark">
          {locations.map((l) => (
            <AccordionItem key={l.name} value={l.name} className="border-line-dark border-t last:border-b-0">
              <AccordionTrigger className="items-center gap-4 rounded-none py-4 text-white hover:no-underline [&>svg]:text-sky">
                <span className={`h-2 w-2 shrink-0 rounded-full ${l.kind === "hq" ? "bg-signal" : "bg-sky"}`} />
                <span className="flex-1 text-[1.125rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>
                  {l.region}
                  <span className="ml-2 text-[0.875rem] font-normal text-white/60" style={{ fontFamily: "var(--font-sans)" }}>{l.name}</span>
                </span>
                <span className="code hidden !text-[0.6875rem] font-normal text-sky/80 sm:inline">{coord(l.lat, l.lon)}</span>
              </AccordionTrigger>
              <AccordionContent className="pl-6 text-[0.9375rem] leading-relaxed text-white/70">{l.note}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <form
          className="mt-8 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/contact?service=marine-survey&location=${encodeURIComponent(where)}`);
          }}
        >
          <label htmlFor="cov-where" className="sr-only">Port, city or plant location</label>
          <Input
            id="cov-where"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            placeholder="Port, city or plant location"
            className="h-12 flex-1 border-white/30 bg-ink/40 text-white placeholder:text-white/70 focus-visible:border-white focus-visible:ring-white/15"
          />
          <Button type="submit" variant="light" size="xl">Request a surveyor</Button>
        </form>
      </div>
    </div>
  );
}
