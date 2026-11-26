import Image from "next/image";
import { Anchor, BadgeCheck, ClipboardCheck, FlaskConical, ShieldCheck } from "lucide-react";
import HeroConsole from "@/components/HeroConsole";
import WorldClocks from "@/components/WorldClocks";
import Coverage from "@/components/Coverage";
import CertificateCheck from "@/components/CertificateCheck";
import QuoteStarter from "@/components/QuoteStarter";
import { Badge } from "@/components/ui/badge";
import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";
import { BorderBeam } from "@/components/ui/border-beam";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Separator } from "@/components/ui/separator";
import { accreditations, extraStandards, offices, photos, serviceLines } from "@/lib/content";

const [inspection, marine, certification, testing] = serviceLines;
// Running standards strip: every code we cite plus offshore, coating and food-safety standards (labels that are not standards are left out)
const notStandards = new Set(["PRODUCTION", "FAT", "PSI", "NDT", "AQL", "Schedule", "Progress", "ON/OFF-HIRE", "DRAFT", "BUNKER", "P&I", "H&M", "Cargo", "Condition", "SIRE-ready", "Charter party", "ROB", "BDN", "Hydrostatics", "Ultrasonic", "IMO", "IACS", "ISO", "CE", "PED", "GS", "ASME", "EN", "CBAM", "GHG Protocol", "UN/ECE", "Codex Alimentarius"]);
const allCodes = Array.from(new Set([...serviceLines.flatMap((s) => [...s.codes, ...s.subs.flatMap((x) => x.codes)]), ...extraStandards])).filter((c) => !notStandards.has(c));
const totalServices = serviceLines.reduce((n, s) => n + s.subs.length, 0);

function PhotoBg({ s, sizes }: { s: (typeof serviceLines)[number]; sizes: string }) {
  return (
    <>
      <Image src={photos[s.photo].src} alt={photos[s.photo].alt} fill sizes={sizes} className="-z-10 object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/0" />
      <div className="absolute left-6 top-6 flex flex-wrap gap-1.5 md:left-8 md:top-8">
        {s.codes.map((c) => (
          <Badge key={c} variant="outline" className="code rounded-[2px] border-white/40 bg-ink/30 !text-[0.625rem] text-white backdrop-blur-sm">{c}</Badge>
        ))}
      </div>
    </>
  );
}

const stats = [
  { value: serviceLines.length, label: "Service lines", note: "under one contract" },
  { value: totalServices, label: "Services", note: "inspection to certification" },
  { value: offices.length, label: "Group offices", note: "India, Europe, China, Central Asia" },
  { value: allCodes.length, label: "Codes and standards", note: "we routinely work to" },
];

export default function Home() {
  return (
    <>
      {/* 1 · HERO */}
      <section className="relative isolate overflow-hidden bg-ink text-white">
        <Image src={photos.port.src} alt="" fill priority sizes="100vw" className="-z-20 object-cover object-[70%_center]" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(6_26_51/0.97)_0%,rgb(6_26_51/0.78)_48%,rgb(6_26_51/0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink to-transparent" />

        <div className="container-x grid gap-12 pb-12 pt-32 lg:min-h-[min(100svh,980px)] lg:grid-cols-12 lg:items-center lg:pb-28 lg:pt-36">
          <div className="min-w-0 lg:col-span-7">
            <Badge variant="outline" className="eyebrow h-auto max-w-full gap-3 whitespace-normal rounded-[2px] border-white/20 bg-ink/40 px-3 py-1.5 text-left leading-relaxed text-sky backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-signal" />
              TÜV Thüringen Group · Navi Mumbai · Worldwide
            </Badge>
            <h1 className="display mt-7 text-[2.75rem] sm:text-[4rem] xl:text-[5.5rem]">Inspection, certification and&nbsp;testing.</h1>
            <p className="display mt-5 text-[1.5rem] text-sky sm:text-[2rem]">One TÜV partner, worldwide.</p>
            <p className="mt-8 max-w-[36rem] text-[1.0625rem] leading-relaxed text-white/75">
              Inspectors at plant, surveyors in the port and on board, certification and testing according to the international
              standards. One contract, one key contact &ndash; for the worldwide.
            </p>
          </div>
          <div className="min-w-0 lg:col-span-5 lg:col-start-8 xl:col-span-4 xl:col-start-9">
            <HeroConsole />
          </div>
        </div>

        <div className="border-t border-line-dark">
          <WorldClocks />
        </div>
      </section>

      {/* 2 · STANDARDS MARQUEE + STATS */}
      <section aria-label="Codes and standards" className="border-b border-line bg-white">
        <Marquee pauseOnHover className="marquee-run py-5 [--duration:60s] [--gap:2.5rem] [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
          {allCodes.map((c) => (
            <span key={c} className="code flex items-center gap-2.5 !text-[0.8125rem] text-tuv">
              <span className="h-1 w-1 rotate-45 bg-signal" aria-hidden />{c}
            </span>
          ))}
        </Marquee>
        <Separator />
        <div className="container-x">
          <dl className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((s, k) => (
              <div key={s.label} className={`py-8 md:py-10 ${k % 2 ? "pl-6 md:pl-10" : ""} ${k > 0 ? "lg:border-l lg:border-line lg:pl-10" : ""} ${k > 1 ? "border-t border-line lg:border-t-0" : ""}`}>
                <dt className="code !text-[0.6875rem] uppercase text-muted">{s.label}</dt>
                <dd className="display mt-3 text-[3rem] text-tuv md:text-[4rem]">
                  <NumberTicker value={s.value} className="tabular-nums text-tuv" />
                </dd>
                <dd className="mt-1 text-[0.875rem] text-muted">{s.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 3 · SERVICE BENTO */}
      <section id="services" className="scroll-mt-24 bg-paper py-20 md:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-6">
              <p className="eyebrow text-signal">Services</p>
              <h2 className="display mt-5 text-[2.25rem] md:text-[3.5rem]">Four service lines.<br />One contract.</h2>
            </div>
            <p className="text-[1.0625rem] leading-relaxed text-muted lg:col-span-5 lg:col-start-8">
              Book a FAT witness in Houston, a draft survey in Rotterdam and an ISO 9001 audit through one source, under one
              agreement.
            </p>
          </div>

          {/* 21st.dev · Magic UI Bento Grid */}
          <BentoGrid className="mt-12 auto-rows-[26rem] grid-cols-1 md:grid-cols-12 md:auto-rows-[30rem]">
            <BentoCard
              dark
              name={inspection.name}
              description={`${inspection.subs.map((x) => x.name).slice(0, 4).join(", ")}.`}
              href={`/${inspection.slug}`}
              cta={`All ${inspection.subs.length} services`}
              Icon={ClipboardCheck}
              background={<PhotoBg s={inspection} sizes="(min-width: 768px) 58vw, 100vw" />}
              className="md:col-span-7"
            />
            <BentoCard
              dark
              name={marine.name}
              description={`${marine.subs.map((x) => x.name).slice(0, 4).join(", ")}.`}
              href={`/${marine.slug}`}
              cta={`All ${marine.subs.length} services`}
              Icon={Anchor}
              background={<PhotoBg s={marine} sizes="(min-width: 768px) 42vw, 100vw" />}
              className="md:col-span-5"
            />
            <BentoCard
              name={certification.name}
              description={certification.lead}
              href={`/${certification.slug}`}
              cta={`All ${certification.subs.length} services`}
              Icon={ShieldCheck}
              background={
                <ul className="absolute inset-x-6 top-6 grid grid-cols-3 gap-px border border-line bg-line md:inset-x-8 md:top-8">
                  {["ISO 9001", "ISO 14001", "ISO 45001", "ISO/IEC 27001", "ISO 50001", "PED 2014/68/EU", "EN 1090", "ISO 3834", "ISO 14064"].map((c) => (
                    <li key={c} className="code bg-white px-2 py-2.5 !text-[0.6875rem] text-tuv transition-colors group-hover:bg-paper">{c}</li>
                  ))}
                </ul>
              }
              className="md:col-span-5"
            />
            <BentoCard
              dark
              name={testing.name}
              description={`${testing.subs.map((x) => x.name).join(", ")}.`}
              href={`/${testing.slug}`}
              cta={`All ${testing.subs.length} services`}
              Icon={FlaskConical}
              background={<PhotoBg s={testing} sizes="(min-width: 768px) 58vw, 100vw" />}
              className="md:col-span-7"
            />
          </BentoGrid>
        </div>
      </section>

      {/* 4 · COVERAGE */}
      <section className="relative isolate overflow-hidden bg-ink py-20 text-white md:py-24">
        <div className="grid-lines absolute inset-0 -z-10 opacity-70" />
        <div className="container-x"><Coverage /></div>
      </section>

      {/* 5 · TRUST */}
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
              <Card key={a.id} className="min-w-[85%] snap-start gap-0 rounded-md border-line bg-paper py-0 shadow-none md:min-w-0">
                <CardHeader className="gap-0 p-6 pb-5">
                  <Badge variant="outline" className="code w-fit rounded-[2px] border-line bg-white !text-[0.625rem] uppercase text-muted">{a.kind}</Badge>
                  <CardTitle className="display mt-4 text-[1.75rem] text-tuv">{a.id}</CardTitle>
                  <CardDescription className="mt-2 text-[0.8125rem] text-muted">{a.holder}</CardDescription>
                </CardHeader>
                <CardContent className="border-t border-line p-6 pt-5">
                  <ul className="space-y-1.5 text-[0.875rem]">
                    {a.scope.map((s) => <li key={s}>{s}</li>)}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card id="verify" className="relative mt-4 scroll-mt-28 overflow-hidden rounded-md border-line bg-paper p-6 shadow-none">
            <BorderBeam size={160} duration={12} colorFrom="#003777" colorTo="#c90618" borderWidth={1.5} />
            <div className="grid gap-4 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-3">
                <p className="code flex items-center gap-2 !text-[0.6875rem] text-signal"><BadgeCheck className="size-4" aria-hidden /> VERIFY A CERTIFICATE</p>
                <p className="mt-2 text-[0.875rem] text-muted">Enter the number exactly as printed.</p>
              </div>
              <div className="lg:col-span-9"><CertificateCheck /></div>
            </div>
          </Card>
        </div>
      </section>

      {/* 6 · QUOTE STARTER */}
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
