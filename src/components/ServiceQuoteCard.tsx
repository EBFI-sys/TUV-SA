import { Arrow } from "@/components/ui";

// Plain GET form: carries the answers into the full quote request at /contact.
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
    <form action="/contact" method="get" className="border border-line bg-paper p-6">
      <input type="hidden" name="service" value={service} />
      <p className="code !text-[0.6875rem] uppercase text-signal">{title}</p>
      <p className="mt-2 text-[0.9375rem] leading-snug">Send the scope. We confirm the specialist, the date and the fee.</p>
      <div className="mt-6 space-y-4">
        {fields.map((f) => (
          <div key={f.name}>
            <label htmlFor={`qc-${f.name}`} className="label text-muted">{f.label}</label>
            <input id={`qc-${f.name}`} name={f.name} placeholder={f.placeholder} className="field" />
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary mt-6 w-full justify-center">Request a quote <Arrow /></button>
    </form>
  );
}
