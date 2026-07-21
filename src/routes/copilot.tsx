import { createFileRoute } from "@tanstack/react-router";
import { AppShell, PageHeader } from "@/components/layout/AppShell";
import { GlassCard, Pill, SectionTitle } from "@/components/ui-forge";
import { copilotSample, copilotSuggestions } from "@/lib/mock-data";
import { Send, Sparkles, FileText, Network, Wrench, ThumbsUp, ThumbsDown, ClipboardCopy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/copilot")({
  head: () => ({
    meta: [
      { title: "AI Copilot · ForgeIQ" },
      { name: "description", content: "Ask any question about your assets, procedures and incidents. Grounded in your knowledge graph." },
      { property: "og:title", content: "ForgeIQ Copilot" },
      { property: "og:description", content: "Cited answers from your industrial knowledge base." },
    ],
  }),
  component: Copilot,
});

type Turn = { role: "user" | "assistant"; text: string; sample?: boolean };

function Copilot() {
  const [turns, setTurns] = useState<Turn[]>([
    { role: "user", text: copilotSample.question },
    { role: "assistant", text: copilotSample.answer, sample: true },
  ]);
  const [input, setInput] = useState("");

  const send = (text?: string) => {
    const q = (text ?? input).trim();
    if (!q) return;
    setTurns((t) => [...t, { role: "user", text: q }]);
    setInput("");
    setTimeout(() => {
      setTurns((t) => [
        ...t,
        {
          role: "assistant",
          text:
            "Based on the linked knowledge graph and 6 supporting documents, here's what ForgeIQ found. Confidence 88%. See sources on the right for citations.",
          sample: true,
        },
      ]);
    }, 550);
  };

  return (
    <AppShell>
      <PageHeader
        title="AI Copilot"
        subtitle="Grounded in your plant knowledge · answers are cited and traceable"
      />
      <div className="grid grid-cols-12 gap-4">
        <GlassCard className="col-span-12 flex flex-col lg:col-span-8" >
          <div className="flex-1 space-y-4 overflow-y-auto pr-1" style={{ maxHeight: 560 }}>
            {turns.map((t, i) =>
              t.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <div className="max-w-[80%] rounded-2xl rounded-tr-md bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                    {t.text}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="max-w-[80%] rounded-2xl rounded-tl-md bg-white/70 p-4 text-[13.5px] leading-relaxed">
                    {t.sample && (
                      <div className="mb-2 flex items-center gap-2 text-[11px]">
                        <Pill tone="success">Confidence {copilotSample.confidence}%</Pill>
                        <span className="text-muted-foreground">4 sources · 3 assets referenced</span>
                      </div>
                    )}
                    <p>{t.text}</p>
                    {t.sample && (
                      <>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {copilotSample.related.map((r) => (
                            <Pill key={r} tone="primary">
                              {r}
                            </Pill>
                          ))}
                        </div>
                        <div className="mt-3 flex items-center gap-1 text-muted-foreground">
                          <button className="rounded-lg p-1.5 hover:bg-white/70" onClick={() => toast.success("Feedback logged")}>
                            <ThumbsUp className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded-lg p-1.5 hover:bg-white/70" onClick={() => toast("Feedback logged")}>
                            <ThumbsDown className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded-lg p-1.5 hover:bg-white/70" onClick={() => { navigator.clipboard?.writeText(t.text); toast("Copied"); }}>
                            <ClipboardCopy className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ),
            )}
          </div>

          <div className="mt-4">
            <div className="mb-2 flex flex-wrap gap-1.5">
              {copilotSuggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border/60 bg-white/60 px-3 py-1.5 text-[12px] text-foreground/80 hover:border-primary/40 hover:text-primary"
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="glass-soft flex items-center gap-2 rounded-2xl p-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Ask about an asset, procedure, incident or regulation…"
                className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
              />
              <button
                onClick={() => send()}
                className="flex h-9 items-center gap-1.5 rounded-xl bg-primary px-3 text-xs font-medium text-primary-foreground hover:opacity-90"
              >
                <Send className="h-3.5 w-3.5" /> Ask
              </button>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="col-span-12 lg:col-span-4">
          <SectionTitle title="Sources" hint="Grounding for this answer" />
          <div className="space-y-2">
            {copilotSample.sources.map((s) => (
              <button
                key={s.title}
                className="flex w-full items-start gap-3 rounded-xl border border-border/60 bg-white/50 p-3 text-left transition hover:border-primary/30 hover:bg-white/80"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/8 text-primary">
                  <FileText className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[13px] font-medium">{s.title}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-[11px] text-muted-foreground">
                    <Pill>{s.type}</Pill>
                    <span>{s.updated}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <SectionTitle title="Explore" />
          <div className="grid grid-cols-2 gap-2">
            <button className="rounded-xl border border-border/60 bg-white/50 p-3 text-left hover:bg-white/80">
              <Network className="h-4 w-4 text-primary" />
              <div className="mt-2 text-[12px] font-medium">Open in graph</div>
            </button>
            <button className="rounded-xl border border-border/60 bg-white/50 p-3 text-left hover:bg-white/80">
              <Wrench className="h-4 w-4 text-accent" />
              <div className="mt-2 text-[12px] font-medium">Create work order</div>
            </button>
          </div>
        </GlassCard>
      </div>
    </AppShell>
  );
}
