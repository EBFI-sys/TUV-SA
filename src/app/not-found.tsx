import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="bg-ink text-white">
      <div className="container-x flex min-h-[70vh] flex-col justify-center pb-20 pt-40">
        <p className="code text-sky">404</p>
        <h1 className="display mt-6 max-w-2xl text-[2.5rem] md:text-[3.5rem]">This page is being prepared.</h1>
        <p className="mt-6 max-w-lg text-[1.0625rem] leading-relaxed text-white/65">
          The full site is being built section by section. The home page lists every service line in the meantime.
        </p>
        <Button asChild variant="light" size="xl" className="mt-10 self-start"><Link href="/">Back to the home page</Link></Button>
      </div>
    </section>
  );
}
