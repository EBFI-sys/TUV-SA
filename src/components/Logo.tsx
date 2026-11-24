import { logoSvg, type LogoTone, type LogoVariant } from "@/lib/logo-svg";

export default function Logo({
  variant = "lockup",
  tone = "color",
  className = "",
}: {
  variant?: LogoVariant;
  tone?: LogoTone;
  className?: string;
}) {
  return (
    <span
      className={`block [&>svg]:block [&>svg]:h-full [&>svg]:w-auto ${className}`}
      dangerouslySetInnerHTML={{ __html: logoSvg(variant, tone) }}
    />
  );
}
