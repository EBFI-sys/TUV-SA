"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { serviceLines } from "@/lib/content";
import { Arrow } from "@/components/ui";

type Status = { state: "idle" | "sending" | "sent" | "error"; message?: string; ref?: string };

export default function QuoteForm() {
  const params = useSearchParams();
  const initial = serviceLines.some((s) => s.slug === params.get("service")) ? (params.get("service") as string) : serviceLines[0].slug;
  const [service, setService] = useState(initial);
  const [status, setStatus] = useState<Status>({ state: "idle" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const line = useMemo(() => serviceLines.find((s) => s.slug === service)!, [service]);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries()) as Record<string, string>;
    const errs: Record<string, string> = {};
    if (!data.name?.trim()) errs.name = "Enter your name.";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.email ?? "")) errs.email = "Enter an email address we can reply to, e.g. name@company.com.";
    if (!data.details?.trim() && !data.scope?.trim() && !data.vessel?.trim()) errs.details = "Describe the work in a sentence or two.";
    if (!data.consent) errs.consent = "Confirm that we may use these details to reply to your request.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`q-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setStatus({ state: "sending" });
    try {
      const r = await fetch("/api/quote", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...data, service }) });
      const j = await r.json();
      if (!r.ok) throw new Error(j.error);
      setStatus({ state: "sent", ref: j.reference });
    } catch {
      setStatus({ state: "error", message: "The request could not be sent. Check your connection and try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="border border-line bg-paper p-8" role="status">
        <p className="code !text-[0.6875rem] text-signal">REQUEST RECEIVED</p>
        <p className="display mt-4 text-[2rem]">Thank you. We have your request.</p>
        <p className="mt-4 max-w-lg text-[1rem] leading-relaxed text-muted">
          Reference <span className="code !text-[0.9375rem] text-text">{status.ref}</span>. We reply by email with the specialist, the
          date and the fee.
        </p>
        <Link href="/" className="btn btn-outline mt-8">Back to the home page</Link>
      </div>
    );
  }

  const err = (k: string) =>
    errors[k] ? <p id={`q-${k}-err`} className="mt-1.5 text-[0.8125rem] text-signal">{errors[k]}</p> : null;

  return (
    <form onSubmit={submit} noValidate className="space-y-10">
      <fieldset>
        <legend className="label text-muted">1 · Service</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {serviceLines.map((s) => (
            <label key={s.slug} className={`flex cursor-pointer items-start gap-3 border p-4 transition-colors ${service === s.slug ? "border-tuv bg-tuv/[0.04]" : "border-line hover:border-muted"}`}>
              <input type="radio" name="serviceChoice" value={s.slug} checked={service === s.slug} onChange={() => setService(s.slug)} className="mt-1 accent-[var(--color-tuv)]" />
              <span>
                <span className="block text-[1rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>{s.name}</span>
                <span className="mt-0.5 block text-[0.8125rem] text-muted">{s.short}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label text-muted">2 · The work</legend>
        <div className="grid gap-4 sm:grid-cols-3">
          {line.fields.map((f) => (
            <div key={f.name + service}>
              <label htmlFor={`q-${f.name}`} className="label text-muted">{f.label}</label>
              <input id={`q-${f.name}`} name={f.name} defaultValue={params.get(f.name) ?? ""} placeholder={f.placeholder} className="field" />
            </div>
          ))}
        </div>
        <div className="mt-4">
          <label htmlFor="q-details" className="label text-muted">Details</label>
          <textarea id="q-details" name="details" rows={5} aria-describedby={errors.details ? "q-details-err" : undefined} aria-invalid={!!errors.details} placeholder="Scope, applicable codes or ITP, number of visits, documents you can share" className="field h-auto py-3" />
          {err("details")}
        </div>
      </fieldset>

      <fieldset>
        <legend className="label text-muted">3 · Your details</legend>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            ["name", "Full name", "text", "name"],
            ["company", "Company", "text", "organization"],
            ["email", "Work email", "email", "email"],
            ["phone", "Phone (optional)", "tel", "tel"],
          ].map(([n, l, t, ac]) => (
            <div key={n}>
              <label htmlFor={`q-${n}`} className="label text-muted">{l}</label>
              <input id={`q-${n}`} name={n} type={t} autoComplete={ac} aria-invalid={!!errors[n]} aria-describedby={errors[n] ? `q-${n}-err` : undefined} className="field" />
              {err(n)}
            </div>
          ))}
        </div>
        <div aria-hidden className="absolute -left-[9999px]">
          <label htmlFor="q-website">Website</label>
          <input id="q-website" name="website" tabIndex={-1} autoComplete="off" />
        </div>
      </fieldset>

      <div>
        <label className="flex items-start gap-3 text-[0.875rem] leading-relaxed text-muted">
          <input id="q-consent" type="checkbox" name="consent" value="yes" className="mt-1 accent-[var(--color-tuv)]" aria-describedby={errors.consent ? "q-consent-err" : undefined} />
          <span>
            I agree that TUV Thuringen SouthAsia uses these details to reply to this request, as described in the{" "}
            <Link href="/legal/privacy" className="text-tuv underline underline-offset-2">privacy notice</Link>.
          </span>
        </label>
        {err("consent")}
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <button type="submit" disabled={status.state === "sending"} className="btn btn-primary justify-center">
          {status.state === "sending" ? "Sending…" : <>Send request <Arrow /></>}
        </button>
        {status.state === "error" && <p className="text-[0.875rem] text-signal" role="alert">{status.message}</p>}
      </div>
    </form>
  );
}
