import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, KpiCard, Pill, SectionTitle } from "@/components/ui-forge";
import {
  FileText,
  Package,
  Link2,
  ShieldCheck,
  Wrench,
  AlertOctagon,
  Activity,
  Timer,
  Sparkles,
  ArrowRight,
  ChevronRight,
} from "lucide-react";
import {
  kpis,
  equipmentHealth,
  documentGrowth,
  failureTrend,
  complianceScore,
  assetCriticality,
  insights,
} from "@/lib/mock-data";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dashboard · ForgeIQ" },
      {
        name: "description",
        content:
          "Live snapshot of plant knowledge, asset health, compliance posture and open work across every operating unit.",
      },
      { property: "og:title", content: "ForgeIQ Dashboard" },
      { property: "og:description", content: "Industrial knowledge intelligence at a glance." },
    ],
  }),
  component: Dashboard,
});

const iconFor: Record<string, React.ReactNode> = {
  documents: <FileText className="h-4 w-4" />,
  equipment: <Package className="h-4 w-4" />,
  links: <Link2 className="h-4 w-4" />,
  compliance: <ShieldCheck className="h-4 w-4" />,
  workorders: <Wrench className="h-4 w-4" />,
  critical: <AlertOctagon className="h-4 w-4" />,
  failures: <Activity className="h-4 w-4" />,
  query: <Timer className="h-4 w-4" />,
};

function Dashboard() {
  return (
    <AppShell>
      <PageHeader
        title="Operations overview"
        subtitle="Tata Steel · Jamshedpur Works · Last updated 2 minutes ago"
        actions={
          <>
            <button className="glass-soft h-9 rounded-lg px-3 text-sm font-medium hover:bg-white/70">
              Last 30 days
            </button>
            <button className="h-9 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90">
              Generate report
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((k) => (
          <KpiCard
            key={k.key}
            label={k.label}
            value={k.value as string | number}
            delta={k.delta}
            accent={k.accent as never}
            icon={iconFor[k.key]}
          />
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <GlassCard className="xl:col-span-2">
          <SectionTitle
            title="Equipment health index"
            hint="Composite health across fleets · rolling 8 weeks"
            action={
              <div className="flex items-center gap-1 text-[11px]">
                {[
                  ["Pumps", "#0F4C81"],
                  ["Compressors", "#2F6BFF"],
                  ["Boilers", "#3BA99C"],
                  ["Exchangers", "#F4A261"],
                ].map(([l, c]) => (
                  <span key={l} className="flex items-center gap-1.5 rounded-md px-2 py-1 text-muted-foreground">
                    <span className="h-2 w-2 rounded-full" style={{ background: c }} />
                    {l}
                  </span>
                ))}
              </div>
            }
          />
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={equipmentHealth} margin={{ top: 8, right: 12, bottom: 0, left: -8 }}>
                <CartesianGrid stroke="rgba(15,76,129,0.08)" vertical={false} />
                <XAxis dataKey="name" stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis domain={[75, 100]} stroke="#6B7280" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(15,76,129,0.12)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="pumps" stroke="#0F4C81" strokeWidth={2.4} dot={false} />
                <Line type="monotone" dataKey="compressors" stroke="#2F6BFF" strokeWidth={2.4} dot={false} />
                <Line type="monotone" dataKey="boilers" stroke="#3BA99C" strokeWidth={2.4} dot={false} />
                <Line type="monotone" dataKey="exchangers" stroke="#F4A261" strokeWidth={2.4} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Compliance score" hint="Weighted across audit programs" />
          <div className="h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                innerRadius="30%"
                outerRadius="100%"
                data={complianceScore.map((c, i) => ({
                  ...c,
                  fill: ["#0F4C81", "#2F6BFF", "#3BA99C", "#24B26B", "#F4A261", "#D9534F"][i],
                }))}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar dataKey="score" cornerRadius={12} background={{ fill: "rgba(15,76,129,0.06)" }} />
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    border: "1px solid rgba(15,76,129,0.12)",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-1.5 text-[11px]">
            {complianceScore.map((c, i) => (
              <div key={c.area} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ background: ["#0F4C81", "#2F6BFF", "#3BA99C", "#24B26B", "#F4A261", "#D9534F"][i] }}
                />
                <span className="flex-1 truncate text-muted-foreground">{c.area}</span>
                <span className="font-medium">{c.score}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <GlassCard>
          <SectionTitle title="Document growth" hint="Ingested & indexed volume" />
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={documentGrowth}>
                <defs>
                  <linearGradient id="docs" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#2F6BFF" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#2F6BFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(15,76,129,0.06)" vertical={false} />
                <XAxis dataKey="month" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <YAxis fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(15,76,129,0.12)", borderRadius: 12, fontSize: 12 }}
                />
                <Area type="monotone" dataKey="docs" stroke="#2F6BFF" strokeWidth={2.4} fill="url(#docs)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Failure & near-miss trend" hint="Plant-wide, monthly" />
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={failureTrend}>
                <CartesianGrid stroke="rgba(15,76,129,0.06)" vertical={false} />
                <XAxis dataKey="month" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <YAxis fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(15,76,129,0.12)", borderRadius: 12, fontSize: 12 }}
                />
                <Line type="monotone" dataKey="failures" stroke="#D9534F" strokeWidth={2.4} dot={false} />
                <Line type="monotone" dataKey="nearMiss" stroke="#F4A261" strokeWidth={2.4} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle title="Asset criticality" hint="Distribution of 4,218 assets" />
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={assetCriticality} dataKey="value" nameKey="name" innerRadius={54} outerRadius={90} paddingAngle={3}>
                  {assetCriticality.map((e, i) => (
                    <Cell key={i} fill={e.fill} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(15,76,129,0.12)", borderRadius: 12, fontSize: 12 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-1 grid grid-cols-2 gap-2 text-[11px]">
            {assetCriticality.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: s.fill }} />
                <span className="flex-1 truncate text-muted-foreground">{s.name}</span>
                <span className="font-medium">{s.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <GlassCard className="xl:col-span-2">
          <SectionTitle
            title="Knowledge coverage by unit"
            hint="Share of assets with linked P&ID, SOP, RCA and inspection records"
          />
          <div className="space-y-3">
            {[
              { name: "Unit-2 · Process", val: 94 },
              { name: "Unit-3 · Compression", val: 87 },
              { name: "Unit-4 · Recovery", val: 91 },
              { name: "Utilities · Boilers", val: 96 },
              { name: "Tank Farm", val: 82 },
            ].map((r) => (
              <div key={r.name} className="flex items-center gap-4">
                <div className="w-44 shrink-0 text-sm font-medium">{r.name}</div>
                <div className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-[width] duration-700"
                    style={{ width: `${r.val}%` }}
                  />
                </div>
                <div className="w-12 text-right text-sm font-semibold">{r.val}%</div>
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard>
          <SectionTitle
            title="Today's insights"
            hint="Generated by ForgeIQ"
            action={<Sparkles className="h-4 w-4 text-accent" />}
          />
          <div className="space-y-3">
            {insights.map((ins) => (
              <button
                key={ins.id}
                className="group flex w-full items-start gap-3 rounded-xl border border-border/60 bg-white/50 p-3 text-left transition hover:border-primary/30 hover:bg-white/80"
              >
                <div
                  className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                    ins.severity === "high"
                      ? "bg-destructive"
                      : ins.severity === "medium"
                        ? "bg-warning"
                        : "bg-accent"
                  }`}
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <div className="truncate text-sm font-medium">{ins.title}</div>
                    <Pill
                      tone={
                        ins.severity === "high"
                          ? "danger"
                          : ins.severity === "medium"
                            ? "warning"
                            : "accent"
                      }
                    >
                      {ins.tag}
                    </Pill>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[12.5px] text-muted-foreground">{ins.body}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-primary" />
              </button>
            ))}
            <button className="flex w-full items-center justify-center gap-1 rounded-xl border border-dashed border-border/70 py-2 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-primary">
              View all 24 insights <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
