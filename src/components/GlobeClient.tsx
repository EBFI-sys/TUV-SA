"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function GlobeClient({ className = "", focus }: { className?: string; focus?: number }) {
  return <Globe className={className} focus={focus} />;
}
