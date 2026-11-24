"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/content";
import { openPalette } from "@/lib/palette";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const primary = nav.slice(0, 5);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div
        className={`mx-auto flex h-16 max-w-[90rem] items-center gap-6 border px-4 text-white transition-[background-color,border-color] duration-300 md:px-6 ${
          scrolled || pathname !== "/" ? "glass border-line-dark" : "border-white/10 bg-ink/40 backdrop-blur-md"
        }`}
      >
        <Link href="/" aria-label="TUV Thuringen SouthAsia, home" className="shrink-0">
          <Logo variant="lockup" tone="white" className="h-[26px] md:h-[30px]" />
        </Link>

        <nav aria-label="Main" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-1 text-[0.875rem] font-medium">
            {primary.map((item) => {
              const current = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`relative block px-3 py-2 transition-colors hover:text-white ${current ? "text-white" : "text-white/75"}`}
                  >
                    {item.label}
                    {current && <span className="absolute inset-x-3 -bottom-[13px] h-[2px] bg-signal" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <button
            type="button"
            onClick={openPalette}
            className="hidden h-10 items-center gap-6 border border-white/20 px-3 text-[0.8125rem] text-white/80 transition-colors hover:border-white/50 hover:text-white md:inline-flex"
            aria-label="Find a service"
          >
            Find a service
            <kbd className="code !text-[0.6875rem] text-sky">⌘K</kbd>
          </button>
          <Link href="/contact" className="btn btn-light hidden !h-10 !px-4 !text-[0.875rem] sm:inline-flex">
            Request a quote
          </Link>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center xl:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-3 w-6">
              <span className={`absolute left-0 top-0 h-[1.5px] w-6 bg-current transition-transform ${open ? "translate-y-[5px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-[1.5px] w-6 bg-current transition-transform ${open ? "-translate-y-[5.5px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`fixed inset-0 -z-10 overflow-y-auto bg-ink pt-24 text-white transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100" : "pointer-events-none invisible opacity-0"
        }`}
      >
        <nav aria-label="Mobile" className="container-x pb-10">
          <ul>
            {nav.map((item) => (
              <li key={item.href} className="border-b border-white/10">
                <Link href={item.href} className="display flex items-center justify-between py-4 text-[1.625rem]">
                  {item.label}
                  <span aria-hidden className="text-base text-sky">→</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-8 grid gap-3">
            <Link href="/contact" className="btn btn-light justify-center">Request a quote</Link>
            <button type="button" onClick={() => { setOpen(false); openPalette(); }} className="btn btn-ghost-dark justify-center">
              Find a service
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
