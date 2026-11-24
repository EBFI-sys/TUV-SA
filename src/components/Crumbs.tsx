import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// 21st.dev · shadcn/ui Breadcrumb on dark heroes
export default function Crumbs({ current }: { current: string }) {
  return (
    <Breadcrumb>
      <BreadcrumbList className="code gap-2 !text-[0.6875rem] uppercase text-white/60 sm:gap-2">
        <BreadcrumbItem>
          <BreadcrumbLink asChild className="hover:text-white"><Link href="/">Home</Link></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-white/40" />
        <BreadcrumbItem>
          <BreadcrumbPage className="text-white/90">{current}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
