import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, Pill, SectionTitle } from "@/components/ui-forge";
import { graphNodes, graphEdges } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Search, Maximize2, Filter } from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/knowledge-graph")({
  head: () => ({
    meta: [
      { title: "Knowledge Graph · ForgeIQ" },
      { name: "description", content: "Visual map of assets, people, procedures, incidents and regulations." },
      { property: "og:title", content: "ForgeIQ Knowledge Graph" },
      { property: "og:description", content: "Traverse relationships across your entire operating knowledge." },
    ],
  }),
  component: KnowledgeGraph,
});

const typeColor: Record<string, string> = {
  Equipment: "#0F4C81",
  Procedure: "#3BA99C",
  Incident: "#D9534F",
  Regulation: "#F4A261",
  Person: "#2F6BFF",
  Project: "#6B7280",
};

function KnowledgeGraph() {
  const [q, setQ] = useState("");
  const [selectedId, setSelected] = useState<string>("P-102");
  const [types, setTypes] = useState<string[]>(Object.keys(typeColor));

  const nodesById = useMemo(() => Object.fromEntries(graphNodes.map((n) => [n.id, n])), []);
  const visible = graphNodes.filter(
    (n) => types.includes(n.type) && (q === "" || n.label.toLowerCase().includes(q.toLowerCase())),
  );
  const visibleIds = new Set(visible.map((n) => n.id));
  const edges = graphEdges.filter(([a, b]) => visibleIds.has(a as string) && visibleIds.has(b as string));

  const selected = nodesById[selectedId] || graphNodes[0];
  const neighbors = graphEdges
    .filter(([a, b]) => a === selected.id || b === selected.id)
    .map(([a, b]) => (a === selected.id ? b : a));

  return (
    <AppShell>
      <PageHeader
        title="Knowledge Graph"
        subtitle="512,874 links across equipment, procedures, incidents, regulations and people"
        actions={
          <>
            <div className="glass-soft flex h-9 items-center gap-2 rounded-lg px-3">
              <Search className="h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search nodes…"
                className="h-6 w-40 border-0 bg-transparent p-0 text-sm focus-visible:ring-0"
              />
            </div>
            <button className="glass-soft flex h-9 items-center gap-2 rounded-lg px-3 text-sm">
              <Maximize2 className="h-3.5 w-3.5" /> Fullscreen
            </button>
          </>
        }
      />
      <div className="grid grid-cols-12 gap-4">
        <GlassCard className="col-span-12 lg:col-span-9">
          <div className="mb-3 flex flex-wrap items-center gap-1.5">
            <Filter className="h-3.5 w-3.5 text-muted-foreground" />
            {Object.entries(typeColor).map(([t, c]) => {
              const on = types.includes(t);
              return (
                <button
                  key={t}
                  onClick={() => setTypes((s) => (s.includes(t) ? s.filter((x) => x !== t) : [...s, t]))}
                  className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11.5px] transition ${on ? "border-transparent bg-white/70 text-foreground" : "border-border/60 bg-transparent text-muted-foreground"}`}
                >
                  <span className="h-2 w-2 rounded-full" style={{ background: c }} /> {t}
                </button>
              );
            })}
          </div>
          <div className="relative h-[540px] overflow-hidden rounded-2xl blueprint-grid">
            <svg viewBox="0 0 1000 700" className="h-full w-full">
              {edges.map(([a, b], i) => {
                const A = nodesById[a as string];
                const B = nodesById[b as string];
                if (!A || !B) return null;
                const hi = selected.id === a || selected.id === b;
                return (
                  <line
                    key={i}
                    x1={A.x}
                    y1={A.y}
                    x2={B.x}
                    y2={B.y}
                    stroke={hi ? "#0F4C81" : "rgba(15,76,129,0.28)"}
                    strokeWidth={hi ? 2 : 1.2}
                    strokeDasharray={hi ? "0" : "4 4"}
                  />
                );
              })}
              {visible.map((n) => {
                const active = n.id === selected.id;
                const isNeighbor = neighbors.includes(n.id);
                return (
                  <g
                    key={n.id}
                    style={{ cursor: "pointer" }}
                    onClick={() => setSelected(n.id)}
                    transform={`translate(${n.x}, ${n.y})`}
                  >
                    <circle
                      r={active ? 28 : isNeighbor ? 22 : 18}
                      fill="white"
                      stroke={typeColor[n.type]}
                      strokeWidth={active ? 3 : 2}
                      opacity={0.95}
                    />
                    <circle r={active ? 12 : 9} fill={typeColor[n.type]} opacity={0.9} />
                    <text
                      y={active ? 46 : 38}
                      textAnchor="middle"
                      fontSize={active ? 13 : 11.5}
                      fontWeight={active ? 600 : 500}
                      fill="#17202A"
                    >
                      {n.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </GlassCard>

        <GlassCard className="col-span-12 lg:col-span-3">
          <SectionTitle title="Node details" hint={selected.type} />
          <div className="rounded-xl bg-white/60 p-4">
            <div className="flex items-center gap-3">
              <div
                className="flex h-11 w-11 items-center justify-center rounded-xl text-white"
                style={{ background: typeColor[selected.type] }}
              >
                {selected.type[0]}
              </div>
              <div>
                <div className="text-base font-semibold">{selected.label}</div>
                <Pill tone="primary">{selected.type}</Pill>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2 text-[12px]">
              <Stat label="Connections" value={neighbors.length} />
              <Stat label="Docs" value={selected.type === "Equipment" ? 42 : 12} />
              <Stat label="Incidents" value={selected.type === "Equipment" ? 3 : 0} />
              <Stat label="Health" value={selected.type === "Equipment" ? "74%" : "—"} />
            </div>
          </div>
          <div className="mt-3">
            <div className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              Neighbors
            </div>
            <div className="space-y-1.5">
              {neighbors.map((n) => (
                <button
                  key={n}
                  onClick={() => setSelected(n as string)}
                  className="flex w-full items-center gap-2 rounded-lg bg-white/50 px-3 py-2 text-left text-[13px] hover:bg-white/80"
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ background: typeColor[nodesById[n as string]?.type ?? "Equipment"] }}
                  />
                  {n}
                </button>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-lg bg-white/60 p-2.5">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-0.5 text-sm font-semibold">{value}</div>
    </div>
  );
}
