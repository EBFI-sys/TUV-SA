export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg className={`arrow ${className}`} width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden>
      <path d="M0 5h12M8 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
