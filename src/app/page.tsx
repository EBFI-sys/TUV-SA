export default function Home() {
  return (
    <main className="min-h-dvh bg-ink text-white flex flex-col">
      <header className="mx-auto w-full max-w-7xl px-6 py-8 flex items-center justify-between">
        <span className="font-display text-lg font-semibold tracking-tight">TUV Thuringen SouthAsia</span>
        <span className="text-sm text-white/60">tuv-tsa.com</span>
      </header>
      <section className="mx-auto w-full max-w-7xl px-6 flex-1 flex flex-col justify-center py-24">
        <p className="text-sm uppercase tracking-[0.2em] text-white/50">Part of the TÜV Thüringen Group</p>
        <h1 className="mt-6 font-display text-5xl md:text-7xl font-semibold tracking-tight leading-[1.02] max-w-4xl">
          Inspection, certification and testing.
          <span className="block text-white/60">One TÜV partner, worldwide.</span>
        </h1>
        <p className="mt-10 text-white/60 max-w-xl">Website in development.</p>
      </section>
    </main>
  );
}
