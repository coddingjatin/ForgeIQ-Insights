import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, Pill, SectionTitle } from "@/components/ui-forge";
import { experts } from "@/lib/mock-data";
import { Mail, MessageCircle, Star } from "lucide-react";

export const Route = createFileRoute("/experts")({
  head: () => ({
    meta: [
      { title: "Experts · ForgeIQ" },
      { name: "description", content: "Find the right SME for every asset, procedure or incident." },
      { property: "og:title", content: "ForgeIQ Experts" },
      { property: "og:description", content: "Directory of internal experts ranked by asset coverage." },
    ],
  }),
  component: Experts,
});

const initials = (n: string) => n.split(" ").map((x) => x[0]).slice(0, 2).join("");

function Experts() {
  return (
    <AppShell>
      <PageHeader title="Experts" subtitle="Internal subject matter experts mapped to assets and procedures" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {experts.map((e) => (
          <GlassCard key={e.name}>
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-lg font-semibold text-white">
                {initials(e.name)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-base font-semibold">{e.name}</div>
                <div className="text-[12px] text-muted-foreground">{e.role}</div>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-warning">
                  <Star className="h-3 w-3 fill-warning" />
                  {e.rating} · {e.plant}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Coverage</div>
              <div className="mt-1 flex flex-wrap gap-1.5">
                {e.assets.map((a) => (
                  <Pill key={a} tone="primary">
                    {a}
                  </Pill>
                ))}
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="glass-soft flex flex-1 items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium">
                <MessageCircle className="h-3.5 w-3.5" /> Message
              </button>
              <button className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-primary py-2 text-xs font-medium text-primary-foreground">
                <Mail className="h-3.5 w-3.5" /> Email
              </button>
            </div>
          </GlassCard>
        ))}
      </div>
    </AppShell>
  );
}
