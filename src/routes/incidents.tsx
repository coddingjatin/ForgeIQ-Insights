import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, Pill, SectionTitle } from "@/components/ui-forge";
import { incidents } from "@/lib/mock-data";
import { Sparkles, ShieldAlert } from "lucide-react";

export const Route = createFileRoute("/incidents")({
  head: () => ({
    meta: [
      { title: "Incident Intelligence · ForgeIQ" },
      { name: "description", content: "Timeline, RCA, near-miss heatmap and preventive actions from every incident." },
      { property: "og:title", content: "ForgeIQ Incident Intelligence" },
      { property: "og:description", content: "Learn from every incident with RCA and lessons learned." },
    ],
  }),
  component: Incidents,
});

const heatmap = Array.from({ length: 12 }, (_, m) =>
  Array.from({ length: 7 }, () => Math.floor(Math.random() * 5)),
);

function Incidents() {
  return (
    <AppShell>
      <PageHeader
        title="Incident Intelligence"
        subtitle="Every incident, near-miss and RCA — mapped to assets, procedures and people"
      />

      <div className="grid grid-cols-12 gap-4">
        <GlassCard className="col-span-12 xl:col-span-8">
          <SectionTitle title="Incident heatmap" hint="Last 12 months × days of week" />
          <div className="mt-2 flex gap-2">
            <div className="mt-6 space-y-1 text-[10px] text-muted-foreground">
              {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
                <div key={i} className="h-5 leading-5">{d}</div>
              ))}
            </div>
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-12 text-[10px] text-muted-foreground">
                {["Sep","Oct","Nov","Dec","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"].map((m) => (
                  <div key={m} className="text-center">{m}</div>
                ))}
              </div>
              <div className="grid grid-cols-12 gap-1">
                {heatmap.map((col, i) => (
                  <div key={i} className="grid grid-rows-7 gap-1">
                    {col.map((v, j) => {
                      const colors = [
                        "rgba(15,76,129,0.06)",
                        "rgba(15,76,129,0.18)",
                        "rgba(47,107,255,0.35)",
                        "rgba(244,162,97,0.6)",
                        "rgba(217,83,79,0.75)",
                      ];
                      return (
                        <div
                          key={j}
                          className="h-5 rounded-sm"
                          style={{ background: colors[v] }}
                          title={`${v} incidents`}
                        />
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="col-span-12 xl:col-span-4">
          <SectionTitle title="AI incident summary" action={<Sparkles className="h-4 w-4 text-accent" />} />
          <div className="rounded-xl bg-white/60 p-4 text-[13px] leading-relaxed">
            The last quarter shows a <b>22% drop</b> in confirmed failures, driven mostly by improved
            rotating-equipment reliability at Unit-2 and Utilities. Compressor-02 continues to trend
            as the highest-risk asset — recommend accelerating the valve inspection cycle from 12 to
            6 months.
          </div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            <Pill tone="danger">Highest risk: Compressor-02</Pill>
            <Pill tone="success">Improving: Unit-2</Pill>
            <Pill tone="warning">Watch: Tank Farm</Pill>
          </div>
        </GlassCard>
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <GlassCard className="col-span-12 xl:col-span-7">
          <SectionTitle title="Recent incidents" />
          <ol className="relative ml-3 space-y-4 border-l border-border/60 pl-6">
            {incidents.map((i) => (
              <li key={i.id}>
                <span
                  className={`absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full ${
                    i.severity === "Critical"
                      ? "bg-destructive"
                      : i.severity === "High"
                        ? "bg-warning"
                        : i.severity === "Medium"
                          ? "bg-primary"
                          : "bg-accent"
                  }`}
                />
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold">{i.title}</div>
                  <Pill
                    tone={
                      i.severity === "Critical"
                        ? "danger"
                        : i.severity === "High"
                          ? "warning"
                          : "primary"
                    }
                  >
                    {i.severity}
                  </Pill>
                </div>
                <div className="mt-0.5 text-[12px] text-muted-foreground">
                  {i.id} · {i.asset} · {i.date} · {i.status}
                </div>
              </li>
            ))}
          </ol>
        </GlassCard>

        <GlassCard className="col-span-12 xl:col-span-5">
          <SectionTitle title="Lessons learned & preventive actions" action={<ShieldAlert className="h-4 w-4 text-primary" />} />
          <div className="space-y-2">
            {[
              "Retrofit tandem seals across all high-service pumps by Q4.",
              "Add low-flow interlock to all rotating equipment recirculation lines.",
              "Refresh SOP-SF-014 with new hot-work permit workflow.",
              "Update PESO evidence templates to include vibration data automatically.",
            ].map((l) => (
              <div key={l} className="flex gap-2 rounded-xl border border-border/60 bg-white/50 p-3 text-[13px]">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                {l}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
