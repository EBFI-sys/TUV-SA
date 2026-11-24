// Launch content. Moves to Sanity once the Studio schemas are live.

export type ServiceLine = {
  slug: string;
  name: string;
  short: string;
  lead: string;
  items: string[];
};

export const serviceLines: ServiceLine[] = [
  {
    slug: "inspection",
    name: "Inspection",
    short: "At the supplier's plant, before you pay or ship.",
    lead:
      "Independent inspectors witness manufacturing, testing and loading against your specification, inspection and test plan and purchase order.",
    items: [
      "Third-party and vendor inspection",
      "FAT witnessing and surveillance",
      "Pre-shipment inspection",
      "Loading supervision",
      "Expediting",
      "Welding, coating and NDT inspection",
      "Pressure and lifting equipment",
      "Vendor assessment and technical audits",
    ],
  },
  {
    slug: "marine-survey",
    name: "Marine Survey",
    short: "In port, on board, at every handover.",
    lead:
      "Condition, quantity and damage surveys for owners, charterers, traders and their insurers, reported in one neutral format.",
    items: [
      "On-hire and off-hire",
      "Condition and pre-purchase",
      "Bunker survey",
      "Draft survey",
      "Cargo, lashing and heavy-lift",
      "Damage: cargo, hull and machinery",
      "Hatch cover ultrasonic test",
      "Container survey",
    ],
  },
  {
    slug: "certification",
    name: "Certification",
    short: "Certificates your customers and regulators accept.",
    lead:
      "Management system certification and EU conformity assessment, issued by the accredited bodies of the TÜV Thüringen Group.",
    items: [
      "ISO 9001, ISO 14001, ISO 45001",
      "ISO/IEC 27001, ISO 50001",
      "Certificate transfer",
      "CE marking and PED 2014/68/EU",
      "EN 1090 and ISO 3834",
      "GHG verification (ISO 14064) and CBAM data",
    ],
  },
  {
    slug: "testing",
    name: "Testing & Technical Services",
    short: "Products, machinery and materials, tested to the standard.",
    lead:
      "Testing and conformity work for equipment and products entering regulated markets, from material samples to complete installations.",
    items: [
      "NDT and material testing",
      "Product testing and GS mark",
      "Machinery and CE conformity",
      "Pressure equipment: PED, ASME, TPED",
      "Lifts and cableways",
      "Amusement rides",
      "EN 1090, ISO 3834 and welder qualification",
      "Product carbon footprint",
    ],
  },
];

export const nav = [
  { label: "Inspection", href: "/inspection" },
  { label: "Marine Survey", href: "/marine-survey" },
  { label: "Certification", href: "/certification" },
  { label: "Testing & Technical Services", href: "/testing" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export const marineSurveys = [
  { code: "ONH", name: "On-hire / off-hire", detail: "Bunkers on board and vessel condition at delivery and redelivery under the charter party." },
  { code: "BNK", name: "Bunker survey", detail: "Quantity of fuel delivered or remaining on board, by soundings, temperatures and tank tables." },
  { code: "DFT", name: "Draft survey", detail: "Cargo weight loaded or discharged, from draft readings, density and the vessel's hydrostatic tables." },
  { code: "CRG", name: "Cargo and lashing", detail: "Condition, stowage and securing of general, project and heavy-lift cargo at loading and discharge." },
  { code: "DMG", name: "Damage survey", detail: "Cause, nature and extent of damage to cargo, hull or machinery, for owners, P&I clubs and underwriters." },
  { code: "HCT", name: "Hatch cover test", detail: "Ultrasonic weathertightness test of hatch covers before loading water-sensitive cargo." },
  { code: "CPP", name: "Condition and pre-purchase", detail: "The vessel's general condition and maintenance state, for buyers, financiers and charterers." },
  { code: "CTR", name: "Container survey", detail: "Container condition, stuffing and stripping, seal checks and cargo damage in containers." },
];

export const workflow = [
  { title: "Request", text: "Send the scope: what to inspect or survey, where, when, and the documents to work to." },
  { title: "Confirm", text: "We confirm the inspector or surveyor, the attendance date and the fee in writing." },
  { title: "Attend", text: "On site or on board, to your inspection and test plan or survey instructions." },
  { title: "Report", text: "A photo-documented report in one standard format, in your inbox and on file." },
];

export const accreditations = [
  {
    holder: "TÜV Thüringen e.V.",
    id: "Notified Body 0090",
    scope: [
      "Pressure Equipment Directive 2014/68/EU",
      "Simple Pressure Vessels Directive 2014/29/EU",
      "Transportable Pressure Equipment Directive 2010/35/EU",
      "Machinery Directive 2006/42/EC and Regulation (EU) 2023/1230",
      "Lifts Directive 2014/33/EU",
      "Cableway Installations Regulation (EU) 2016/424",
      "Construction Products Regulation (EU) 305/2011",
    ],
  },
  {
    holder: "TÜV Thüringen Anlagentechnik GmbH & Co. KG",
    id: "Notified Body 0867",
    scope: ["Toy Safety Directive 2009/48/EC"],
  },
  {
    holder: "TÜV Thüringen e.V., certification body",
    id: "DAkkS D-ZM-16006-05-01",
    scope: ["ISO/IEC 17021-1 management system certification"],
  },
];

export const industries = [
  { name: "Oil and gas", text: "Rotating and static equipment, pipe, valves and structures for upstream and downstream projects." },
  { name: "Power generation", text: "Boilers, turbines, transformers and balance-of-plant equipment from vendor shop to site." },
  { name: "Shipping and ports", text: "Vessels, cargo and port equipment, from bunker quantity to crane load tests." },
  { name: "Steel and fabrication", text: "Structural steel, welded assemblies and coatings to EN 1090, ISO 3834 and project specifications." },
  { name: "Chemicals and process", text: "Pressure vessels, heat exchangers and piping for chemical and petrochemical plants." },
  { name: "Machinery and equipment", text: "Machines and assemblies for CE marking and export to the European Union." },
  { name: "Consumer products", text: "Electrical goods, furniture and toys tested for safety and quality before shipment." },
  { name: "Infrastructure", text: "Lifts, cableways, bridges and construction products on public projects." },
];

export const locations = [
  { name: "Navi Mumbai", note: "Headquarters, TUV Thuringen SouthAsia", lat: 19.033, lon: 73.0297, kind: "hq" as const },
  { name: "Erfurt", note: "TÜV Thüringen Group headquarters", lat: 50.9787, lon: 11.0328, kind: "group" as const },
  { name: "Europe", note: "Group companies across the continent", lat: 41.9, lon: 12.5, kind: "region" as const },
  { name: "United States", note: "Inspection and survey coverage", lat: 29.76, lon: -95.37, kind: "region" as const },
  { name: "China", note: "Shanghai", lat: 31.23, lon: 121.47, kind: "region" as const },
  { name: "Kazakhstan", note: "Astana", lat: 51.17, lon: 71.45, kind: "region" as const },
];

export const company = {
  legalName: "TUV THURINGEN SOUTHASIA PRIVATE LIMITED",
  cin: "U71200MR2026FTC482970",
  address: "Office 604, One Platinum, Plot 8, Sector 15, Navi Mumbai 400614, Maharashtra, India",
};
