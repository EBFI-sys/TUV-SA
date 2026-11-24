// Metric draft marks as painted on a ship's hull: numerals 10 cm high, every 20 cm,
// with the full-metre mark carrying "M". The waterline drifts slowly.
export default function DraftMarks({ className = "" }: { className?: string }) {
  const marks: { y: number; text: string }[] = [];
  // from 12.0 m (top) down to 6.0 m, every 0.2 m; 1 m = 100 units
  for (let cm = 1200; cm >= 600; cm -= 20) {
    const y = (1200 - cm) * 1.0;
    const m = Math.floor(cm / 100);
    const dec = (cm % 100) / 10; // 0,2,4,6,8
    marks.push({ y, text: dec === 0 ? `${m}M` : String(dec) });
  }
  return (
    <svg viewBox="-20 -20 180 660" className={className} role="img" aria-label="Metric draft marks on a hull, 6 to 12 metres">
      <defs>
        <linearGradient id="dm-water" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#4f8de0" stopOpacity="0.35" />
          <stop offset="1" stopColor="#4f8de0" stopOpacity="0" />
        </linearGradient>
        <clipPath id="dm-clip"><rect x="-20" y="-20" width="180" height="660" /></clipPath>
      </defs>
      <line x1="0" y1="-20" x2="0" y2="640" stroke="#8fbfff" strokeOpacity="0.25" />
      {marks.map((mk) => (
        <g key={mk.y} transform={`translate(10 ${mk.y})`}>
          <line x1="-10" y1="0" x2="-2" y2="0" stroke="#8fbfff" strokeOpacity="0.5" />
          <text
            x="2"
            y="0"
            dominantBaseline="hanging"
            fill="#ffffff"
            fillOpacity={mk.text.endsWith("M") ? 0.95 : 0.6}
            style={{ fontFamily: "var(--font-display)", fontStretch: "100%", fontWeight: 700, fontSize: 18 }}
          >
            {mk.text}
          </text>
        </g>
      ))}
      <g clipPath="url(#dm-clip)">
        <g className="draft-water">
          <path d="M-20 372 Q 25 364 70 372 T 160 372 V 660 H -20 Z" fill="url(#dm-water)" />
          <path d="M-20 372 Q 25 364 70 372 T 160 372" fill="none" stroke="#8fbfff" strokeWidth="1.5" />
        </g>
      </g>
      <text x="150" y="380" textAnchor="end" fill="#8fbfff" style={{ fontFamily: "var(--font-jbmono)", fontSize: 10 }}>
        8.28 m
      </text>
      <style>{`
        .draft-water { animation: dm-swell 7s ease-in-out infinite; }
        @keyframes dm-swell { 0%,100% { transform: translateY(0) } 50% { transform: translateY(-9px) } }
      `}</style>
    </svg>
  );
}
