"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import GlobeClient from "@/components/GlobeClient";
import { locations } from "@/lib/content";

const coord = (lat: number, lon: number) =>
  `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}  ${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`;

export default function Coverage() {
  const [sel, setSel] = useState(0);
  const [where, setWhere] = useState("");
  const router = useRouter();

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12">
      <div className="relative -mx-6 aspect-square lg:col-span-6 lg:-ml-16 lg:mr-0">
        <GlobeClient className="h-full w-full" focus={sel} />
        <p className="code absolute bottom-2 left-6 !text-[0.625rem] text-sky/90 lg:left-16">DRAG TO ROTATE · SELECT A REGION</p>
      </div>

      <div className="lg:col-span-6">
        <p className="eyebrow text-sky">Coverage</p>
        <h2 className="display mt-5 text-[2.25rem] md:text-[3.25rem]">Wherever the plant, the port or the vessel is.</h2>

        <ul className="mt-10 border-b border-line-dark" role="list">
          {locations.map((l, k) => {
            const on = k === sel;
            return (
              <li key={l.name} className="border-t border-line-dark">
                <button
                  type="button"
                  onClick={() => setSel(k)}
                  aria-expanded={on}
                  className="flex w-full items-center gap-4 py-4 text-left"
                >
                  <span className={`h-2 w-2 rounded-full ${l.kind === "hq" ? "bg-signal" : "bg-sky"} ${on ? "" : "opacity-60"}`} />
                  <span className={`flex-1 text-[1.125rem] font-semibold ${on ? "text-white" : "text-white/70"}`} style={{ fontFamily: "var(--font-display)" }}>
                    {l.region}
                    <span className="ml-2 text-[0.875rem] font-normal text-white/55" style={{ fontFamily: "var(--font-sans)" }}>{l.name}</span>
                  </span>
                  <span className="code hidden !text-[0.6875rem] text-sky/80 sm:inline">{coord(l.lat, l.lon)}</span>
                </button>
                <div className={`grid transition-[grid-template-rows] duration-300 ${on ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <p className="overflow-hidden pl-6 text-[0.9375rem] leading-relaxed text-white/70">
                    <span className="block pb-5">{l.note}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>

        <form
          className="mt-8 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/contact?service=marine-survey&location=${encodeURIComponent(where)}`);
          }}
        >
          <label htmlFor="cov-where" className="sr-only">Port, city or plant location</label>
          <input id="cov-where" value={where} onChange={(e) => setWhere(e.target.value)} placeholder="Port, city or plant location" className="field field-dark flex-1" />
          <button type="submit" className="btn btn-light justify-center">Request a surveyor</button>
        </form>
      </div>
    </div>
  );
}
