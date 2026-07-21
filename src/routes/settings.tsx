import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, Pill, SectionTitle } from "@/components/ui-forge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Copy, Key } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings · ForgeIQ" },
      { name: "description", content: "Workspace, users, permissions, integrations, API keys and audit logs." },
      { property: "og:title", content: "ForgeIQ Settings" },
      { property: "og:description", content: "Enterprise administration for your ForgeIQ workspace." },
    ],
  }),
  component: Settings,
});

function Settings() {
  return (
    <AppShell>
      <PageHeader title="Settings" subtitle="Workspace administration" />
      <GlassCard>
        <Tabs defaultValue="workspace">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8">
            <TabsTrigger value="workspace">Workspace</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="integrations">Integrations</TabsTrigger>
            <TabsTrigger value="api">API Keys</TabsTrigger>
            <TabsTrigger value="themes">Themes</TabsTrigger>
            <TabsTrigger value="notifs">Notifications</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
          </TabsList>

          <TabsContent value="workspace" className="mt-6 max-w-xl space-y-4">
            <Field label="Workspace name" defaultValue="Tata Steel · Jamshedpur" />
            <Field label="Region" defaultValue="Asia · Mumbai" />
            <Field label="Retention policy" defaultValue="10 years (regulatory)" />
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <div className="space-y-2">
              {[
                ["Arjun Deshmukh", "Owner"],
                ["Priya Iyer", "Admin"],
                ["Rahul Menon", "Editor"],
                ["Neha Kulkarni", "Editor"],
                ["S. Rangarajan", "Viewer"],
              ].map(([n, r]) => (
                <div key={n} className="flex items-center gap-3 rounded-xl border border-border/60 bg-white/50 p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-semibold text-white">
                    {n.split(" ").map((x) => x[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 text-sm font-medium">{n}</div>
                  <Pill tone={r === "Owner" ? "primary" : r === "Admin" ? "accent" : "default"}>{r}</Pill>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="permissions" className="mt-6 space-y-3">
            {[
              "Ingest documents",
              "Approve compliance evidence",
              "Modify knowledge graph",
              "Publish RCA",
              "Manage integrations",
            ].map((p) => (
              <div key={p} className="flex items-center justify-between rounded-xl border border-border/60 bg-white/50 p-3">
                <div className="text-sm font-medium">{p}</div>
                <Switch defaultChecked />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="integrations" className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
            {[
              ["SAP PM", true],
              ["Maximo", true],
              ["OSIsoft PI", false],
              ["Aveva", false],
              ["SharePoint", true],
              ["Slack", true],
            ].map(([n, on]) => (
              <div key={n as string} className="rounded-xl border border-border/60 bg-white/50 p-4">
                <div className="text-sm font-semibold">{n}</div>
                <div className="mt-1 text-[11px] text-muted-foreground">
                  {on ? "Connected · syncing hourly" : "Not connected"}
                </div>
                <div className="mt-3">
                  <Pill tone={on ? "success" : "default"}>{on ? "Active" : "Inactive"}</Pill>
                </div>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="api" className="mt-6 space-y-3">
            {[
              ["Production", "fiq_live_••••••••8f21"],
              ["Staging", "fiq_stg_••••••••b104"],
            ].map(([env, key]) => (
              <div key={env} className="flex items-center gap-3 rounded-xl border border-border/60 bg-white/50 p-3">
                <Key className="h-4 w-4 text-primary" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-medium">{env}</div>
                  <div className="font-mono text-[12px] text-muted-foreground">{key}</div>
                </div>
                <button
                  onClick={() => toast.success("Key copied to clipboard")}
                  className="glass-soft flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy
                </button>
              </div>
            ))}
          </TabsContent>

          <TabsContent value="themes" className="mt-6 space-y-3">
            <div className="text-sm text-muted-foreground">Choose your workspace surface.</div>
            <div className="flex gap-3">
              {["Light", "Dark", "Auto"].map((t) => (
                <button key={t} className="glass-soft rounded-xl px-4 py-3 text-sm font-medium">
                  {t}
                </button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notifs" className="mt-6 space-y-3">
            {[
              "Predictive maintenance alerts",
              "Compliance deadlines",
              "Ingestion completions",
              "Weekly digest",
            ].map((n) => (
              <div key={n} className="flex items-center justify-between rounded-xl border border-border/60 bg-white/50 p-3">
                <div className="text-sm font-medium">{n}</div>
                <Switch defaultChecked />
              </div>
            ))}
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            <SectionTitle title="Recent activity" />
            <div className="space-y-2 font-mono text-[12px]">
              {[
                "2025-10-06 09:12  A.Deshmukh  APPROVE  RCA-2025-014",
                "2025-10-06 08:47  P.Iyer      UPLOAD   14 documents · Unit-3",
                "2025-10-06 08:12  System      SYNC     SAP PM · 218 work orders",
                "2025-10-05 21:34  R.Menon     UPDATE   SOP-SF-014 Rev 6",
              ].map((l) => (
                <div key={l} className="rounded-lg bg-white/60 px-3 py-2">{l}</div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </GlassCard>
    </AppShell>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <Input defaultValue={defaultValue} />
    </div>
  );
}
