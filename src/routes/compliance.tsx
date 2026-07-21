import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, Pill, SectionTitle } from "@/components/ui-forge";
import { compliance } from "@/lib/mock-data";
import { CheckCircle2, Clock, XCircle, FileDown } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/compliance")({
  head: () => ({
    meta: [
      { title: "Compliance Center · ForgeIQ" },
      { name: "description", content: "Factory Act, OISD, PESO and ISO compliance in one live view." },
      { property: "og:title", content: "ForgeIQ Compliance Center" },
      { property: "og:description", content: "Live compliance posture across every regulatory program." },
    ],
  }),
  component: Compliance,
});

function Compliance() {
  return (
    <AppShell>
      <PageHeader
        title="Compliance Center"
        subtitle="Live posture across Factory Act, OISD, PESO, ISO, environmental and quality programs"
        actions={
          <button
            onClick={() => toast.success("Evidence pack queued", { description: "Bundle ready in ~2 minutes." })}
            className="flex h-9 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <FileDown className="h-4 w-4" /> Generate evidence pack
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {compliance.map((c) => {
          const pct = Math.round((c.done / c.total) * 100);
          return (
            <GlassCard key={c.area}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-sm text-muted-foreground">{c.area}</div>
                  <div className="mt-1 text-2xl font-semibold">{pct}%</div>
                </div>
                <Pill tone={pct >= 95 ? "success" : pct >= 85 ? "primary" : "warning"}>
                  {c.total} controls
                </Pill>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-[12px]">
                <div className="rounded-lg bg-white/60 p-2.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                  <div className="mt-1 font-semibold">{c.done}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Completed</div>
                </div>
                <div className="rounded-lg bg-white/60 p-2.5">
                  <Clock className="h-3.5 w-3.5 text-warning" />
                  <div className="mt-1 font-semibold">{c.pending}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Pending</div>
                </div>
                <div className="rounded-lg bg-white/60 p-2.5">
                  <XCircle className="h-3.5 w-3.5 text-destructive" />
                  <div className="mt-1 font-semibold">{c.missing}</div>
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Missing</div>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      <div className="mt-6 grid grid-cols-12 gap-4">
        <GlassCard className="col-span-12 xl:col-span-7">
          <SectionTitle title="Audit timeline" hint="Last 12 months" />
          <ol className="relative ml-3 space-y-4 border-l border-border/60 pl-6">
            {[
              { t: "PESO External Audit", d: "Passed with 2 observations", when: "Aug 2025", tone: "success" },
              { t: "ISO 14001 Surveillance", d: "3 minor NCs raised, all closed", when: "May 2025", tone: "primary" },
              { t: "Factory Act Inspection", d: "Zero findings", when: "Feb 2025", tone: "success" },
              { t: "OISD Self-Assessment", d: "6 gaps identified, remediation on track", when: "Nov 2024", tone: "warning" },
            ].map((e) => (
              <li key={e.t}>
                <span
                  className={`absolute -left-[7px] mt-1.5 h-3 w-3 rounded-full ${e.tone === "success" ? "bg-success" : e.tone === "warning" ? "bg-warning" : "bg-primary"}`}
                />
                <div className="flex items-center gap-2">
                  <div className="text-sm font-semibold">{e.t}</div>
                  <span className="text-[11px] text-muted-foreground">· {e.when}</span>
                </div>
                <p className="mt-0.5 text-[12.5px] text-muted-foreground">{e.d}</p>
              </li>
            ))}
          </ol>
        </GlassCard>

        <GlassCard className="col-span-12 xl:col-span-5">
          <SectionTitle title="Upcoming deadlines" />
          <div className="space-y-2">
            {[
              { t: "PESO annual submission", when: "21 days", tone: "warning" },
              { t: "IBR boiler certificate renewal", when: "38 days", tone: "primary" },
              { t: "ISO 45001 surveillance", when: "62 days", tone: "primary" },
              { t: "Environmental returns – Q3", when: "9 days", tone: "danger" },
            ].map((d) => (
              <div
                key={d.t}
                className="flex items-center justify-between rounded-xl border border-border/60 bg-white/50 p-3"
              >
                <div className="text-sm font-medium">{d.t}</div>
                <Pill tone={d.tone as never}>in {d.when}</Pill>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
