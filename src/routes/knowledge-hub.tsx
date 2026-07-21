import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, Pill, SectionTitle } from "@/components/ui-forge";
import { documents } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Folder,
  FolderOpen,
  Star,
  Clock,
  Tag,
  FileText,
  Image as ImageIcon,
  FileSpreadsheet,
  Filter,
  Download,
  Eye,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/knowledge-hub")({
  head: () => ({
    meta: [
      { title: "Knowledge Hub · ForgeIQ" },
      { name: "description", content: "Explore every drawing, SOP, inspection report and audit file across the plant." },
      { property: "og:title", content: "ForgeIQ Knowledge Hub" },
      { property: "og:description", content: "Unified document explorer for industrial operations." },
    ],
  }),
  component: KnowledgeHub,
});

const tree = [
  { name: "Plants", children: [
    { name: "Jamshedpur", open: true, children: [
      { name: "Unit-2 · Process", count: 4231 },
      { name: "Unit-3 · Compression", count: 2984 },
      { name: "Unit-4 · Recovery", count: 3120 },
      { name: "Utilities", count: 1892 },
      { name: "Tank Farm", count: 940 },
    ]},
    { name: "Kalinganagar", count: 3211 },
    { name: "Angul", count: 2740 },
  ]},
  { name: "Document Types", children: [
    { name: "P&ID", count: 1284 },
    { name: "SOP", count: 3120 },
    { name: "RCA", count: 640 },
    { name: "Inspection", count: 2812 },
    { name: "Audit", count: 411 },
  ]},
];

function iconFor(type: string) {
  if (type === "P&ID") return <ImageIcon className="h-4 w-4 text-accent" />;
  if (type === "Data") return <FileSpreadsheet className="h-4 w-4 text-secondary" />;
  return <FileText className="h-4 w-4 text-primary" />;
}

function KnowledgeHub() {
  const [selected, setSelected] = useState(documents[0]);
  const [q, setQ] = useState("");
  const filtered = documents.filter((d) => d.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <AppShell>
      <PageHeader
        title="Knowledge Hub"
        subtitle="128,463 documents · 6 plants · fully indexed and cross-linked"
      />
      <div className="grid grid-cols-12 gap-4">
        <GlassCard className="col-span-12 lg:col-span-3">
          <SectionTitle title="Browse" hint="Folder tree · Filters" />
          <div className="space-y-4 text-sm">
            {tree.map((group) => (
              <div key={group.name}>
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {group.name}
                </div>
                <div className="space-y-0.5">
                  {group.children?.map((c: any) =>
                    c.children ? (
                      <div key={c.name}>
                        <div className="flex items-center gap-2 rounded-lg px-2 py-1.5 font-medium text-foreground/80">
                          <FolderOpen className="h-4 w-4 text-primary" /> {c.name}
                        </div>
                        <div className="ml-5 space-y-0.5 border-l border-border/60 pl-3">
                          {c.children.map((cc: any) => (
                            <button
                              key={cc.name}
                              className="flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-[13px] text-muted-foreground hover:bg-white/60 hover:text-foreground"
                            >
                              <span>{cc.name}</span>
                              <span className="text-[11px]">{cc.count}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <button
                        key={c.name}
                        className="flex w-full items-center justify-between rounded-md px-2 py-1.5 text-left text-[13px] hover:bg-white/60"
                      >
                        <span className="flex items-center gap-2">
                          <Folder className="h-4 w-4 text-muted-foreground" /> {c.name}
                        </span>
                        <span className="text-[11px] text-muted-foreground">{c.count}</span>
                      </button>
                    ),
                  )}
                </div>
              </div>
            ))}

            <div className="pt-2">
              <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Quick access
              </div>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] hover:bg-white/60">
                <Star className="h-4 w-4 text-warning" /> Pinned
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] hover:bg-white/60">
                <Clock className="h-4 w-4 text-muted-foreground" /> Recent
              </button>
              <button className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-[13px] hover:bg-white/60">
                <Tag className="h-4 w-4 text-accent" /> Tags
              </button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="col-span-12 lg:col-span-6">
          <div className="mb-4 flex items-center gap-2">
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search within Jamshedpur…"
              className="h-10"
            />
            <button className="glass-soft flex h-10 items-center gap-2 rounded-lg px-3 text-sm">
              <Filter className="h-4 w-4" /> Filters
            </button>
          </div>
          <div className="divide-y divide-border/60">
            {filtered.map((d) => {
              const active = selected.id === d.id;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelected(d)}
                  className={`flex w-full items-center gap-3 py-3 text-left transition ${active ? "bg-white/60" : "hover:bg-white/40"} -mx-2 px-2 rounded-lg`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/60">
                    {iconFor(d.type)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-[13.5px] font-medium">{d.name}</div>
                    <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                      <span>{d.type}</span>
                      <span>·</span>
                      <span>{d.unit}</span>
                      <span>·</span>
                      <span>{d.size}</span>
                      <span>·</span>
                      <span>{d.updated}</span>
                    </div>
                  </div>
                  <div className="hidden shrink-0 gap-1 md:flex">
                    {d.tags.slice(0, 2).map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </GlassCard>

        <GlassCard className="col-span-12 lg:col-span-3">
          <SectionTitle title="Preview" hint={selected.id} />
          <div className="mb-3 aspect-[3/4] w-full overflow-hidden rounded-xl border border-border/60 blueprint-grid">
            <div className="flex h-full flex-col p-4">
              <div className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-primary/70">
                {selected.type}
              </div>
              <div className="text-sm font-semibold leading-snug">{selected.name}</div>
              <div className="mt-auto space-y-1 text-[11px] text-muted-foreground">
                <div>Rev · C</div>
                <div>Approved · Insp. Manager</div>
                <div>Asset · {selected.asset}</div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="entities">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="entities">Entities</TabsTrigger>
              <TabsTrigger value="ocr">OCR</TabsTrigger>
              <TabsTrigger value="history">History</TabsTrigger>
            </TabsList>
            <TabsContent value="entities" className="mt-3 space-y-2 text-[12.5px]">
              <div className="rounded-lg bg-white/60 p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Equipment</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Pill tone="primary">{selected.asset}</Pill>
                  <Pill tone="primary">Motor M-102A</Pill>
                </div>
              </div>
              <div className="rounded-lg bg-white/60 p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Standards</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Pill tone="accent">API 610</Pill>
                  <Pill tone="accent">ISO 9001</Pill>
                </div>
              </div>
              <div className="rounded-lg bg-white/60 p-2.5">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">People</div>
                <div className="mt-1 flex flex-wrap gap-1">
                  <Pill>Arjun D.</Pill>
                  <Pill>Priya I.</Pill>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="ocr" className="mt-3 text-[12.5px] text-muted-foreground">
              <div className="rounded-lg bg-white/60 p-3 leading-relaxed">
                Extracted 4,218 tokens · 12 tables · 3 signature blocks · OCR confidence 97.4%.
                Detected asset tags: <b className="text-foreground">{selected.asset}</b>, motor coupling
                references, and ISO datum callouts.
              </div>
            </TabsContent>
            <TabsContent value="history" className="mt-3 space-y-2 text-[12.5px]">
              {["Rev C · Approved · 2d ago", "Rev B · Reviewed · 3w ago", "Rev A · Created · 4mo ago"].map(
                (h) => (
                  <div key={h} className="flex items-center gap-2 rounded-lg bg-white/60 p-2">
                    <span className="h-2 w-2 rounded-full bg-primary" /> {h}
                  </div>
                ),
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-3 flex gap-2">
            <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground">
              <Eye className="h-3.5 w-3.5" /> Open
            </button>
            <button className="glass-soft flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium">
              <Download className="h-3.5 w-3.5" /> Export
            </button>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
