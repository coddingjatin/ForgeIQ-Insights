import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, Pill } from "@/components/ui-forge";
import { notifications } from "@/lib/mock-data";
import { Bell, Check } from "lucide-react";

export const Route = createFileRoute("/notifications")({
  head: () => ({
    meta: [
      { title: "Notifications · ForgeIQ" },
      { name: "description", content: "Compliance deadlines, predictive alerts and ingestion updates in one place." },
      { property: "og:title", content: "ForgeIQ Notifications" },
      { property: "og:description", content: "Every alert that matters to your operations team." },
    ],
  }),
  component: Notifications,
});

function Notifications() {
  return (
    <AppShell>
      <PageHeader
        title="Notifications"
        subtitle="Compliance · predictive alerts · ingestion updates"
        actions={
          <button className="glass-soft flex h-9 items-center gap-2 rounded-lg px-3 text-sm">
            <Check className="h-4 w-4" /> Mark all read
          </button>
        }
      />
      <GlassCard>
        <div className="divide-y divide-border/60">
          {[...notifications, ...notifications].map((n, i) => (
            <div key={i} className="flex items-start gap-3 py-3">
              <div
                className={`mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl ${
                  n.severity === "danger"
                    ? "bg-destructive/12 text-destructive"
                    : n.severity === "warning"
                      ? "bg-warning/15 text-warning"
                      : "bg-success/12 text-success"
                }`}
              >
                <Bell className="h-4 w-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">{n.title}</div>
                  <Pill tone={n.severity as never}>{n.type}</Pill>
                </div>
                <div className="text-[12px] text-muted-foreground">{n.time}</div>
              </div>
              <button className="text-[11px] text-muted-foreground hover:text-foreground">Dismiss</button>
            </div>
          ))}
        </div>
      </GlassCard>
    </AppShell>
  );
}
