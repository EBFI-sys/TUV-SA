"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { serviceLines } from "@/lib/content";
import { Arrow } from "@/components/ui";

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
        <label htmlFor="qs-service" className="label text-white/75">Service</label>
        <select id="qs-service" value={service} onChange={(e) => setService(e.target.value)} className="field field-dark h-14 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 stroke=%22white%22 fill=%22none%22 stroke-width=%221.5%22/></svg>')] bg-[right_1rem_center] bg-no-repeat">
          {serviceLines.map((s) => <option key={s.slug} value={s.slug} className="text-text">{s.name}</option>)}
        </select>
      </div>
      <div className="md:col-span-4">
        <label htmlFor="qs-location" className="label text-white/75">Location</label>
        <input id="qs-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Port, city or plant" className="field field-dark h-14" />
      </div>
      <div className="md:col-span-2">
        <label htmlFor="qs-date" className="label text-white/75">Date</label>
        <input id="qs-date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="Expected date" className="field field-dark h-14" />
      </div>
      <button type="submit" className="btn btn-light h-14 justify-center md:col-span-3">Continue to quote <Arrow /></button>
    </form>
  );
}
