// Launch content. Moves to Sanity once the Studio schemas are live.

const CDN = "https://cdn.sanity.io/images/lfctwwh9/production/";
export const photos = {
  inspection: { src: CDN + "e94779f9cac4bd95ef526d958e31bc763c3593a9-1536x1024.jpg", w: 1536, h: 1024, alt: "Inspector measuring the flange of a pressure vessel in a fabrication shop" },
  marine: { src: CDN + "ee05ffe81d3ef9d02fa6eb853ba1a266d26f02f9-1536x1024.jpg", w: 1536, h: 1024, alt: "Draft marks on the hull of a bulk carrier at the waterline, surveyor on the quay" },
  certification: { src: CDN + "ab4be672878c47dbaec870c440e8990f68f2efe0-1536x1024.jpg", w: 1536, h: 1024, alt: "Auditors reviewing procedures in a plant quality office" },
  testing: { src: CDN + "a315f0e5fad975e7a45e66e325ba480ce1edd9b7-1536x1024.jpg", w: 1536, h: 1024, alt: "Ultrasonic testing probe on a pipe weld, flaw detector in the background" },
  port: { src: CDN + "8897d0b649b97b4ee77d449119ba4cf45f163f77-1536x864.jpg", w: 1536, h: 864, alt: "Industrial port at blue hour with a bulk carrier alongside the berth" },
} as const;
export type PhotoKey = keyof typeof photos;

export type SubService = { name: string; summary: string; checks: string[]; codes: string[] };
export type ServiceLine = {
  slug: string;
  name: string;
  navLabel: string;
  short: string;
  lead: string;
  photo: PhotoKey;
  codes: string[];
  facts: [string, string][];
  cta: string;
  fields: { label: string; placeholder: string; name: string }[];
  subs: SubService[];
};

export const serviceLines: ServiceLine[] = [
  {
    slug: "inspection",
    name: "Inspection",
    navLabel: "Inspection",
    short: "At the supplier's plant, before you pay or ship.",
    lead: "Independent inspectors witness manufacturing, testing and loading against your specification, inspection and test plan and purchase order, and audit suppliers before you place the order.",
    photo: "inspection",
    codes: ["PRODUCTION", "FAT", "PSI", "NDT"],
    facts: [
      ["Works to", "Your ITP, purchase order and code: ASME, API, EN, ISO"],
      ["Where", "Vendor shops worldwide"],
      ["Deliverable", "Photo-documented report in one format"],
    ],
    cta: "Plan an inspection",
    fields: [
      { label: "Equipment or product", placeholder: "e.g. Pressure vessel, 2 units", name: "scope" },
      { label: "Plant location", placeholder: "City, country", name: "location" },
      { label: "Inspection date", placeholder: "Expected week", name: "date" },
    ],
    subs: [
      { name: "Third-party and second-party inspection", summary: "Inspection of equipment and materials at the manufacturer, at every hold and witness point agreed in your ITP, from the first heat of steel to the loaded truck.", checks: ["Pre-inspection meeting and document review", "Incoming control inspection of raw materials and bought-out items", "Review of material certificates (EN 10204 3.1 / 3.2)", "In-process inspection during production", "NDT witness and review of NDT reports", "Dimensional and visual checks", "Witnessing of pressure, performance and functional tests", "Final inspection and pre-shipment inspection", "Release note or non-conformance report"], codes: ["ASME VIII", "API 6D", "EN 13445", "EN 10204", "ISO 9712"] },
      { name: "FAT witnessing and surveillance", summary: "Factory acceptance tests witnessed on your behalf, and periodic surveillance visits through manufacturing.", checks: ["Test procedure and set-up review", "Witnessing of test runs and recorded values", "Punch list and open-point follow-up", "FAT report with test records attached"], codes: ["IEC 60034", "API 610", "API 617"] },
      { name: "Pre-shipment inspection", summary: "Quantity, quality, marking and packing checked before goods leave the supplier.", checks: ["Quantity count against packing list", "Sampling inspection to AQL", "Marking, labelling and packing", "Photo record of each lot"], codes: ["ISO 2859-1", "AQL"] },
      { name: "Loading supervision", summary: "Stowage, lashing and loading onto truck, container or vessel supervised and recorded.", checks: ["Condition of cargo before loading", "Container or hold condition", "Lashing and securing", "Seal numbers and loading tally"], codes: ["CTU Code", "CSS Code"] },
      { name: "Expediting", summary: "Manufacturing progress tracked against schedule, with delays flagged early.", checks: ["Sub-order and material status", "Progress against the baseline schedule", "Critical-path items and recovery actions", "Expediting report with photos"], codes: ["Schedule", "Progress"] },
      { name: "Welding, coating and NDT inspection", summary: "Qualification records, weld quality and coating systems inspected to the project specification.", checks: ["WPS, PQR and welder qualification review", "Visual weld inspection and NDT review", "Surface preparation and DFT measurement", "Coating holiday testing"], codes: ["ISO 15614", "ISO 9606", "ISO 8501", "NORSOK M-501"] },
      { name: "Pressure and lifting equipment", summary: "Inspection of pressure equipment and lifting appliances in manufacture and in service.", checks: ["Design and documentation review", "Hydrostatic and pneumatic tests", "Load tests and safe working load verification", "Inspection report and marking"], codes: ["PED 2014/68/EU", "ASME", "EN 13001"] },
      { name: "Vendor assessment", summary: "Capability and quality-system assessment of new or existing suppliers before you place the order.", checks: ["Production capacity and equipment", "Quality management and traceability", "Qualified personnel and procedures", "Assessment report with supplier rating"], codes: ["ISO 9001", "ISO 3834", "ISO 19011"] },
      { name: "Technical audit", summary: "Independent technical audit of a plant, a project or a production process against the contract, the code and good engineering practice.", checks: ["Process and procedure audit on site", "Compliance with specification and code", "Equipment, calibration and records", "Audit report with findings and corrective actions"], codes: ["ISO 19011", "ISO 9001", "ASME", "EN"] },
      { name: "Food quality inspection", summary: "Quality, quantity, labelling and packing of food products and agricultural commodities, checked at the producer or before shipment.", checks: ["Sampling to AQL or contract", "Sensory, visual and physical checks", "Labelling, packing and shelf-life marking", "Witness of laboratory sampling and seals"], codes: ["ISO 2859-1", "Codex Alimentarius", "FSSAI"] },
      { name: "Food quality audit", summary: "Second-party audit of food producers and suppliers against food safety and quality requirements.", checks: ["HACCP plan and prerequisite programmes", "Hygiene, pest control and traceability", "Supplier and raw material controls", "Audit report with graded findings"], codes: ["HACCP", "ISO 22000", "FSSC 22000", "BRCGS", "IFS Food"] },
    ],
  },
  {
    slug: "marine-survey",
    name: "Marine Survey",
    navLabel: "Marine Survey",
    short: "In port, on board, at every handover.",
    lead: "Condition, quantity and damage surveys for shipowners, charterers, traders, P&I clubs and underwriters, reported in one neutral format whichever side instructed us.",
    photo: "marine",
    codes: ["ON/OFF-HIRE", "DRAFT", "BUNKER", "P&I"],
    facts: [
      ["Instructed by", "Owners, charterers, traders, P&I clubs, underwriters"],
      ["Where", "Indian ports and worldwide"],
      ["Not offered", "Class and flag-state surveys"],
    ],
    cta: "Book a surveyor",
    fields: [
      { label: "Vessel name or IMO", placeholder: "e.g. IMO 9XXXXXX", name: "vessel" },
      { label: "Port", placeholder: "Port and terminal", name: "location" },
      { label: "ETA", placeholder: "Expected arrival", name: "date" },
    ],
    subs: [
      { name: "On-hire and off-hire", summary: "Bunkers on board and the vessel's condition at delivery and redelivery under the charter party.", checks: ["Bunker soundings and calculations", "Hull, hatch and hold condition", "Deck equipment and cranes", "Joint report for owners and charterers"], codes: ["Charter party", "ROB"] },
      { name: "Bunker survey", summary: "Quantity of fuel delivered or remaining on board, by soundings, temperatures and tank tables.", checks: ["Barge and vessel tank soundings", "Temperature and density corrections", "Sampling witness", "Bunker quantity report"], codes: ["ISO 8217", "ROB", "BDN"] },
      { name: "Draft survey", summary: "Cargo weight loaded or discharged, from draft readings, density and the vessel's hydrostatic tables.", checks: ["Initial and final draft readings", "Dock water density", "Ballast and fresh water soundings", "Displacement and cargo calculation"], codes: ["UN/ECE", "Hydrostatics"] },
      { name: "Cargo, lashing and heavy-lift", summary: "Condition, stowage and securing of general, project and heavy-lift cargo at loading and discharge.", checks: ["Pre-loading condition", "Stowage plan and sea-fastening", "Lashing calculations review", "Discharge condition and exceptions"], codes: ["CSS Code", "IMO"] },
      { name: "Damage survey", summary: "Cause, nature and extent of damage to cargo, hull or machinery, for owners, P&I clubs and underwriters.", checks: ["Attendance and evidence record", "Cause and extent assessment", "Repair or salvage recommendations", "Survey report for the claim"], codes: ["P&I", "H&M", "Cargo"] },
      { name: "Hatch cover ultrasonic test", summary: "Ultrasonic weathertightness test of hatch covers before loading water-sensitive cargo.", checks: ["Seal and compression bar condition", "Ultrasonic leak detection", "Defect marking and re-test", "Test certificate"], codes: ["IACS", "Ultrasonic"] },
      { name: "Condition and pre-purchase", summary: "The vessel's general condition and maintenance state, for buyers, financiers and charterers.", checks: ["Hull, machinery and accommodation", "Records and certificates review", "Maintenance and defect list", "Condition report with photos"], codes: ["Condition", "SIRE-ready"] },
      { name: "Container survey", summary: "Container condition, stuffing and stripping, seal checks and cargo damage in containers.", checks: ["Container structural condition", "Stuffing and securing", "Seal verification", "Damage record"], codes: ["IICL", "CTU Code"] },
    ],
  },
  {
    slug: "certification",
    name: "Certification",
    navLabel: "Certification",
    short: "Certificates your customers and regulators accept.",
    lead: "Management system certification and EU conformity assessment, issued by the accredited bodies of the TÜV Thüringen Group.",
    photo: "certification",
    codes: ["ISO", "CE", "PED", "ISO 14064"],
    facts: [
      ["Issued by", "The accredited TÜV Thüringen Group body named on the certificate"],
      ["Audit language", "English"],
      ["Transfers", "Existing certificates can be transferred"],
    ],
    cta: "Request a certification quote",
    fields: [
      { label: "Standard or directive", placeholder: "e.g. ISO 9001, PED", name: "scope" },
      { label: "Sites and headcount", placeholder: "e.g. 1 site, 120 people", name: "sites" },
      { label: "Location", placeholder: "City, country", name: "location" },
    ],
    subs: [
      { name: "ISO 9001, ISO 14001, ISO 45001", summary: "Quality, environmental and occupational health and safety management systems.", checks: ["Stage 1 documentation review", "Stage 2 certification audit", "Annual surveillance audits", "Recertification every three years"], codes: ["ISO 9001", "ISO 14001", "ISO 45001"] },
      { name: "ISO/IEC 27001 and ISO 50001", summary: "Information security and energy management systems.", checks: ["Scope and statement of applicability", "Risk treatment and controls", "Energy review and performance indicators", "Certification and surveillance audits"], codes: ["ISO/IEC 27001", "ISO 50001"] },
      { name: "Certificate transfer", summary: "Move an existing accredited certificate to the TÜV Thüringen Group without restarting the cycle.", checks: ["Pre-transfer review", "Open findings check", "Certificate issued on the current cycle"], codes: ["IAF MD 2"] },
      { name: "CE marking and PED 2014/68/EU", summary: "Conformity assessment for pressure equipment and machinery placed on the EU market.", checks: ["Design examination", "Module selection and assessment", "Final assessment and marking", "EU certificates by the notified body"], codes: ["PED 2014/68/EU", "2006/42/EC", "(EU) 2023/1230"] },
      { name: "EN 1090 and ISO 3834", summary: "Factory production control for structural steel and welding quality requirements.", checks: ["Welding coordination", "Procedure and welder qualification", "Factory production control audit", "Certificate of conformity"], codes: ["EN 1090-1", "ISO 3834-2", "CPR 305/2011"] },
      { name: "GHG verification and CBAM data", summary: "Verification of greenhouse gas statements and embedded-emissions data for EU CBAM reporting.", checks: ["Boundary and methodology review", "Data sampling and recalculation", "Verification statement"], codes: ["ISO 14064-3", "CBAM"] },
    ],
  },
  {
    slug: "testing",
    name: "Testing & Technical Services",
    navLabel: "Testing & Technical Services",
    short: "Products, machinery and materials, tested to the standard.",
    lead: "Testing and conformity work for equipment and products entering regulated markets, from material samples to complete installations.",
    photo: "testing",
    codes: ["NDT", "GS", "EN 1090", "ASME"],
    facts: [
      ["Covers", "Materials, products, machinery and installations"],
      ["Marks", "GS mark and TÜV Thüringen test mark"],
      ["Where", "In the plant, on site or in the laboratory"],
    ],
    cta: "Request a test",
    fields: [
      { label: "Product or equipment", placeholder: "e.g. Passenger lift, 12 stops", name: "scope" },
      { label: "Location", placeholder: "City, country", name: "location" },
      { label: "Target market", placeholder: "e.g. EU, India", name: "market" },
    ],
    subs: [
      { name: "NDT and material testing", summary: "Non-destructive and destructive testing of welds, castings and materials.", checks: ["UT, RT, MT, PT and VT", "Hardness and positive material identification", "Mechanical tests on samples", "Test reports by qualified personnel"], codes: ["ISO 9712", "ASME V", "EN ISO 17640"] },
      { name: "Product testing and GS mark", summary: "Safety and quality testing of electrical goods, consumer products, furniture and toys.", checks: ["Testing to product standards", "Factory inspection", "GS mark or TÜV Thüringen test mark", "Surveillance of production"], codes: ["ProdSG", "EN 71", "IEC 60335"] },
      { name: "Machinery and CE conformity", summary: "Risk assessment and conformity of machines for the EU market.", checks: ["Risk assessment review", "Technical file review", "Functional safety checks", "Conformity statement"], codes: ["2006/42/EC", "(EU) 2023/1230", "ISO 12100"] },
      { name: "Pressure equipment: PED, ASME, TPED", summary: "Design review, manufacturing inspection and testing of pressure and transportable pressure equipment.", checks: ["Design calculations review", "Material and welding control", "Pressure testing", "Notified-body certificates"], codes: ["PED 2014/68/EU", "TPED 2010/35/EU", "ASME"] },
      { name: "Lifts and cableways", summary: "Conformity assessment and inspection of lifts, safety components and cableway installations.", checks: ["Type examination", "Installation inspection", "Safety component checks", "Periodic inspection"], codes: ["2014/33/EU", "(EU) 2016/424", "EN 81-20"] },
      { name: "Amusement rides", summary: "Design review and inspection of rides and amusement devices.", checks: ["Design and calculation review", "Commissioning inspection", "Periodic inspection"], codes: ["EN 13814"] },
      { name: "EN 1090, ISO 3834 and welder qualification", summary: "Welding procedure and welder qualification tests and certificates.", checks: ["Welding procedure qualification", "Welder and operator tests", "Certificates of qualification"], codes: ["ISO 9606-1", "ISO 15614-1", "ISO 14732"] },
      { name: "Product carbon footprint", summary: "Verification of product carbon footprints for customers and EU reporting.", checks: ["Life-cycle boundary review", "Data quality checks", "Verification statement"], codes: ["ISO 14067", "GHG Protocol"] },
    ],
  },
];

export const serviceBySlug = (slug: string) => serviceLines.find((s) => s.slug === slug);

export const nav = [
  { label: "Inspection", href: "/inspection" },
  { label: "Marine Survey", href: "/marine-survey" },
  { label: "Certification", href: "/certification" },
  { label: "Testing & Technical Services", href: "/testing" },
  { label: "Industries", href: "/industries" },
  { label: "About", href: "/about" },
  { label: "Insights", href: "/insights" },
];

export const accreditations = [
  {
    id: "NB 0090",
    kind: "Notified Body",
    holder: "TÜV Thüringen e.V.",
    scope: [
      "Pressure Equipment 2014/68/EU",
      "Simple Pressure Vessels 2014/29/EU",
      "Transportable Pressure Equipment 2010/35/EU",
      "Machinery 2006/42/EC and (EU) 2023/1230",
      "Lifts 2014/33/EU",
      "Cableway Installations (EU) 2016/424",
      "Construction Products (EU) 305/2011",
    ],
  },
  { id: "NB 0867", kind: "Notified Body", holder: "TÜV Thüringen Anlagentechnik GmbH & Co. KG", scope: ["Toy Safety 2009/48/EC"] },
  { id: "D-ZM-16006-05-01", kind: "DAkkS · ISO/IEC 17021-1", holder: "TÜV Thüringen e.V., certification body", scope: ["Management system certification", "ISO 9001, 14001, 45001, 27001, 50001"] },
];

export const industries = [
  { name: "Oil and gas", text: "Rotating and static equipment, pipe, valves and structures for upstream and downstream projects.", services: ["inspection", "testing"] },
  { name: "Power generation", text: "Boilers, turbines, transformers and balance-of-plant equipment from vendor shop to site.", services: ["inspection", "testing"] },
  { name: "Shipping and ports", text: "Vessels, cargo and port equipment, from bunker quantity to crane load tests.", services: ["marine-survey", "inspection"] },
  { name: "Steel and fabrication", text: "Structural steel, welded assemblies and coatings to EN 1090, ISO 3834 and project specifications.", services: ["inspection", "certification"] },
  { name: "Chemicals and process", text: "Pressure vessels, heat exchangers and piping for chemical and petrochemical plants.", services: ["inspection", "testing"] },
  { name: "Machinery and equipment", text: "Machines and assemblies for CE marking and export to the European Union.", services: ["certification", "testing"] },
  { name: "Food and agriculture", text: "Food products, ingredients and agricultural commodities: supplier audits, quality inspection and pre-shipment checks.", services: ["inspection", "marine-survey"] },
  { name: "Consumer products", text: "Electrical goods, furniture and toys tested for safety and quality before shipment.", services: ["testing", "inspection"] },
  { name: "Trading and commodities", text: "Quantity and quality of bulk and bagged cargo at loading and discharge.", services: ["marine-survey", "inspection"] },
];

// Coverage regions (globe + accordion)
export const locations = [
  { name: "Navi Mumbai", region: "India", note: "Headquarters. Inspectors and surveyors across Indian ports and industrial corridors.", lat: 19.033, lon: 73.0297, tz: "Asia/Kolkata", kind: "hq" as const },
  { name: "Erfurt", region: "Germany", note: "TÜV Thüringen Group headquarters.", lat: 50.9787, lon: 11.0328, tz: "Europe/Berlin", kind: "group" as const },
  { name: "Katowice · Budapest · Bucharest", region: "Central and Eastern Europe", note: "Group companies in Poland, Slovakia, Hungary, Romania, Lithuania, Bosnia-Herzegovina and Ukraine.", lat: 47.5, lon: 19.04, tz: "Europe/Budapest", kind: "region" as const },
  { name: "Collecchio · Oberentfelden", region: "Italy and Switzerland", note: "Group companies in Italy and Switzerland.", lat: 47.36, lon: 8.05, tz: "Europe/Zurich", kind: "region" as const },
  { name: "Shanghai", region: "China", note: "Supplier inspection and expediting.", lat: 31.23, lon: 121.47, tz: "Asia/Shanghai", kind: "region" as const },
  { name: "Astana", region: "Kazakhstan", note: "Inspection for energy and infrastructure projects.", lat: 51.17, lon: 71.45, tz: "Asia/Almaty", kind: "region" as const },
];

// Every TÜV Thüringen Group office shown in the local-time ticker and on the globe
export const offices = [
  { city: "Navi Mumbai", country: "India", lat: 19.033, lon: 73.0297, tz: "Asia/Kolkata", hq: true },
  { city: "Erfurt", country: "Germany", lat: 50.9787, lon: 11.0328, tz: "Europe/Berlin" },
  { city: "Shanghai", country: "China", lat: 31.23, lon: 121.47, tz: "Asia/Shanghai" },
  { city: "Astana", country: "Kazakhstan", lat: 51.17, lon: 71.45, tz: "Asia/Almaty" },
  { city: "Katowice", country: "Poland", lat: 50.264, lon: 19.024, tz: "Europe/Warsaw" },
  { city: "Nitra", country: "Slovakia", lat: 48.307, lon: 18.087, tz: "Europe/Bratislava" },
  { city: "Budapest", country: "Hungary", lat: 47.498, lon: 19.04, tz: "Europe/Budapest" },
  { city: "Bucharest", country: "Romania", lat: 44.426, lon: 26.102, tz: "Europe/Bucharest" },
  { city: "Kaunas", country: "Lithuania", lat: 54.898, lon: 23.904, tz: "Europe/Vilnius" },
  { city: "Kyiv", country: "Ukraine", lat: 50.45, lon: 30.523, tz: "Europe/Kiev" },
  { city: "Sarajevo", country: "Bosnia-Herzegovina", lat: 43.856, lon: 18.413, tz: "Europe/Sarajevo" },
  { city: "Collecchio", country: "Italy", lat: 44.75, lon: 10.217, tz: "Europe/Rome" },
  { city: "Oberentfelden", country: "Switzerland", lat: 47.357, lon: 8.046, tz: "Europe/Zurich" },
];

// Extra codes for the running standards strip (beyond those listed per service)
export const extraStandards = [
  "DNV-ST-N001", "DNV-OS-C101", "API RP 2A", "NORSOK N-004", "ISO 19902", "API 5L", "DNV-ST-F101",
  "ISO 12944", "ISO 8501-1", "ISO 8502-3", "ISO 19840", "AMPP SP0188", "SSPC-PA 2", "NORSOK M-501",
  "ISO 22000", "FSSC 22000", "HACCP", "BRCGS", "IFS Food", "GMP", "FSSAI", "Codex Alimentarius",
  "ISO 3834", "EN 1090", "ASME IX", "AWS D1.1", "ISO 17025", "ISO 19011",
];

export const workflow = [
  { title: "Request", text: "Send the scope: what, where, when, and the documents to work to." },
  { title: "Confirm", text: "We confirm the inspector or surveyor, the date and the fee in writing." },
  { title: "Attend", text: "On site or on board, to your ITP or survey instructions." },
  { title: "Report", text: "A photo-documented report in one standard format." },
];

export const company = {
  legalName: "TUV THURINGEN SOUTHASIA PRIVATE LIMITED",
  cin: "U71200MR2026FTC482970",
  incorporated: "23 November 2026",
  address: "Office 604, One Platinum, Plot 8, Sector 15, Navi Mumbai 400614, Maharashtra, India",
  email: "office@tuv-tsa.com",
};
