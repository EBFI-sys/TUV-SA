"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { nav, serviceLines } from "@/lib/content";

export default function Header() {
  const pathname = usePathname();
  const overHero = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setPanel(null);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const solid = !overHero || scrolled || panel !== null;
  const active = serviceLines.find((s) => s.slug === panel);

  const enter = (slug: string | null) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setPanel(slug);
  };
  const leave = () => {
    closeTimer.current = setTimeout(() => setPanel(null), 140);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-white text-text shadow-[0_1px_0_var(--color-line)]" : "bg-transparent text-white"
      }`}
      onMouseLeave={leave}
    >
      {/* utility bar */}
      <div className={`hidden md:block border-b transition-colors ${solid ? "border-line" : "border-white/10"}`}>
        <div className="container-x flex h-9 items-center justify-between text-[0.75rem]">
          <span className={`eyebrow !text-[0.625rem] ${solid ? "text-muted" : "text-white/60"}`}>
            A company of the TÜV Thüringen Group
          </span>
          <div className={`flex items-center gap-6 ${solid ? "text-muted" : "text-white/70"}`}>
            <Link href="/#verify" className="hover:underline underline-offset-4">Verify a certificate</Link>
            <Link href="/contact" className="hover:underline underline-offset-4">Contact</Link>
          </div>
        </div>
      </div>

      <div className="container-x flex h-[4.5rem] items-center gap-8">
        <Link href="/" aria-label="TUV Thuringen SouthAsia, home" className="shrink-0">
          <Logo variant="lockup" tone={solid ? "color" : "white"} className="h-[30px] md:h-[34px]" />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden min-[1200px]:block">
          <ul className="flex items-center gap-[1.35rem] text-[0.875rem] font-medium">
            {nav.map((item) => {
              const slug = item.href.slice(1);
              const isService = serviceLines.some((s) => s.slug === slug);
              const current = pathname.startsWith(item.href);
              return (
                <li key={item.href} onMouseEnter={() => enter(isService ? slug : null)}>
                  <Link
                    href={item.href}
                    className={`relative py-6 transition-opacity hover:opacity-100 ${
                      solid ? "opacity-80" : "opacity-85"
                    } ${current || panel === slug ? "!opacity-100" : ""}`}
                    aria-current={current ? "page" : undefined}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-0 -bottom-[1px] h-[2px] bg-signal transition-transform duration-300 origin-left ${
                        current || panel === slug ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link href="/contact" className="btn btn-primary hidden !h-10 !px-4 !text-[0.875rem] min-[1360px]:inline-flex">
          Request a quote
        </Link>

        <button
          type="button"
          className="ml-auto inline-flex h-11 w-11 items-center justify-center min-[1200px]:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="relative block h-3 w-6">
            <span className={`absolute left-0 top-0 h-[1.5px] w-6 bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
            <span className={`absolute bottom-0 left-0 h-[1.5px] w-6 bg-current transition-transform ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {/* service mega panel */}
      <div
        className={`absolute inset-x-0 top-full hidden overflow-hidden border-t border-line bg-white text-text shadow-[0_24px_48px_-24px_rgb(6_26_51/0.25)] transition-[opacity,transform] duration-300 min-[1200px]:block ${
          active ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"
        }`}
        onMouseEnter={() => active && enter(active.slug)}
      >
        {active && (
          <div className="container-x grid grid-cols-12 gap-10 py-10">
            <div className="col-span-4">
              <p className="eyebrow text-signal">{active.name}</p>
              <p className="display mt-4 text-[1.75rem]">{active.short}</p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted">{active.lead}</p>
              <Link href={`/${active.slug}`} className="mt-6 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-tuv">
                All {active.name.toLowerCase()} services <span aria-hidden>→</span>
              </Link>
            </div>
            <ul className="col-span-8 grid grid-cols-2 content-start gap-x-10 border-l border-line pl-10">
              {active.items.map((it) => (
                <li key={it} className="border-b border-line">
                  <Link href={`/${active.slug}`} className="group flex items-center justify-between py-3.5 text-[0.9375rem]">
                    {it}
                    <span aria-hidden className="text-faint transition-transform group-hover:translate-x-1 group-hover:text-tuv">→</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* mobile drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 top-[4.5rem] md:top-[6.75rem] z-40 overflow-y-auto bg-ink text-white transition-opacity duration-300 min-[1200px]:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile" className="container-x py-8">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/10">
                <Link href={item.href} className="display flex items-center justify-between py-4 text-[1.5rem]" tabIndex={open ? 0 : -1}>
                  {item.label}
                  <span aria-hidden className="text-sky text-base">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Link href="/contact" className="btn btn-light justify-center" tabIndex={open ? 0 : -1}>Request a quote</Link>
            <Link href="/#verify" className="btn btn-ghost-dark justify-center" tabIndex={open ? 0 : -1}>Verify a certificate</Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
