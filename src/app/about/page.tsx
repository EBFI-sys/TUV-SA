import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PageHero from "@/components/PageHero";
import { ArrowRight } from "lucide-react";
import { company, photos } from "@/lib/content";

export const metadata: Metadata = { title: "About", description: "TUV Thuringen SouthAsia is a company of the TÜV Thüringen Group, headquartered in Navi Mumbai, India." };

export default function AboutPage() {
  return (
    <>
      <PageHero crumb="About" title="A TÜV Thüringen company in India." lead="TUV Thuringen SouthAsia brings the inspection, survey, certification and testing work of the TÜV Thüringen Group to clients in India and to their projects worldwide." />
      <section className="py-16 md:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="display text-[2rem] md:text-[2.5rem]">The group behind the name.</h2>
            <p className="mt-5 text-[1.0625rem] leading-relaxed text-muted">
              TÜV Thüringen was founded in Erfurt, Germany, in 1990. Today the group employs more than 1,100 experts and holds more
              than 150 accreditations and approvals, including EU notified-body status as Notified Body 0090.
            </p>
            <p className="mt-4 text-[1.0625rem] leading-relaxed text-muted">
              TUV Thuringen SouthAsia was incorporated in Navi Mumbai on {company.incorporated}. Clients contract with one
              company, receive one report format and deal with one point of contact, wherever the work takes place.
            </p>
            <dl className="mt-10 grid grid-cols-2 gap-6">
              {[["1990", "TÜV Thüringen founded"], ["1,100+", "Experts in the group"], ["150+", "Accreditations and approvals"], ["NB 0090", "EU notified body"]].map(([k, v]) => (
                <div key={k} className="border-t border-line pt-4">
                  <dt className="display text-[2rem] text-tuv">{k}</dt>
                  <dd className="mt-1 text-[0.875rem] text-muted">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="relative min-h-[360px] lg:col-span-6">
            <Image src={photos.certification.src} alt={photos.certification.alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="bg-paper py-16">
        <div className="container-x grid gap-6 md:grid-cols-2">
          <div>
            <p className="code !text-[0.6875rem] text-muted">COMPANY DETAILS</p>
            <dl className="mt-4 space-y-3 text-[0.9375rem]">
              <div><dt className="text-muted">Legal name</dt><dd>{company.legalName}</dd></div>
              <div><dt className="text-muted">CIN</dt><dd className="code !text-[0.875rem]">{company.cin}</dd></div>
              <div><dt className="text-muted">Registered office</dt><dd>{company.address}</dd></div>
            </dl>
          </div>
          <div className="flex flex-col items-start gap-3 md:items-end md:justify-end">
            <Button asChild variant="outline" size="xl"><Link href="/accreditations">Accreditations <ArrowRight /></Link></Button>
            <Button asChild variant="default" size="xl"><Link href="/contact">Request a quote <ArrowRight /></Link></Button>
          </div>
        </div>
      </section>
    </>
  );
}
