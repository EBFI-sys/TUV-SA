"use client";

import dynamic from "next/dynamic";

const Globe = dynamic(() => import("./Globe"), {
  ssr: false,
  loading: () => <div className="absolute inset-0" />,
});

export default function GlobeClient({ className = "" }: { className?: string }) {
  return <Globe className={className} />;
}
