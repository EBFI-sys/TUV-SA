import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageHero from "@/components/PageHero";
import { company } from "@/lib/content";

type Doc = { title: string; lead: string; sections: [string, string[]][] };

const docs: Record<string, Doc> = {
  privacy: {
    title: "Privacy notice",
    lead: "How TUV Thuringen SouthAsia handles personal data on this website, under the Digital Personal Data Protection Act, 2023.",
    sections: [
      ["Who we are", [`${company.legalName} (CIN ${company.cin}), ${company.address}, is the data fiduciary for personal data collected through this website.`]],
      ["What we collect", ["When you request a quote: your name, company, work email, phone number if you give it, and the details of the work you describe.", "When you check a certificate: the certificate number you enter. It is used only to run the lookup and is not stored with your identity.", "Server logs kept by our hosting provider for security, such as IP address and time of request."]],
      ["Why we use it", ["To reply to your request, prepare a quotation and arrange the work you ask for.", "To keep the website secure and working.", "We do not sell personal data and do not use it for advertising."]],
      ["Consent", ["We process quote-request data on the basis of the consent you give in the form. You can withdraw consent at any time by asking us to delete your request; this does not affect processing already carried out."]],
      ["Who processes it for us", ["Vercel Inc. hosts the website. Sanity AS stores quote requests and certificate records. Both act on our instructions as data processors. Data may be processed outside India, in countries not restricted under section 16 of the Act."]],
      ["How long we keep it", ["Quote requests that do not lead to a contract are deleted 24 months after receipt. Where a contract follows, records are kept for the period required by Indian tax and company law."]],
      ["Your rights", ["You can ask for a summary of the personal data we hold about you, have it corrected, completed or erased, nominate another person to exercise your rights, and have a grievance addressed.", `Email ${company.email} with "Privacy request" in the subject, or write to the registered office. If you are not satisfied with our response, you may complain to the Data Protection Board of India.`]],
      ["Cookies", ["This website does not use analytics or advertising cookies. It may store a technical setting in your browser that is needed for the site to work."]],
      ["Changes", ["Version 1.0, 24 November 2026. We will publish any changes on this page."]],
    ],
  },
  terms: {
    title: "Terms of use",
    lead: "The terms that apply when you use this website.",
    sections: [
      ["Information on this website", ["The content of this website describes our services in general terms. It is not an offer. Services are provided only under a written quotation or contract, which sets out the scope, fee and terms that apply."]],
      ["Certificates and accreditations", ["Certificates and notified-body services are issued by the accredited TÜV Thüringen Group company named on each certificate or report. The certificate check on this website reflects our register at the time of the query; the signed certificate prevails."]],
      ["Use of the website", ["Do not attempt to disrupt the website, gain unauthorised access, or submit false or automated requests."]],
      ["Trademarks", ["The TÜV Thüringen name and logo are used under the authority of TÜV Thüringen e.V. They may not be used without written permission."]],
      ["Liability", ["We take care to keep this website accurate but do not guarantee that it is complete or always available. Nothing in these terms limits liability that cannot be limited under Indian law."]],
      ["Governing law", ["These terms are governed by the laws of India. The courts at Mumbai, Maharashtra have jurisdiction."]],
    ],
  },
  notice: {
    title: "Legal notice",
    lead: "Company information.",
    sections: [
      ["Company", [company.legalName, `Corporate Identity Number: ${company.cin}`, `Incorporated: ${company.incorporated}`, `Registered office: ${company.address}`, `Email: ${company.email}`]],
      ["Group", ["A company of the TÜV Thüringen Group. Group headquarters: TÜV Thüringen e.V., Erfurt, Germany."]],
      ["Photography", ["Photographs on this website are illustrations of the work described."]],
    ],
  },
};

export const dynamicParams = false;
export function generateStaticParams() {
  return Object.keys(docs).map((doc) => ({ doc }));
}
export async function generateMetadata({ params }: { params: Promise<{ doc: string }> }): Promise<Metadata> {
  const d = docs[(await params).doc];
  return d ? { title: d.title, description: d.lead } : {};
}

export default async function LegalPage({ params }: { params: Promise<{ doc: string }> }) {
  const d = docs[(await params).doc];
  if (!d) notFound();
  return (
    <>
      <PageHero crumb={d.title} title={d.title} lead={d.lead} />
      <section className="py-16 md:py-24">
        <div className="container-x max-w-3xl space-y-10">
          {d.sections.map(([h, ps]) => (
            <div key={h}>
              <h2 className="display text-[1.5rem]">{h}</h2>
              <div className="mt-3 space-y-3 text-[1rem] leading-relaxed text-muted">
                {ps.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
