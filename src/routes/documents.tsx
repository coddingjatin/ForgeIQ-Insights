import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, Pill, SectionTitle } from "@/components/ui-forge";
import { UploadCloud, FileText, CheckCircle2, Loader2, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/documents")({
  head: () => ({
    meta: [
      { title: "Document Ingestion · ForgeIQ" },
      { name: "description", content: "Drag, drop, OCR and enrich industrial documents at scale." },
      { property: "og:title", content: "ForgeIQ Document Ingestion" },
      { property: "og:description", content: "Ingest PDFs, drawings, spreadsheets and emails with automated extraction." },
    ],
  }),
  component: Documents,
});

const initial = [
  { name: "P-102 Vibration Trend Q3.xlsx", size: "1.1 MB", progress: 100, stage: "Indexed" },
  { name: "Unit-3 P&ID Rev-C.pdf", size: "14.2 MB", progress: 78, stage: "OCR" },
  { name: "PESO Audit Response 2024.pdf", size: "3.6 MB", progress: 42, stage: "Extract" },
  { name: "SOP-SF-014 Hot Work Permit (Rev 6).docx", size: "412 KB", progress: 12, stage: "Upload" },
];

function Documents() {
  const [items, setItems] = useState(initial);

  const addFake = () => {
    const n = { name: `Ingestion-${Math.floor(Math.random() * 9000) + 1000}.pdf`, size: "2.8 MB", progress: 4, stage: "Upload" };
    setItems((it) => [n, ...it]);
    toast.success("File queued for ingestion");
    let p = 4;
    const t = setInterval(() => {
      p += 12;
      setItems((it) =>
        it.map((x) =>
          x.name === n.name
            ? { ...x, progress: Math.min(100, p), stage: p < 30 ? "Upload" : p < 60 ? "OCR" : p < 90 ? "Extract" : "Indexed" }
            : x,
        ),
      );
      if (p >= 100) clearInterval(t);
    }, 400);
  };

  return (
    <AppShell>
      <PageHeader
        title="Document Ingestion"
        subtitle="PDF · DOCX · Excel · CSV · Images · Scanned files · Emails · ZIP"
      />
      <div className="grid grid-cols-12 gap-4">
        <GlassCard className="col-span-12 lg:col-span-7">
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              addFake();
            }}
            className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-primary/25 bg-white/40 px-6 py-14 text-center transition hover:border-primary/50 hover:bg-white/60"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <UploadCloud className="h-7 w-7" />
            </div>
            <div className="mt-4 text-lg font-semibold">Drop files anywhere on this panel</div>
            <p className="mt-1 max-w-md text-sm text-muted-foreground">
              We'll OCR scanned drawings, extract equipment tags, link to your existing assets and
              regulate them against your compliance library.
            </p>
            <button
              onClick={addFake}
              className="mt-5 rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90"
            >
              Browse files
            </button>
            <div className="mt-5 flex flex-wrap justify-center gap-1.5">
              {["PDF", "DOCX", "XLSX", "CSV", "PNG/JPG", "TIFF", "EML", "ZIP"].map((t) => (
                <Pill key={t}>{t}</Pill>
              ))}
            </div>
          </div>

          <SectionTitle title="Active ingestion queue" hint={`${items.length} files`} />
          <div className="space-y-2">
            {items.map((f) => (
              <div key={f.name} className="rounded-xl border border-border/60 bg-white/50 p-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/8 text-primary">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{f.name}</div>
                    <div className="text-[11px] text-muted-foreground">{f.size} · {f.stage}</div>
                  </div>
                  {f.progress === 100 ? (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-success">
                      <CheckCircle2 className="h-4 w-4" /> Indexed
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-medium text-secondary">
                      <Loader2 className="h-4 w-4 animate-spin" /> {f.progress}%
                    </span>
                  )}
                </div>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-500"
                    style={{ width: `${f.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="col-span-12 lg:col-span-5">
          <SectionTitle
            title="Extraction pipeline"
            hint="Every document runs through the same enrichment"
            action={<Sparkles className="h-4 w-4 text-accent" />}
          />
          <div className="space-y-3">
            {[
              { t: "OCR & layout parsing", d: "Detects tables, signatures, drawing revisions." , v: 98 },
              { t: "Equipment tag extraction", d: "Recognises P-102, HX-401, CV-220 style IDs.", v: 96 },
              { t: "Entity & relationship", d: "Links people, standards, procedures, incidents.", v: 92 },
              { t: "Metadata normalisation", d: "Rev, plant, unit, discipline, retention.", v: 100 },
              { t: "Compliance mapping", d: "Cross-check with Factory Act, OISD, PESO, ISO.", v: 88 },
            ].map((s) => (
              <div key={s.t} className="rounded-xl border border-border/60 bg-white/50 p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{s.t}</div>
                  <div className="text-[11px] font-semibold text-primary">{s.v}%</div>
                </div>
                <div className="text-[11.5px] text-muted-foreground">{s.d}</div>
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-muted">
                  <div className="h-full rounded-full bg-primary" style={{ width: `${s.v}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
