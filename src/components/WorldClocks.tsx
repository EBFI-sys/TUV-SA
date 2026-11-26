"use client";

import { useEffect, useState } from "react";
import { Marquee } from "@/components/ui/marquee";
import { offices } from "@/lib/content";

const fmt = (tz: string, d: Date) =>
  new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", minute: "2-digit", hour12: false }).format(d);
const isDay = (tz: string, d: Date) => {
  const h = Number(new Intl.DateTimeFormat("en-GB", { timeZone: tz, hour: "2-digit", hour12: false }).format(d));
  return h >= 7 && h < 19;
};

// 21st.dev · Magic UI Marquee — local time at every TÜV Thüringen Group office
export default function WorldClocks() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 20_000);
    return () => clearInterval(t);
  }, []);

  return (
    <div aria-label="Local time at TÜV Thüringen Group offices" role="region">
      <Marquee pauseOnHover repeat={3} className="marquee-run p-0 [--duration:70s] [--gap:3rem] [mask-image:linear-gradient(to_right,transparent,#000_4%,#000_96%,transparent)]">
        {offices.map((o) => (
          <span key={o.city} className="flex shrink-0 items-center gap-3 py-4 md:py-5">
            <span className={`h-1.5 w-1.5 rounded-full ${o.hq ? "bg-signal" : "bg-sky"}`} />
            <span className="code !text-[0.6875rem] uppercase text-white/65">{o.city}</span>
            <span className="code !text-[0.75rem] text-white" suppressHydrationWarning>{now ? fmt(o.tz, now) : "--:--"}</span>
            {now && <span className="code !text-[0.625rem] text-sky/90">{isDay(o.tz, now) ? "DAY" : "NIGHT"}</span>}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
