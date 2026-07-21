import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, SectionTitle } from "@/components/ui-forge";
import { documentGrowth, equipmentHealth, failureTrend } from "@/lib/mock-data";
import { Download } from "lucide-react";
import { toast } from "sonner";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export const Route = createFileRoute("/analytics")({
  head: () => ({
    meta: [
      { title: "Analytics · ForgeIQ" },
      { name: "description", content: "Filterable, exportable analytics across plants, units, equipment and time." },
      { property: "og:title", content: "ForgeIQ Analytics" },
      { property: "og:description", content: "Deep operational analytics for industrial teams." },
    ],
  }),
  component: Analytics,
});

function Analytics() {
  return (
    <AppShell>
      <PageHeader
        title="Analytics"
        subtitle="Slice by plant, unit, equipment and time · export anywhere"
        actions={
          <>
            <button
              onClick={() => toast.success("CSV downloaded")}
              className="glass-soft flex h-9 items-center gap-2 rounded-lg px-3 text-sm"
            >
              <Download className="h-4 w-4" /> CSV
            </button>
            <button
              onClick={() => toast.success("PDF export queued")}
              className="flex h-9 items-center gap-2 rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground"
            >
              <Download className="h-4 w-4" /> PDF
            </button>
          </>
        }
      />

      <GlassCard className="mb-4">
        <div className="flex flex-wrap items-center gap-2">
          {[
            { l: "Plant", v: "Jamshedpur" },
            { l: "Unit", v: "All units" },
            { l: "Equipment", v: "All types" },
            { l: "Date", v: "Last 90 days" },
          ].map((f) => (
            <button
              key={f.l}
              className="glass-soft flex h-9 items-center gap-2 rounded-lg px-3 text-sm"
            >
              <span className="text-[11px] uppercase tracking-wider text-muted-foreground">{f.l}</span>
              <span className="font-medium">{f.v}</span>
            </button>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-12 gap-4">
        <GlassCard className="col-span-12 xl:col-span-8">
          <SectionTitle title="Document growth" />
          <div className="h-[280px]">
            <ResponsiveContainer>
              <AreaChart data={documentGrowth}>
                <defs>
                  <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#0F4C81" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#0F4C81" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(15,76,129,0.06)" vertical={false} />
                <XAxis dataKey="month" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <YAxis fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(15,76,129,0.12)", borderRadius: 12, fontSize: 12 }} />
                <Area type="monotone" dataKey="docs" stroke="#0F4C81" strokeWidth={2.4} fill="url(#ag)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="col-span-12 xl:col-span-4">
          <SectionTitle title="Failure rate" />
          <div className="h-[280px]">
            <ResponsiveContainer>
              <BarChart data={failureTrend}>
                <CartesianGrid stroke="rgba(15,76,129,0.06)" vertical={false} />
                <XAxis dataKey="month" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <YAxis fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(15,76,129,0.12)", borderRadius: 12, fontSize: 12 }} />
                <Bar dataKey="failures" fill="#0F4C81" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="col-span-12">
          <SectionTitle title="Equipment health across fleets" />
          <div className="h-[300px]">
            <ResponsiveContainer>
              <LineChart data={equipmentHealth}>
                <CartesianGrid stroke="rgba(15,76,129,0.06)" vertical={false} />
                <XAxis dataKey="name" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <YAxis domain={[75, 100]} fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(15,76,129,0.12)", borderRadius: 12, fontSize: 12 }} />
                <Line type="monotone" dataKey="pumps" stroke="#0F4C81" strokeWidth={2.4} dot={false} />
                <Line type="monotone" dataKey="compressors" stroke="#2F6BFF" strokeWidth={2.4} dot={false} />
                <Line type="monotone" dataKey="boilers" stroke="#3BA99C" strokeWidth={2.4} dot={false} />
                <Line type="monotone" dataKey="exchangers" stroke="#F4A261" strokeWidth={2.4} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
