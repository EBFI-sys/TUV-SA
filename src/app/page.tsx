import Link from "next/link";
import GlobeClient from "@/components/GlobeClient";
import DraftMarks from "@/components/DraftMarks";
import CertificateCheck from "@/components/CertificateCheck";
import { accreditations, industries, locations, marineSurveys, serviceLines, workflow } from "@/lib/content";

const serviceCodes: Record<string, string[]> = {
  inspection: ["ITP", "FAT", "PSI", "NDT"],
  "marine-survey": ["ON/OFF-HIRE", "DRAFT", "BUNKER", "P&I"],
  certification: ["ISO", "CE", "PED", "ISO 14064"],
  testing: ["NDT", "GS", "EN 1090", "ASME"],
};

function coord(lat: number, lon: number) {
  const la = `${Math.abs(lat).toFixed(4)}° ${lat >= 0 ? "N" : "S"}`;
  const lo = `${Math.abs(lon).toFixed(4)}° ${lon >= 0 ? "E" : "W"}`;
  return `${la}  ${lo}`;
}

function Arrow() {
  return (
    <svg className="arrow" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <div className="grid-lines absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_70%_45%,black,transparent_70%)]" />
        <div className="absolute -right-40 top-10 -z-10 h-[720px] w-[720px] rounded-full bg-[radial-gradient(circle,rgb(30_96_190/0.35),transparent_65%)]" />

        <div className="container-x grid items-center gap-6 pt-[6.5rem] md:pt-[9rem] lg:grid-cols-12 lg:gap-0 lg:pt-[8.5rem]">
          <div className="relative z-10 lg:col-span-7 lg:pb-24">
            <p className="eyebrow flex items-center gap-3 text-sky">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              TÜV Thüringen Group · Navi Mumbai, India
            </p>
            <h1 className="display mt-7 text-[2.5rem] sm:text-[3.5rem] xl:text-[4.25rem]">
              Inspection, certification and&nbsp;testing.
              <span className="mt-3 block text-[0.62em] text-sky">One TÜV partner, worldwide.</span>
            </h1>
            <p className="mt-8 max-w-[34rem] text-[1.0625rem] leading-relaxed text-white/70">
              Inspectors at your supplier&apos;s plant, surveyors in the port and on board, and certification and testing by
              the accredited companies of the TÜV Thüringen Group. One contract, one report standard, one point of contact.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/contact" className="btn btn-light">Request a quote <Arrow /></Link>
              <Link href="#services" className="btn btn-ghost-dark">Explore services</Link>
            </div>
          </div>

          <div className="relative -mx-6 h-[360px] sm:h-[500px] lg:col-span-5 lg:mx-0 lg:-mr-28 lg:h-[640px] xl:-mr-40">
            <GlobeClient className="h-full w-full" />
          </div>
        </div>

        {/* location ledger */}
        <div className="relative border-t border-line-dark bg-ink/60 backdrop-blur-sm">
          <ul className="container-x grid grid-cols-2 gap-px md:grid-cols-3 xl:grid-cols-6">
            {locations.map((l) => (
              <li key={l.name} className="py-5 pr-4">
                <p className="flex items-center gap-2 text-[0.875rem] font-semibold">
                  <span className={`h-1.5 w-1.5 rounded-full ${l.kind === "hq" ? "bg-signal" : "bg-sky"}`} />
                  {l.name}
                </p>
                <p className="mt-1 text-[0.75rem] text-white/50">{l.note}</p>
                <p className="code mt-2 !text-[0.625rem] whitespace-pre text-sky/70">{coord(l.lat, l.lon)}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GROUP FACTS */}
      <section aria-labelledby="facts" className="border-b border-line">
        <h2 id="facts" className="sr-only">The TÜV Thüringen Group in figures</h2>
        <div className="container-x grid grid-cols-2 lg:grid-cols-4">
          {[
            { k: "1990", v: "TÜV Thüringen founded in Erfurt, Germany" },
            { k: "1,100+", v: "Experts across the group" },
            { k: "150+", v: "Accreditations and approvals held by the group" },
            { k: "NB 0090", v: "EU Notified Body number of TÜV Thüringen e.V." },
          ].map((f, i) => (
            <div key={f.k} className={`py-10 pr-6 md:py-14 ${i > 0 ? "lg:border-l lg:border-line lg:pl-8" : ""} ${i % 2 ? "border-l border-line pl-6 lg:pl-8" : ""}`}>
              <p className="display whitespace-nowrap text-[1.875rem] text-tuv sm:text-[2.25rem] md:text-[3rem]">{f.k}</p>
              <p className="mt-3 max-w-[15rem] text-[0.875rem] leading-snug text-muted">{f.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="scroll-mt-28 py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-8 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="eyebrow text-signal">Services</p>
              <h2 className="display mt-5 text-[2.25rem] md:text-[3.25rem]">Four service lines. One contract.</h2>
            </div>
            <p className="self-end text-[1.0625rem] leading-relaxed text-muted lg:col-span-6 lg:col-start-7">
              Book an inspector for a factory acceptance test in Pune, a draft survey in Rotterdam and an ISO 9001 audit through
              the same team. Work outside India is carried out by TÜV Thüringen Group companies and reported in one format.
            </p>
          </div>

          <div className="mt-14 grid border-l border-t border-line md:grid-cols-2">
            {serviceLines.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group relative flex flex-col border-b border-r border-line p-8 transition-colors hover:bg-paper md:p-10"
              >
                <div className="flex flex-wrap gap-1.5">
                  {serviceCodes[s.slug].map((c) => (
                    <span key={c} className="code rounded-[2px] border border-line px-2 py-1 !text-[0.625rem] text-muted group-hover:border-tuv/30">
                      {c}
                    </span>
                  ))}
                </div>
                <h3 className="display mt-8 text-[1.75rem] md:text-[2.125rem]">{s.name}</h3>
                <p className="mt-3 text-[1.0625rem] text-text">{s.short}</p>
                <ul className="mt-6 grid gap-x-6 gap-y-2 text-[0.875rem] text-muted sm:grid-cols-2">
                  {s.items.map((it) => (
                    <li key={it} className="flex gap-2.5">
                      <span className="mt-[0.55rem] h-px w-2.5 shrink-0 bg-tuv" />
                      {it}
                    </li>
                  ))}
                </ul>
                <span className="mt-8 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-tuv">
                  {s.name} <svg className="transition-transform duration-300 group-hover:translate-x-1" width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden><path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* MARINE */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white md:py-28">
        <div className="grid-lines absolute inset-0 -z-10 opacity-60" />
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-sky">Marine survey</p>
            <h2 className="display mt-5 text-[2.25rem] md:text-[3.25rem]">Wherever the vessel calls.</h2>
            <p className="mt-6 max-w-md text-[1.0625rem] leading-relaxed text-white/65">
              Condition, quantity and damage surveys for shipowners, charterers, traders, P&amp;I clubs and underwriters. One
              neutral report, whichever side instructed us.
            </p>
            <Link href="/marine-survey" className="btn btn-light mt-10">Marine survey services <Arrow /></Link>
            <DraftMarks className="mt-16 hidden w-[150px] lg:block" />
          </div>
          <ul className="grid self-start border-l border-t border-line-dark sm:grid-cols-2 lg:col-span-8">
            {marineSurveys.map((m) => (
              <li key={m.code} className="group border-b border-r border-line-dark p-7 transition-colors hover:bg-ink-2 md:p-8">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-[1.125rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>{m.name}</h3>
                  <span className="code !text-[0.625rem] text-sky/70">{m.code}</span>
                </div>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-white/60">{m.detail}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <p className="eyebrow text-signal">How an assignment runs</p>
          <h2 className="display mt-5 max-w-3xl text-[2.25rem] md:text-[3.25rem]">From request to report.</h2>
          <ol className="mt-14 grid gap-10 md:grid-cols-4 md:gap-0">
            {workflow.map((s, i) => (
              <li key={s.title} className="relative md:pr-8">
                <div className="flex items-center gap-4">
                  <span className="code flex h-9 w-9 items-center justify-center rounded-full border border-tuv bg-white !text-[0.75rem] font-semibold text-tuv">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {i < workflow.length - 1 && <span className="tick-rule hidden flex-1 text-tuv md:block" />}
                </div>
                <h3 className="mt-6 text-[1.25rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>{s.title}</h3>
                <p className="mt-2 max-w-[16rem] text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ACCREDITATIONS */}
      <section className="py-20 md:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow text-signal">Accreditations</p>
            <h2 className="display mt-5 text-[2.25rem] md:text-[3rem]">Issued by the accredited group body.</h2>
            <p className="mt-6 text-[1rem] leading-relaxed text-muted">
              Notified-body work and accredited certification are carried out under the accreditation of the TÜV Thüringen
              Group company named below. Its name and number appear on every certificate.
            </p>
          </div>
          <div className="lg:col-span-8">
            {accreditations.map((a) => (
              <div key={a.id} className="grid gap-4 border-t border-line py-8 last:border-b md:grid-cols-12">
                <div className="md:col-span-5">
                  <p className="display text-[1.5rem] text-tuv">{a.id}</p>
                  <p className="mt-2 text-[0.875rem] text-muted">{a.holder}</p>
                </div>
                <ul className="space-y-1.5 text-[0.9375rem] md:col-span-7">
                  {a.scope.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INDUSTRIES */}
      <section className="bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-signal">Industries</p>
              <h2 className="display mt-5 text-[2.25rem] md:text-[3.25rem]">Built for heavy industry and trade.</h2>
            </div>
            <Link href="/industries" className="inline-flex items-center gap-2 text-[0.9375rem] font-semibold text-tuv">All industries <Arrow /></Link>
          </div>
          <ul className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {industries.map((ind) => (
              <li key={ind.name} className="border-b border-r border-line bg-white p-7">
                <h3 className="text-[1.0625rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>{ind.name}</h3>
                <p className="mt-2.5 text-[0.875rem] leading-relaxed text-muted">{ind.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* VERIFY */}
      <section id="verify" className="scroll-mt-28 py-20 md:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="eyebrow text-signal">Certificate register</p>
            <h2 className="display mt-5 text-[2.25rem] md:text-[3rem]">Verify a certificate.</h2>
            <p className="mt-6 text-[1rem] leading-relaxed text-muted">
              Check whether a certificate issued through TUV Thuringen SouthAsia is valid. Enter the number exactly as printed.
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-14">
            <CertificateCheck />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative isolate overflow-hidden bg-tuv text-white">
        <div className="grid-lines absolute inset-0 -z-10 opacity-70" />
        <div className="container-x flex flex-col items-start justify-between gap-10 py-20 md:flex-row md:items-end md:py-24">
          <div>
            <h2 className="display text-[2.25rem] md:text-[3.5rem]">Tell us what, where and when.</h2>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/75">
              Send the scope, the location and the dates. We reply with the inspector or surveyor, the attendance date and the
              fee.
            </p>
          </div>
          <Link href="/contact" className="btn btn-light shrink-0">Request a quote <Arrow /></Link>
        </div>
      </section>
    </>
  );
}
