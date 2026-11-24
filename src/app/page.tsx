import Image from "next/image";
import Link from "next/link";
import HeroConsole from "@/components/HeroConsole";
import WorldClocks from "@/components/WorldClocks";
import Coverage from "@/components/Coverage";
import CertificateCheck from "@/components/CertificateCheck";
import QuoteStarter from "@/components/QuoteStarter";
import { Arrow } from "@/components/ui";
import { accreditations, photos, serviceLines } from "@/lib/content";

const [inspection, marine, certification, testing] = serviceLines;

function PhotoTile({ s, className, sizes }: { s: (typeof serviceLines)[number]; className: string; sizes: string }) {
  return (
    <Link href={`/${s.slug}`} className={`group relative isolate flex flex-col justify-end overflow-hidden bg-ink p-6 text-white md:p-8 ${className}`}>
      <Image src={photos[s.photo].src} alt={photos[s.photo].alt} fill sizes={sizes} className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/55 to-ink/0" />
      <div className="absolute left-6 top-6 flex flex-wrap gap-1.5 md:left-8 md:top-8">
        {s.codes.map((c) => (
          <span key={c} className="code border border-white/35 px-2 py-1 !text-[0.625rem] backdrop-blur-sm">{c}</span>
        ))}
      </div>
      <h3 className="display text-[1.875rem] md:text-[2.375rem]">{s.name}</h3>
      <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-white/75">{s.subs.map((x) => x.name).slice(0, 4).join(", ")}.</p>
      <span className="mt-5 inline-flex items-center gap-2 text-[0.875rem] font-semibold">
        {s.subs.length} services <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

export default function Home() {
  return (
    <>
      {/* 1 · HERO CONSOLE */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={photos.port.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(6_26_51/0.97)_0%,rgb(6_26_51/0.78)_48%,rgb(6_26_51/0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink to-transparent" />

        <div className="container-x grid gap-12 pb-12 pt-32 lg:min-h-[min(100svh,980px)] lg:grid-cols-12 lg:items-center lg:pb-28 lg:pt-36">
          <div className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-3 text-sky">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              TÜV Thüringen Group · Navi Mumbai · Worldwide
            </p>
            <h1 className="display mt-7 text-[2.75rem] sm:text-[4rem] xl:text-[5.5rem]">
              Inspection, certification and&nbsp;testing.
            </h1>
            <p className="display mt-5 text-[1.5rem] text-sky sm:text-[2rem]">One TÜV partner, worldwide.</p>
            <p className="mt-8 max-w-[36rem] text-[1.0625rem] leading-relaxed text-white/75">
              Inspectors at your supplier&apos;s plant, surveyors in the port and on board, certification and testing to EU and
              international standards. One contract, one report format, one point of contact.
            </p>
          </div>
          <div className="lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <HeroConsole />
          </div>
        </div>

        <div className="border-t border-line-dark">
          <div className="container-x"><WorldClocks /></div>
        </div>
      </section>

      {/* 2 · SERVICE BENTO */}
      <section id="services" className="scroll-mt-24 bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow text-signal">Services</p>
              <h2 className="display mt-5 text-[2.25rem] md:text-[3.5rem]">Four service lines.<br />One contract.</h2>
            </div>
            <p className="text-[1.0625rem] leading-relaxed text-muted lg:col-span-5 lg:col-start-8">
              Book a FAT witness in Pune, a draft survey in Rotterdam and an ISO 9001 audit through one team, under one framework
              agreement and one report standard.
            </p>
          </div>

          <div className="mt-12 grid gap-4 md:grid-cols-12">
            <PhotoTile s={inspection} className="min-h-[420px] md:col-span-7 md:min-h-[560px]" sizes="(min-width: 768px) 58vw, 100vw" />
            <PhotoTile s={marine} className="min-h-[420px] md:col-span-5 md:min-h-[560px]" sizes="(min-width: 768px) 42vw, 100vw" />

            <Link href={`/${certification.slug}`} className="group flex flex-col border border-line bg-white p-6 transition-colors hover:border-tuv md:col-span-5 md:p-8">
              <h3 className="display text-[1.875rem]">{certification.name}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">{certification.lead}</p>
              <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
                {["ISO 9001", "ISO 14001", "ISO 45001", "ISO/IEC 27001", "ISO 50001", "PED 2014/68/EU", "EN 1090", "ISO 3834", "ISO 14064"].map((c) => (
                  <li key={c} className="code !text-[0.75rem] text-tuv">{c}</li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-2 pt-8 text-[0.875rem] font-semibold text-tuv">
                {certification.subs.length} services <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            </Link>

            <Link href={`/${testing.slug}`} className="group grid overflow-hidden bg-ink text-white sm:grid-cols-2 md:col-span-7">
              <div className="relative min-h-[220px] overflow-hidden">
                <Image src={photos.testing.src} alt={photos.testing.alt} fill sizes="(min-width: 768px) 30vw, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
              </div>
              <div className="flex flex-col p-6 md:p-8">
                <h3 className="display text-[1.75rem]">{testing.name}</h3>
                <p className="mt-3 text-[0.875rem] leading-relaxed text-white/70">{testing.subs.map((x) => x.name).join(", ")}.</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-[0.875rem] font-semibold">
                  {testing.subs.length} services <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3 · COVERAGE */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white md:py-24">
        <div className="grid-lines absolute inset-0 -z-10 opacity-70" />
        <div className="container-x"><Coverage /></div>
      </section>

      {/* 4 · TRUST */}
      <section className="py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow text-signal">Accreditations</p>
              <h2 className="display mt-5 text-[2.25rem] md:text-[3.25rem]">Issued by the accredited group body.</h2>
            </div>
            <p className="text-[1.0625rem] leading-relaxed text-muted lg:col-span-5 lg:col-start-8">
              Notified-body work and accredited certification are carried out by the TÜV Thüringen Group company named on each
              certificate.
            </p>
          </div>

          <div className="no-scrollbar -mx-5 mt-12 flex snap-x gap-4 overflow-x-auto px-5 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0">
            {accreditations.map((a) => (
              <article key={a.id} className="relative min-w-[85%] snap-start border border-line bg-paper p-6 md:min-w-0">
                <p className="code !text-[0.6875rem] uppercase text-muted">{a.kind}</p>
                <p className="display mt-3 text-[1.75rem] text-tuv">{a.id}</p>
                <p className="mt-2 text-[0.8125rem] text-muted">{a.holder}</p>
                <ul className="mt-5 space-y-1.5 border-t border-line pt-5 text-[0.875rem]">
                  {a.scope.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </article>
            ))}
          </div>

          <div id="verify" className="mt-4 grid scroll-mt-28 gap-4 border border-line bg-paper p-6 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-3">
              <p className="code !text-[0.6875rem] text-signal">VERIFY A CERTIFICATE</p>
              <p className="mt-2 text-[0.875rem] text-muted">Enter the number exactly as printed.</p>
            </div>
            <div className="lg:col-span-9"><CertificateCheck /></div>
          </div>
        </div>
      </section>

      {/* 5 · QUOTE STARTER */}
      <section className="relative isolate overflow-hidden bg-tuv text-white">
        <div className="grid-lines absolute inset-0 -z-10 opacity-60" />
        <div className="container-x py-20 md:py-24">
          <h2 className="display text-[2.25rem] md:text-[3.5rem]">Tell us what, where and when.</h2>
          <p className="mt-4 max-w-xl text-[1.0625rem] leading-relaxed text-white/80">
            We reply with the inspector or surveyor, the attendance date and the fee.
          </p>
          <QuoteStarter />
        </div>
      </section>
    </>
  );
}
