import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import PageHero from "@/components/PageHero";
import CertificateCheck from "@/components/CertificateCheck";
import { accreditations } from "@/lib/content";

export const metadata: Metadata = { title: "Accreditations", description: "Notified-body and DAkkS accreditations of the TÜV Thüringen Group companies that issue our certificates." };

export default function AccreditationsPage() {
  return (
    <>
      <PageHero
        crumb="Accreditations"
        title="Issued by the accredited group body."
        lead="TUV Thuringen SouthAsia does not hold accreditations of its own. Notified-body work and accredited certification are carried out by the TÜV Thüringen Group company named below and on each certificate."
      />
      <section className="py-16 md:py-24">
        <div className="container-x space-y-4">
          {accreditations.map((a) => (
            <Card key={a.id} className="grid gap-6 rounded-md border-line p-6 shadow-none md:grid-cols-12 md:p-8">
              <div className="md:col-span-5">
                <Badge variant="outline" className="code rounded-[2px] border-line !text-[0.625rem] uppercase text-muted">{a.kind}</Badge>
                <h2 className="display mt-3 text-[2rem] text-tuv">{a.id}</h2>
                <p className="mt-2 text-[0.9375rem] text-muted">{a.holder}</p>
              </div>
              <ul className="space-y-2 text-[0.9375rem] md:col-span-7 md:border-l md:border-line md:pl-8">
                {a.scope.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </Card>
          ))}
          <p className="pt-4 text-[0.875rem] text-muted">
            Notified bodies can be checked in the European Commission&apos;s NANDO database under their four-digit numbers.
          </p>
        </div>
      </section>
      <section id="verify" className="bg-paper py-16">
        <div className="container-x grid gap-8 lg:grid-cols-12">
          <h2 className="display text-[2rem] lg:col-span-4">Verify a certificate.</h2>
          <div className="lg:col-span-8"><CertificateCheck /></div>
        </div>
      </section>
    </>
  );
}
