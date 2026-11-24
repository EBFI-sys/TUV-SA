"use client";

import { useState } from "react";
import { Loader2, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Result =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; message: string }
  | { state: "found"; cert: { number: string; holder: string; standard: string; status: string; validUntil?: string; issuer?: string } }
  | { state: "missing"; number: string };

export default function CertificateCheck() {
  const [value, setValue] = useState("");
  const [res, setRes] = useState<Result>({ state: "idle" });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const n = value.trim();
    if (n.length < 4) {
      setRes({ state: "error", message: "Enter the certificate number as printed on the certificate." });
      return;
    }
    setRes({ state: "loading" });
    try {
      const r = await fetch(`/api/verify?n=${encodeURIComponent(n)}`);
      const j = await r.json();
      if (!r.ok) throw new Error(j.error ?? "Lookup failed");
      setRes(j.certificate ? { state: "found", cert: j.certificate } : { state: "missing", number: n });
    } catch {
      setRes({ state: "error", message: "The register could not be reached. Try again in a minute." });
    }
  }

  return (
    <div>
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row" noValidate>
        <label htmlFor="cert-number" className="sr-only">Certificate number</label>
        <Input
          id="cert-number"
          name="cert-number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Certificate number, e.g. TSA-Q-2026-0001"
          autoComplete="off"
          spellCheck={false}
          className="code h-12 flex-1 rounded-[2px] bg-white px-4 !text-[0.9375rem]"
        />
        <Button type="submit" size="xl" disabled={res.state === "loading"}>
          {res.state === "loading" ? <><Loader2 className="animate-spin" /> Checking…</> : <><Search /> Check certificate</>}
        </Button>
      </form>

      <div aria-live="polite" className="mt-5 min-h-[3rem]">
        {res.state === "error" && <p className="text-[0.9375rem] text-signal">{res.message}</p>}
        {res.state === "missing" && (
          <div className="flex gap-3 border-l-2 border-faint pl-4">
            <p className="text-[0.9375rem] leading-relaxed text-muted">
              No certificate <span className="code !text-[0.875rem] text-text">{res.number}</span> is registered with TUV
              Thuringen SouthAsia. Check the number as printed on the certificate, or send us a copy and we will confirm its status.
            </p>
          </div>
        )}
        {res.state === "found" && (
          <dl className="grid grid-cols-2 gap-x-8 gap-y-3 border-l-2 border-tuv pl-4 text-[0.9375rem] sm:grid-cols-3">
            <div><dt className="eyebrow text-faint">Status</dt><dd className="mt-1"><Badge className="rounded-[2px]">{res.cert.status}</Badge></dd></div>
            <div><dt className="eyebrow text-faint">Holder</dt><dd className="mt-1">{res.cert.holder}</dd></div>
            <div><dt className="eyebrow text-faint">Standard</dt><dd className="mt-1">{res.cert.standard}</dd></div>
            {res.cert.validUntil && <div><dt className="eyebrow text-faint">Valid until</dt><dd className="code mt-1 !text-[0.875rem]">{res.cert.validUntil}</dd></div>}
            {res.cert.issuer && <div><dt className="eyebrow text-faint">Issued by</dt><dd className="mt-1">{res.cert.issuer}</dd></div>}
          </dl>
        )}
      </div>
    </div>
  );
}
