"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, BadgeCheck, FileText, Layers } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { nav, serviceLines } from "@/lib/content";

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

// 21st.dev · shadcn/ui Command (cmdk) — ⌘K service finder
export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const show = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("tsa:palette", show);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("tsa:palette", show);
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  const go = (href: string) => {
    setOpen(false);
    router.push(href);
  };

  return (
    <CommandDialog
      open={open}
      onOpenChange={setOpen}
      title="Find a service"
      description="Search services, codes and standards"
      className="top-[12vh] translate-y-0 border-line sm:max-w-xl"
    >
      <CommandInput placeholder="Draft survey, PED, FAT, ISO 9001…" />
      <CommandList className="max-h-[55vh]">
        <CommandEmpty>Nothing matches. Try a code such as PED or ISO 9001, or request a quote and describe the work.</CommandEmpty>
        <CommandGroup heading="Service lines">
          {serviceLines.map((s) => (
            <CommandItem key={s.slug} value={`${s.name} ${s.short} ${s.codes.join(" ")}`} onSelect={() => go(`/${s.slug}`)}>
              <Layers className="text-tuv" />
              <span className="font-medium">{s.name}</span>
              <CommandShortcut className="code">{s.subs.length} services</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
        {serviceLines.map((s) => (
          <CommandGroup key={s.slug} heading={s.name}>
            {s.subs.map((sub) => (
              <CommandItem
                key={sub.name}
                value={`${sub.name} ${sub.summary} ${sub.codes.join(" ")} ${s.name}`}
                onSelect={() => go(`/${s.slug}#${slugify(sub.name)}`)}
              >
                <ArrowRight className="text-faint" />
                <span>{sub.name}</span>
                <CommandShortcut className="code hidden sm:inline">{sub.codes.slice(0, 2).join(" · ")}</CommandShortcut>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
        <CommandSeparator />
        <CommandGroup heading="Company">
          {nav.slice(4).map((n) => (
            <CommandItem key={n.href} value={n.label} onSelect={() => go(n.href)}>
              <FileText className="text-faint" />
              {n.label}
            </CommandItem>
          ))}
          <CommandItem value="Request a quote price fee enquiry book" onSelect={() => go("/contact")}>
            <ArrowRight className="text-signal" />
            Request a quote
          </CommandItem>
          <CommandItem value="Verify a certificate register check validity" onSelect={() => go("/accreditations#verify")}>
            <BadgeCheck className="text-tuv" />
            Verify a certificate
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
