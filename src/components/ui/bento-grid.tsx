import { type ComponentPropsWithoutRef, type ReactNode } from "react"
import { ArrowRightIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface BentoGridProps extends ComponentPropsWithoutRef<"div"> {
  children: ReactNode
  className?: string
}

interface BentoCardProps extends ComponentPropsWithoutRef<"div"> {
  name: string
  className: string
  background: ReactNode
  Icon?: React.ElementType
  eyebrow?: ReactNode
  dark?: boolean
  description: string
  href: string
  cta: string
}

const BentoGrid = ({ children, className, ...props }: BentoGridProps) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
  eyebrow,
  dark = false,
  ...props
}: BentoCardProps) => (
  <div
    key={name}
    className={cn(
      "group relative isolate col-span-3 flex flex-col justify-between overflow-hidden rounded-md",
      dark ? "bg-ink text-white" : "border border-line bg-white text-text",
      // light styles
      // dark styles
      "dark:bg-background transform-gpu dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset] dark:[border:1px_solid_rgba(255,255,255,.1)]",
      className
    )}
    {...props}
  >
    <div>{background}</div>
    <div className="relative mt-auto p-6 md:p-8">
      <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 transition-all duration-300 lg:group-hover:-translate-y-10">
        {Icon && <Icon className={cn("mb-3 h-10 w-10 origin-left transform-gpu transition-all duration-300 ease-in-out group-hover:scale-75", dark ? "text-sky" : "text-tuv")} />}
        {eyebrow}
        <h3 className="display text-[1.875rem] md:text-[2.375rem]">
          {name}
        </h3>
        <p className={cn("mt-2 max-w-lg text-[0.9375rem] leading-relaxed", dark ? "text-white/75" : "text-muted")}>{description}</p>
      </div>

      <div
        className={cn(
          "pointer-events-none flex w-full translate-y-0 transform-gpu flex-row items-center transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:hidden"
        )}
      >
        <Button
          variant="link"
          asChild
          size="sm"
          className={cn("pointer-events-auto p-0 text-[0.875rem] font-semibold", dark ? "text-white" : "text-tuv")}
        >
          <a href={href}>
            {cta}
            <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
          </a>
        </Button>
      </div>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 hidden w-full translate-y-10 transform-gpu flex-row items-center px-6 pb-6 md:px-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 lg:flex"
      )}
    >
      <Button
        variant="link"
        asChild
        size="sm"
        className={cn("pointer-events-auto p-0 text-[0.875rem] font-semibold", dark ? "text-white" : "text-tuv")}
      >
        <a href={href}>
          {cta}
          <ArrowRightIcon className="ms-2 h-4 w-4 rtl:rotate-180" />
        </a>
      </Button>
    </div>

    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-tuv/[0.03]" />
  </div>
)

export { BentoCard, BentoGrid }
