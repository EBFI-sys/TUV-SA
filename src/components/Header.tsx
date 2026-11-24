"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Search } from "lucide-react";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { Kbd } from "@/components/ui/kbd";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { nav, serviceLines } from "@/lib/content";
import { openPalette } from "@/lib/palette";

const linkCls =
  "relative inline-flex h-10 flex-row items-center px-3 py-0 text-[0.875rem] font-medium text-white/75 transition-colors hover:text-white focus-visible:text-white";

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

  const inService = serviceLines.some((s) => pathname.startsWith(`/${s.slug}`));
  const company = nav.filter((n) => !serviceLines.some((s) => s.slug === n.href.slice(1))).slice(0, 3);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5">
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[90rem] items-center gap-6 border px-4 text-white transition-[background-color,border-color] duration-300 md:px-6",
          scrolled || pathname !== "/" ? "glass border-line-dark" : "border-white/10 bg-ink/40 backdrop-blur-md"
        )}
      >
        <Link href="/" aria-label="TUV Thuringen SouthAsia, home" className="shrink-0">
          <Logo variant="lockup" tone="white" className="h-[26px] md:h-[30px]" />
        </Link>

        {/* 21st.dev · shadcn/ui Navigation Menu */}
        <NavigationMenu className="ml-auto hidden xl:flex" aria-label="Main">
          <NavigationMenuList className="gap-0">
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={cn(
                  "h-10 rounded-none bg-transparent px-3 text-[0.875rem] text-white/75 hover:bg-transparent hover:text-white focus:bg-transparent focus:text-white data-[state=open]:bg-transparent data-[state=open]:text-white data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent",
                  inService && "text-white"
                )}
              >
                Services
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[640px] grid-cols-2 gap-px bg-line p-px">
                  {serviceLines.map((s) => (
                    <li key={s.slug} className="bg-white">
                      <NavigationMenuLink asChild className="rounded-none p-5 hover:bg-paper focus:bg-paper">
                        <Link href={`/${s.slug}`}>
                          <span className="code !text-[0.625rem] text-signal">{s.codes.slice(0, 3).join(" · ")}</span>
                          <span className="mt-1 text-[1.0625rem] font-semibold text-text" style={{ fontFamily: "var(--font-display)" }}>{s.name}</span>
                          <span className="mt-1 text-[0.8125rem] leading-snug text-muted">{s.short}</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            {company.map((item) => {
              const current = pathname.startsWith(item.href);
              return (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild className="rounded-none p-0 hover:bg-transparent focus:bg-transparent">
                    <Link href={item.href} aria-current={current ? "page" : undefined} className={cn(linkCls, current && "text-white")}>
                      {item.label}
                      {current && <span className="absolute inset-x-3 -bottom-[12px] h-[2px] bg-signal" />}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              );
            })}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-2 xl:ml-0">
          <Button
            variant="ghost-dark"
            onClick={openPalette}
            className="hidden h-10 gap-5 border-white/20 px-3 text-[0.8125rem] font-normal text-white/80 md:inline-flex"
            aria-label="Find a service"
          >
            <Search className="size-3.5" aria-hidden /> Find a service
            <Kbd className="bg-white/15 text-white">⌘K</Kbd>
          </Button>
          <Button asChild variant="light" className="hidden h-10 px-4 text-[0.875rem] font-semibold sm:inline-flex">
            <Link href="/contact">Request a quote</Link>
          </Button>

          {/* 21st.dev · shadcn/ui Sheet */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon-lg" className="text-white hover:bg-white/10 hover:text-white xl:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full border-line-dark bg-ink text-white sm:max-w-md [&>button]:text-white">
              <SheetHeader className="px-6 pt-6">
                <SheetTitle className="text-white"><Logo variant="lockup" tone="white" className="h-[28px]" /></SheetTitle>
                <SheetDescription className="text-white/60">Inspection, certification and testing.</SheetDescription>
              </SheetHeader>
              <nav aria-label="Mobile" className="overflow-y-auto px-6 pb-8">
                <ul>
                  {nav.map((item) => (
                    <li key={item.href} className="border-b border-white/10">
                      <Link href={item.href} className="display flex items-center justify-between py-4 text-[1.5rem]">
                        {item.label}
                        <ArrowRight className="size-4 text-sky" aria-hidden />
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 grid gap-3">
                  <Button asChild variant="light" size="xl"><Link href="/contact">Request a quote</Link></Button>
                  <Button variant="ghost-dark" size="xl" onClick={() => { setOpen(false); openPalette(); }}>Find a service</Button>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
