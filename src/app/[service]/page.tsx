import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ServiceAccordion from "@/components/ServiceAccordion";
import ServiceQuoteCard from "@/components/ServiceQuoteCard";
import { ArrowRight } from "lucide-react";
import Crumbs from "@/components/Crumbs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { industries, photos, serviceBySlug, serviceLines } from "@/lib/content";

export const dynamicParams = false;
export function generateStaticParams() {
  return serviceLines.map((s) => ({ service: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ service: string }> }): Promise<Metadata> {
  const s = serviceBySlug((await params).service);
  if (!s) return {};
  return { title: s.name, description: `${s.short} ${s.lead}` };
}

export default async function ServicePage({ params }: { params: Promise<{ service: string }> }) {
  const s = serviceBySlug((await params).service);
  if (!s) notFound();
  const p = photos[s.photo];
  const related = serviceLines.filter((x) => x.slug !== s.slug);
  const forIndustries = industries.filter((i) => i.services.includes(s.slug));

  return (
    <>
      <section className="bg-ink text-white">
        <div className="grid lg:min-h-[640px] lg:grid-cols-2">
          <div className="container-x flex flex-col justify-end pb-14 pt-32 lg:ml-auto lg:max-w-[42rem] lg:pr-12">
            <Crumbs current={s.name} />
            <h1 className="display mt-5 text-[2.75rem] sm:text-[4rem] xl:text-[4.75rem]">{s.name}</h1>
            <p className="mt-5 text-[1.25rem] text-sky" style={{ fontFamily: "var(--font-display)" }}>{s.short}</p>
            <p className="mt-5 max-w-xl text-[1.0625rem] leading-relaxed text-white/75">{s.lead}</p>
            <dl className="mt-10 grid gap-6 sm:grid-cols-3">
              {s.facts.map(([k, v]) => (
                <div key={k} className="border-t border-line-dark pt-4">
                  <dt className="code !text-[0.6875rem] uppercase text-sky">{k}</dt>
                  <dd className="mt-2 text-[0.875rem] leading-snug">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[300px] lg:min-h-full">
            <Image src={p.src} alt={p.alt} fill priority sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="code !text-[0.6875rem] text-muted">ON THIS PAGE</p>
              <ul className="mt-4 space-y-2.5 text-[0.875rem] text-muted">
                {s.subs.map((sub) => (
                  <li key={sub.name}><a className="hover:text-tuv" href={`#${sub.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`}>{sub.name}</a></li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="lg:col-span-6">
            <h2 className="display text-[2rem] md:text-[2.5rem]">{s.subs.length} services</h2>
            <p className="mt-3 text-[1rem] text-muted">Open a service to see what we check and the codes we usually work to.</p>
            <ServiceAccordion subs={s.subs} />
          </div>
          <div className="lg:col-span-3">
            <div className="sticky top-28"><ServiceQuoteCard service={s.slug} title={s.cta} fields={s.fields} /></div>
          </div>
        </div>
      </section>

      {s.focus && (
        <section className="border-t border-line bg-paper py-16 md:py-20">
          <div className="container-x">
            <p className="eyebrow text-signal">{s.focus.eyebrow}</p>
            <h2 className="display mt-4 text-[2rem] md:text-[2.5rem]">{s.focus.title}</h2>
            <ul className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
              {s.focus.items.map((it, k) => (
                <li key={it.name} className="bg-white p-6">
                  <span className="code !text-[0.6875rem] text-muted">{String(k + 1).padStart(2, "0")}</span>
                  <h3 className="mt-4 text-[1.125rem] font-semibold leading-snug" style={{ fontFamily: "var(--font-display)" }}>{it.name}</h3>
                  <p className="mt-2 text-[0.875rem] leading-relaxed text-muted">{it.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {forIndustries.length > 0 && (
        <section className="border-t border-line py-16 md:py-20">
          <div className="container-x">
            <p className="eyebrow text-signal">Where it is used</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {forIndustries.map((i) => (
                <li key={i.name}>
                  <Card className="h-full gap-0 rounded-md border-line py-0 shadow-none transition-colors hover:border-tuv">
                    <CardHeader className="gap-0 p-6">
                      <CardTitle className="text-[1.0625rem]" style={{ fontFamily: "var(--font-display)" }}><h3>{i.name}</h3></CardTitle>
                      <CardDescription className="mt-2 text-[0.875rem] leading-relaxed text-muted">{i.text}</CardDescription>
                    </CardHeader>
                  </Card>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="bg-paper py-16 md:py-20">
        <div className="container-x">
          <p className="code !text-[0.6875rem] text-muted">ALSO NEEDED ON THE SAME PROJECT</p>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/${r.slug}`} className="group block">
                <Card className="grid h-full grid-cols-[120px_1fr] gap-0 overflow-hidden rounded-md border-line py-0 shadow-none transition-colors group-hover:border-tuv">
                  <div className="relative min-h-[112px]"><Image src={photos[r.photo].src} alt="" fill sizes="120px" className="object-cover transition-transform duration-500 group-hover:scale-105" /></div>
                  <CardContent className="flex flex-col justify-between p-5">
                    <span className="text-[1.0625rem] font-semibold" style={{ fontFamily: "var(--font-display)" }}>{r.name}</span>
                    <ArrowRight className="size-4 self-end text-tuv transition-transform group-hover:translate-x-1" aria-hidden />
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
