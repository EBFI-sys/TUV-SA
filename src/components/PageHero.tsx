import Link from "next/link";

export default function PageHero({ crumb, title, lead, children }: { crumb: string; title: string; lead?: string; children?: React.ReactNode }) {
  return (
    <section className="relative isolate overflow-hidden bg-ink text-white">
      <div className="grid-lines absolute inset-0 -z-10 opacity-70" />
      <div className="container-x pb-14 pt-36 md:pb-20 md:pt-44">
        <nav aria-label="Breadcrumb" className="code !text-[0.6875rem] text-white/60">
          <Link href="/" className="hover:text-white">HOME</Link> <span aria-hidden>/</span> <span className="text-white/90">{crumb.toUpperCase()}</span>
        </nav>
        <h1 className="display mt-5 max-w-4xl text-[2.5rem] sm:text-[3.5rem] xl:text-[4.25rem]">{title}</h1>
        {lead && <p className="mt-6 max-w-2xl text-[1.0625rem] leading-relaxed text-white/75">{lead}</p>}
        {children}
      </div>
    </section>
  );
}
