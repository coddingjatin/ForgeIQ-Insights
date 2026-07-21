import { Search, Bell, Upload, ChevronDown, Command, Clock } from "lucide-react";
import { useEffect, useState } from "react";
import { CommandPalette } from "@/components/CommandPalette";
import { toast } from "sonner";

export function TopBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-20 border-b border-border/50 bg-background/60 backdrop-blur-xl">
      <div className="flex h-16 items-center gap-4 px-6">
        <button
          onClick={() => setOpen(true)}
          className="glass-soft flex h-10 flex-1 max-w-xl items-center gap-3 rounded-xl px-4 text-left text-sm text-muted-foreground transition hover:bg-white/70"
        >
          <Search className="h-4 w-4" />
          <span className="flex-1">Search assets, documents, incidents, people…</span>
          <kbd className="flex items-center gap-1 rounded-md border border-border bg-white/70 px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
            <Command className="h-3 w-3" /> K
          </kbd>
        </button>

        <div className="ml-auto flex items-center gap-2">
          <button
            className="glass-soft hidden h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-foreground/80 transition hover:bg-white/70 md:flex"
            onClick={() => toast("Recent activity", { description: "Opened 3 documents · 2 queries" })}
          >
            <Clock className="h-4 w-4" /> Recent
          </button>

          <button
            className="glass-soft relative flex h-10 w-10 items-center justify-center rounded-xl text-foreground/80 transition hover:bg-white/70"
            onClick={() => toast("4 new notifications")}
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-destructive pulse-dot" />
          </button>

          <button className="glass-soft hidden h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-foreground/80 transition hover:bg-white/70 md:flex">
            <span className="h-2 w-2 rounded-full bg-success" />
            Tata Steel · Jamshedpur
            <ChevronDown className="h-3.5 w-3.5" />
          </button>

          <button
            onClick={() => toast.success("Upload ready", { description: "Drag files or open the ingestion panel." })}
            className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            <Upload className="h-4 w-4" /> Upload
          </button>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-semibold text-white">
            AD
          </div>
        </div>
      </div>

      <CommandPalette open={open} onOpenChange={setOpen} />
    </header>
  );
}
