import Link from "next/link";
import Logo from "@/components/Logo";
import { company, serviceLines } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="container-x grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Logo variant="full" tone="white" className="h-[98px]" />
          <p className="mt-8 max-w-xs text-[0.9375rem] leading-relaxed text-white/60">
            Inspection, certification and testing. One TÜV partner, worldwide.
          </p>
        </div>

        <nav aria-label="Services" className="md:col-span-5">
          <p className="eyebrow text-sky">Services</p>
          <ul className="mt-5 grid gap-x-8 gap-y-2.5 text-[0.9375rem] text-white/75 sm:grid-cols-2">
            {serviceLines.map((s) => (
              <li key={s.slug}><Link className="hover:text-white" href={`/${s.slug}`}>{s.name}</Link></li>
            ))}
            <li><Link className="hover:text-white" href="/industries">Industries</Link></li>
            <li><Link className="hover:text-white" href="/accreditations">Accreditations</Link></li>
            <li><Link className="hover:text-white" href="/#verify">Verify a certificate</Link></li>
            <li><Link className="hover:text-white" href="/insights">Insights</Link></li>
          </ul>
        </nav>

        <div className="md:col-span-3">
          <p className="eyebrow text-sky">Company</p>
          <ul className="mt-5 grid gap-y-2.5 text-[0.9375rem] text-white/75">
            <li><Link className="hover:text-white" href="/about">About us</Link></li>
            <li><Link className="hover:text-white" href="/contact">Contact and quotes</Link></li>
          </ul>
          <address className="mt-8 not-italic text-[0.875rem] leading-relaxed text-white/55">
            {company.address}
          </address>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-[0.75rem] text-white/45 md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.legalName} · CIN <span className="code !text-[0.6875rem]">{company.cin}</span>
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            <li><Link className="hover:text-white" href="/legal/privacy">Privacy</Link></li>
            <li><Link className="hover:text-white" href="/legal/terms">Terms</Link></li>
            <li><Link className="hover:text-white" href="/legal/notice">Legal notice</Link></li>
          </ul>
        </div>
        <p className="container-x pb-8 text-[0.6875rem] leading-relaxed text-white/35">
          Certificates and notified-body services are issued by the accredited TÜV Thüringen Group company named on each
          certificate or report.
        </p>
      </div>
    </footer>
  );
}
