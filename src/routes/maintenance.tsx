import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, Pill, SectionTitle } from "@/components/ui-forge";
import { assets, workOrders, failureTrend } from "@/lib/mock-data";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Wrench, AlertTriangle, Timer, Sparkles } from "lucide-react";

export const Route = createFileRoute("/maintenance")({
  head: () => ({
    meta: [
      { title: "Maintenance Intelligence · ForgeIQ" },
      { name: "description", content: "Predictive maintenance, RCA and work order intelligence for every asset." },
      { property: "og:title", content: "ForgeIQ Maintenance Intelligence" },
      { property: "og:description", content: "Predictive maintenance and RCA across the fleet." },
    ],
  }),
  component: Maintenance,
});

function Maintenance() {
  const rul = assets.map((a) => ({ name: a.id, rul: Math.round(120 - a.health) }));
  return (
    <AppShell>
      <PageHeader
        title="Maintenance Intelligence"
        subtitle="Predictive alerts · RCA generator · work orders · remaining useful life"
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          { l: "Open Work Orders", v: 214, tone: "primary", i: <Wrench className="h-4 w-4" /> },
          { l: "Critical Predictions", v: 12, tone: "danger", i: <AlertTriangle className="h-4 w-4" /> },
          { l: "Avg. MTBF", v: "182 days", tone: "accent", i: <Timer className="h-4 w-4" /> },
          { l: "AI Recommendations", v: 38, tone: "secondary", i: <Sparkles className="h-4 w-4" /> },
        ].map((k) => (
          <GlassCard key={k.l} className="p-5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-[11px] font-medium uppercase tracking-wider">{k.l}</span>
              {k.i}
            </div>
            <div className="mt-2 text-3xl font-semibold">{k.v}</div>
          </GlassCard>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <GlassCard className="col-span-12 xl:col-span-8">
          <SectionTitle title="Failure trend" hint="Failures vs near-misses by month" />
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={failureTrend}>
                <CartesianGrid stroke="rgba(15,76,129,0.06)" vertical={false} />
                <XAxis dataKey="month" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <YAxis fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(15,76,129,0.12)", borderRadius: 12, fontSize: 12 }}
                />
                <Bar dataKey="failures" fill="#D9534F" radius={[8, 8, 0, 0]} />
                <Bar dataKey="nearMiss" fill="#F4A261" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        <GlassCard className="col-span-12 xl:col-span-4">
          <SectionTitle title="Remaining useful life" hint="Days · high-value assets" />
          <div className="h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={rul}>
                <CartesianGrid stroke="rgba(15,76,129,0.06)" vertical={false} />
                <XAxis dataKey="name" fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <YAxis fontSize={11} stroke="#6B7280" tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{ background: "rgba(255,255,255,0.95)", border: "1px solid rgba(15,76,129,0.12)", borderRadius: 12, fontSize: 12 }}
                />
                <Line type="monotone" dataKey="rul" stroke="#0F4C81" strokeWidth={2.4} dot={{ r: 4, fill: "#0F4C81" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <GlassCard className="col-span-12 xl:col-span-7">
          <SectionTitle title="Work orders" hint={`${workOrders.length} active`} />
          <div className="overflow-hidden rounded-xl border border-border/60">
            <table className="w-full text-sm">
              <thead className="bg-white/60 text-[11px] uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 text-left">WO</th>
                  <th className="px-3 py-2 text-left">Asset</th>
                  <th className="px-3 py-2 text-left">Title</th>
                  <th className="px-3 py-2 text-left">Priority</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Due</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60 bg-white/30">
                {workOrders.map((w) => (
                  <tr key={w.id} className="hover:bg-white/60">
                    <td className="px-3 py-2 font-medium">{w.id}</td>
                    <td className="px-3 py-2">{w.asset}</td>
                    <td className="px-3 py-2">{w.title}</td>
                    <td className="px-3 py-2">
                      <Pill
                        tone={
                          w.priority === "Critical"
                            ? "danger"
                            : w.priority === "High"
                              ? "warning"
                              : w.priority === "Medium"
                                ? "primary"
                                : "default"
                        }
                      >
                        {w.priority}
                      </Pill>
                    </td>
                    <td className="px-3 py-2">
                      <Pill tone={w.status === "Completed" ? "success" : "primary"}>{w.status}</Pill>
                    </td>
                    <td className="px-3 py-2 text-muted-foreground">{w.due}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="col-span-12 xl:col-span-5">
          <SectionTitle
            title="AI recommendations"
            hint="Ranked by expected impact"
            action={<Sparkles className="h-4 w-4 text-accent" />}
          />
          <div className="space-y-3">
            {[
              { t: "Upgrade P-102 to Type-C tandem seal", d: "Prevents 2–3 seal failures/yr · ROI 4.2×", tone: "danger" },
              { t: "Reschedule Boiler-05 chemical clean", d: "Shift by 2 weeks to align with unit shutdown", tone: "warning" },
              { t: "Add vibration monitoring on Compressor-02", d: "Detect early 1x rise 6–8 weeks in advance", tone: "primary" },
              { t: "Retire CV-220 positioner Rev A", d: "12 positioners still on outdated firmware", tone: "accent" },
            ].map((r) => (
              <div key={r.t} className="rounded-xl border border-border/60 bg-white/50 p-3">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{r.t}</div>
                  <Pill tone={r.tone as never}>AI</Pill>
                </div>
                <p className="mt-1 text-[12.5px] text-muted-foreground">{r.d}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
