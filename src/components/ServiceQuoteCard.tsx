import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// Plain GET form: carries the answers into the full quote request at /contact.
// 21st.dev · shadcn/ui Card, Input, Label, Button
export default function ServiceQuoteCard({
  service,
  title,
  fields,
}: {
  service: string;
  title: string;
  fields: { label: string; placeholder: string; name: string }[];
}) {
  return (
    <Card className="gap-0 rounded-md border-line bg-paper py-0 shadow-none">
      <form action="/contact" method="get">
        <input type="hidden" name="service" value={service} />
        <CardHeader className="gap-0 p-6 pb-0">
          <CardTitle className="code !text-[0.6875rem] font-normal uppercase text-signal">{title}</CardTitle>
          <CardDescription className="mt-2 text-[0.9375rem] leading-snug text-text">Send the scope. We confirm the specialist, the date and the fee.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 p-6">
          {fields.map((f) => (
            <div key={f.name}>
              <Label htmlFor={`qc-${f.name}`} className="label text-muted">{f.label}</Label>
              <Input id={`qc-${f.name}`} name={f.name} placeholder={f.placeholder} className="h-12 rounded-[2px] bg-white text-[0.9375rem]" />
            </div>
          ))}
        </CardContent>
        <CardFooter className="p-6 pt-0">
          <Button type="submit" size="xl" className="w-full">Request a quote <ArrowRight /></Button>
        </CardFooter>
      </form>
    </Card>
  );
}
