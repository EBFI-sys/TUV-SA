"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { serviceLines } from "@/lib/content";

const dark =
  "h-14 rounded-[2px] border-white/30 bg-ink/35 text-[0.9375rem] text-white shadow-none placeholder:text-white/70 focus-visible:border-white focus-visible:ring-white/15";

// 21st.dev · shadcn/ui Native Select, Input, Label, Button
export default function QuoteStarter() {
  const router = useRouter();
  const [service, setService] = useState(serviceLines[0].slug);
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  return (
    <form
      className="mt-10 grid gap-4 md:grid-cols-12 md:items-end"
      onSubmit={(e) => {
        e.preventDefault();
        const p = new URLSearchParams({ service, location, date });
        router.push(`/contact?${p.toString()}`);
      }}
    >
      <div className="md:col-span-3">
        <Label htmlFor="qs-service" className="label text-white/75">Service</Label>
        <NativeSelect id="qs-service" value={service} onChange={(e) => setService(e.target.value)} className={`${dark} [&+svg]:text-white`}>
          {serviceLines.map((s) => <NativeSelectOption key={s.slug} value={s.slug}>{s.name}</NativeSelectOption>)}
        </NativeSelect>
      </div>
      <div className="md:col-span-4">
        <Label htmlFor="qs-location" className="label text-white/75">Location</Label>
        <Input id="qs-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Port, city or plant" className={dark} />
      </div>
      <div className="md:col-span-2">
        <Label htmlFor="qs-date" className="label text-white/75">Date</Label>
        <Input id="qs-date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Expected date" className={dark} />
      </div>
      <Button type="submit" variant="light" className="h-14 text-[0.9375rem] font-semibold md:col-span-3">Continue to quote <ArrowRight /></Button>
    </form>
  );
}
