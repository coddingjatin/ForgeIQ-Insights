export const kpis = [
  { key: "documents", label: "Total Documents", value: 128463, delta: "+3.2%", accent: "primary" },
  { key: "equipment", label: "Equipment Assets", value: 4218, delta: "+0.4%", accent: "secondary" },
  { key: "links", label: "Knowledge Links", value: 512874, delta: "+8.1%", accent: "accent" },
  { key: "compliance", label: "Pending Compliance", value: 37, delta: "-12%", accent: "warning" },
  { key: "workorders", label: "Open Work Orders", value: 214, delta: "+5", accent: "primary" },
  { key: "critical", label: "Critical Assets", value: 62, delta: "3 new", accent: "danger" },
  { key: "failures", label: "Recent Failures (30d)", value: 18, delta: "-22%", accent: "success" },
  { key: "query", label: "Avg. Query Time", value: "0.42s", delta: "-8%", accent: "accent" },
] as const;

export const equipmentHealth = [
  { name: "Wk 1", pumps: 92, compressors: 88, boilers: 95, exchangers: 90 },
  { name: "Wk 2", pumps: 91, compressors: 87, boilers: 94, exchangers: 89 },
  { name: "Wk 3", pumps: 89, compressors: 85, boilers: 92, exchangers: 91 },
  { name: "Wk 4", pumps: 87, compressors: 84, boilers: 91, exchangers: 90 },
  { name: "Wk 5", pumps: 88, compressors: 86, boilers: 93, exchangers: 92 },
  { name: "Wk 6", pumps: 90, compressors: 88, boilers: 94, exchangers: 93 },
  { name: "Wk 7", pumps: 92, compressors: 89, boilers: 95, exchangers: 94 },
  { name: "Wk 8", pumps: 91, compressors: 90, boilers: 95, exchangers: 93 },
];

export const documentGrowth = [
  { month: "Jan", docs: 92000 },
  { month: "Feb", docs: 98400 },
  { month: "Mar", docs: 104200 },
  { month: "Apr", docs: 110800 },
  { month: "May", docs: 116300 },
  { month: "Jun", docs: 121500 },
  { month: "Jul", docs: 124800 },
  { month: "Aug", docs: 128463 },
];

export const failureTrend = [
  { month: "Jan", failures: 32, nearMiss: 48 },
  { month: "Feb", failures: 28, nearMiss: 42 },
  { month: "Mar", failures: 35, nearMiss: 55 },
  { month: "Apr", failures: 24, nearMiss: 38 },
  { month: "May", failures: 22, nearMiss: 41 },
  { month: "Jun", failures: 26, nearMiss: 44 },
  { month: "Jul", failures: 18, nearMiss: 33 },
  { month: "Aug", failures: 18, nearMiss: 29 },
];

export const complianceScore = [
  { area: "Factory Act", score: 96 },
  { area: "OISD", score: 88 },
  { area: "PESO", score: 92 },
  { area: "ISO 9001", score: 94 },
  { area: "ISO 14001", score: 90 },
  { area: "Environmental", score: 86 },
];

export const assetCriticality = [
  { name: "Critical", value: 62, fill: "#D9534F" },
  { name: "High", value: 184, fill: "#F4A261" },
  { name: "Medium", value: 892, fill: "#2F6BFF" },
  { name: "Low", value: 3080, fill: "#3BA99C" },
];

export const insights = [
  {
    id: 1,
    severity: "high",
    title: "Recurring seal failure detected",
    body: "Pump P-102 has recurring mechanical seal failures every 11 months across 3 cycles. RCA suggests upgrading to Type-C tandem seal.",
    tag: "Predictive",
  },
  {
    id: 2,
    severity: "medium",
    title: "Missing inspection records",
    body: "Valve V-203 has no thickness inspection logged in the last 18 months. Regulatory window closes in 21 days.",
    tag: "Compliance",
  },
  {
    id: 3,
    severity: "high",
    title: "SOP revision overdue",
    body: "SOP-SF-014 (Hot Work Permit) revision is 47 days past the 24-month cycle. 12 sites still reference the old version.",
    tag: "Governance",
  },
  {
    id: 4,
    severity: "low",
    title: "Knowledge coverage improved",
    body: "P&ID coverage for Unit-3 crossed 94% after last week's ingestion batch.",
    tag: "Coverage",
  },
];

export const assets = [
  { id: "P-102", name: "Centrifugal Pump P-102", unit: "Unit-2", type: "Rotating", health: 74, criticality: "High", failures: 3, docs: 42 },
  { id: "HX-401", name: "Shell & Tube Exchanger HX-401", unit: "Unit-4", type: "Static", health: 91, criticality: "Medium", failures: 0, docs: 18 },
  { id: "CV-220", name: "Control Valve CV-220", unit: "Unit-2", type: "Instrument", health: 82, criticality: "Medium", failures: 1, docs: 24 },
  { id: "Boiler-05", name: "Package Boiler #5", unit: "Utilities", type: "Fired", health: 88, criticality: "Critical", failures: 1, docs: 61 },
  { id: "Compressor-02", name: "Reciprocating Compressor #2", unit: "Unit-3", type: "Rotating", health: 69, criticality: "Critical", failures: 4, docs: 55 },
  { id: "Tank-T17", name: "Storage Tank T-17", unit: "Tank Farm", type: "Static", health: 95, criticality: "High", failures: 0, docs: 32 },
];

export const documents = [
  { id: "DOC-93211", name: "P-102 Mechanical Seal RCA – Aug 2025.pdf", type: "RCA", unit: "Unit-2", asset: "P-102", size: "2.4 MB", updated: "2 days ago", tags: ["RCA", "Seal", "Rotating"] },
  { id: "DOC-93188", name: "Boiler-05 Annual Inspection Report.pdf", type: "Inspection", unit: "Utilities", asset: "Boiler-05", size: "8.1 MB", updated: "5 days ago", tags: ["IBR", "Inspection"] },
  { id: "DOC-93102", name: "SOP-SF-014 Hot Work Permit (Rev 6).docx", type: "SOP", unit: "Plantwide", asset: "-", size: "412 KB", updated: "1 week ago", tags: ["SOP", "Safety"] },
  { id: "DOC-92988", name: "Unit-3 P&ID Rev-C.pdf", type: "P&ID", unit: "Unit-3", asset: "-", size: "14.2 MB", updated: "2 weeks ago", tags: ["Drawing", "P&ID"] },
  { id: "DOC-92877", name: "Compressor-02 Vibration Trend Q3.xlsx", type: "Data", unit: "Unit-3", asset: "Compressor-02", size: "1.1 MB", updated: "3 weeks ago", tags: ["Vibration", "Condition"] },
  { id: "DOC-92710", name: "PESO Audit Response 2024.pdf", type: "Audit", unit: "Plantwide", asset: "-", size: "3.6 MB", updated: "1 month ago", tags: ["PESO", "Audit"] },
  { id: "DOC-92601", name: "HX-401 Cleaning Procedure.pdf", type: "SOP", unit: "Unit-4", asset: "HX-401", size: "820 KB", updated: "1 month ago", tags: ["SOP", "Cleaning"] },
  { id: "DOC-92544", name: "Tank T-17 API-653 Report.pdf", type: "Inspection", unit: "Tank Farm", asset: "Tank-T17", size: "5.9 MB", updated: "6 weeks ago", tags: ["API-653", "Tank"] },
];

export const workOrders = [
  { id: "WO-10231", asset: "P-102", title: "Replace mechanical seal", priority: "High", status: "In Progress", due: "Oct 12" },
  { id: "WO-10228", asset: "Compressor-02", title: "Valve inspection – 2nd stage", priority: "Critical", status: "Scheduled", due: "Oct 09" },
  { id: "WO-10214", asset: "Boiler-05", title: "Water side chemical clean", priority: "Medium", status: "Open", due: "Oct 18" },
  { id: "WO-10201", asset: "HX-401", title: "Tube bundle NDT inspection", priority: "Medium", status: "Open", due: "Oct 22" },
  { id: "WO-10188", asset: "CV-220", title: "Positioner calibration", priority: "Low", status: "Completed", due: "Oct 02" },
];

export const incidents = [
  { id: "INC-4471", asset: "P-102", severity: "High", date: "2025-08-14", title: "Seal leak – hydrocarbon release", status: "Closed" },
  { id: "INC-4462", asset: "Compressor-02", severity: "Critical", date: "2025-07-29", title: "Valve failure – unplanned trip", status: "RCA" },
  { id: "INC-4440", asset: "Boiler-05", severity: "Medium", date: "2025-07-11", title: "Low water alarm nuisance", status: "Closed" },
  { id: "INC-4418", asset: "Tank-T17", severity: "Low", date: "2025-06-22", title: "Rim seal wear – near miss", status: "Closed" },
];

export const compliance = [
  { area: "Factory Act", total: 84, done: 81, pending: 3, missing: 0 },
  { area: "OISD-116", total: 62, done: 54, pending: 6, missing: 2 },
  { area: "PESO", total: 41, done: 38, pending: 2, missing: 1 },
  { area: "ISO 9001", total: 118, done: 111, pending: 7, missing: 0 },
  { area: "ISO 14001", total: 96, done: 86, pending: 8, missing: 2 },
  { area: "ISO 45001", total: 74, done: 69, pending: 4, missing: 1 },
];

export const experts = [
  { name: "Arjun Deshmukh", role: "Rotating Equipment Lead", plant: "Hazira", assets: ["P-102", "Compressor-02"], rating: 4.9 },
  { name: "Priya Iyer", role: "Static Equipment SME", plant: "Jamnagar", assets: ["HX-401", "Tank-T17"], rating: 4.8 },
  { name: "Rahul Menon", role: "Inspection Manager", plant: "Vadinar", assets: ["Boiler-05"], rating: 4.7 },
  { name: "Neha Kulkarni", role: "Reliability Engineer", plant: "Hazira", assets: ["CV-220"], rating: 4.9 },
];

export const copilotSuggestions = [
  "Why did Pump P-102 fail last year?",
  "Show maintenance history of Boiler-05.",
  "Find missing inspection records in Unit-3.",
  "Which SOP references Valve V-203?",
  "What regulations apply to the compressor room?",
];

export const copilotSample = {
  question: "Why did Pump P-102 fail last year?",
  confidence: 92,
  answer:
    "Pump P-102 experienced three seal-related failures in the last 14 months. The dominant failure mode was mechanical seal face wear driven by intermittent dry-running during unit start-up. Vibration trends show a rising 1x component 6–8 weeks before each event. RCA-2025-014 recommends switching to a Type-C tandem seal with API Plan 53B, and adding a low-flow interlock on the recirculation line.",
  sources: [
    { title: "RCA-2025-014 – P-102 Seal Failure", type: "RCA", updated: "Aug 2025" },
    { title: "P-102 Vibration Trend – Jun/Jul", type: "Data", updated: "Jul 2025" },
    { title: "SOP-RT-08 – Rotating Equip Startup", type: "SOP", updated: "Feb 2025" },
    { title: "P&ID Unit-2 Rev-C", type: "Drawing", updated: "Mar 2025" },
  ],
  related: ["P-102", "Compressor-02", "SOP-RT-08"],
};

export const graphNodes = [
  { id: "P-102", label: "Pump P-102", type: "Equipment", x: 480, y: 260 },
  { id: "HX-401", label: "HX-401", type: "Equipment", x: 760, y: 180 },
  { id: "CV-220", label: "CV-220", type: "Equipment", x: 300, y: 420 },
  { id: "Boiler-05", label: "Boiler-05", type: "Equipment", x: 620, y: 460 },
  { id: "SOP-RT-08", label: "SOP-RT-08", type: "Procedure", x: 220, y: 200 },
  { id: "SOP-SF-014", label: "SOP-SF-014", type: "Procedure", x: 820, y: 380 },
  { id: "INC-4471", label: "INC-4471", type: "Incident", x: 380, y: 120 },
  { id: "INC-4462", label: "INC-4462", type: "Incident", x: 900, y: 260 },
  { id: "PESO", label: "PESO", type: "Regulation", x: 140, y: 340 },
  { id: "OISD-116", label: "OISD-116", type: "Regulation", x: 560, y: 620 },
  { id: "Arjun D.", label: "Arjun D.", type: "Person", x: 260, y: 560 },
  { id: "Priya I.", label: "Priya I.", type: "Person", x: 860, y: 540 },
];

export const graphEdges = [
  ["P-102", "SOP-RT-08"],
  ["P-102", "INC-4471"],
  ["P-102", "Arjun D."],
  ["P-102", "CV-220"],
  ["HX-401", "Priya I."],
  ["HX-401", "SOP-SF-014"],
  ["Boiler-05", "OISD-116"],
  ["Boiler-05", "SOP-SF-014"],
  ["CV-220", "SOP-RT-08"],
  ["Compressor-02" as string, "INC-4462"],
  ["INC-4462", "SOP-SF-014"],
  ["PESO", "Boiler-05"],
  ["PESO", "SOP-SF-014"],
  ["Arjun D.", "CV-220"],
] as const;

export const notifications = [
  { id: 1, type: "Compliance", title: "PESO submission due in 21 days", time: "2h ago", severity: "warning" },
  { id: 2, type: "Predictive", title: "P-102 vibration crossed 4.5 mm/s", time: "5h ago", severity: "danger" },
  { id: 3, type: "Ingestion", title: "142 documents processed successfully", time: "Yesterday", severity: "success" },
  { id: 4, type: "SOP", title: "SOP-SF-014 revision overdue", time: "2 days ago", severity: "warning" },
];
