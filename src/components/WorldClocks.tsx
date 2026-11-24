"use client";

import { useEffect, useState } from "react";
import { locations } from "@/lib/content";

const fmt = (tz: string, d: Date) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
const isDay = (tz: string, d: Date) => {
  const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", hour12: false }).format(d));
  return h >= 7 && h < 19;
};

export default function WorldClocks() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 20_000);
    return () => clearInterval(t);
  }, []);

  return (
    <ul className="no-scrollbar flex gap-8 overflow-x-auto md:grid md:grid-cols-5 md:gap-0" aria-label="Local time at our locations">
      {locations.map((l) => (
        <li key={l.name} className="flex shrink-0 items-center gap-3 py-4 md:py-5">
          <span className={`h-1.5 w-1.5 rounded-full ${l.kind === "hq" ? "bg-signal" : "bg-sky"}`} />
          <span className="code !text-[0.6875rem] uppercase text-white/65">{l.name}</span>
          <span className="code !text-[0.75rem] text-white" suppressHydrationWarning>
            {now ? fmt(l.tz, now) : "--:--"}
          </span>
          {now && <span className="code !text-[0.625rem] text-sky/90">{isDay(l.tz, now) ? "DAY" : "NIGHT"}</span>}
        </li>
      ))}
    </ul>
  );
}
