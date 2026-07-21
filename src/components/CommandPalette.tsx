import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { useNavigate } from "@tanstack/react-router";
import {
  FileText,
  LayoutDashboard,
  MessageSquare,
  Network,
  ShieldCheck,
  Upload,
  Wrench,
  AlertTriangle,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const navigate = useNavigate();
  const go = (to: string) => {
    onOpenChange(false);
    navigate({ to });
  };
  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search ForgeIQ — assets, documents, actions…" />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Navigate">
          <CommandItem onSelect={() => go("/")}>
            <LayoutDashboard /> Dashboard
          </CommandItem>
          <CommandItem onSelect={() => go("/knowledge-hub")}>
            <FileText /> Knowledge Hub
          </CommandItem>
          <CommandItem onSelect={() => go("/knowledge-graph")}>
            <Network /> Knowledge Graph
          </CommandItem>
          <CommandItem onSelect={() => go("/copilot")}>
            <MessageSquare /> AI Copilot
          </CommandItem>
          <CommandItem onSelect={() => go("/maintenance")}>
            <Wrench /> Maintenance Intelligence
          </CommandItem>
          <CommandItem onSelect={() => go("/compliance")}>
            <ShieldCheck /> Compliance Center
          </CommandItem>
          <CommandItem onSelect={() => go("/incidents")}>
            <AlertTriangle /> Incident Intelligence
          </CommandItem>
          <CommandItem onSelect={() => go("/analytics")}>
            <BarChart3 /> Analytics
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Assets">
          {["P-102", "HX-401", "CV-220", "Boiler-05", "Compressor-02", "Tank-T17"].map((a) => (
            <CommandItem key={a} onSelect={() => { onOpenChange(false); toast(`Opening asset ${a}`); }}>
              <Wrench /> {a}
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => { onOpenChange(false); toast.success("Ingestion panel opened"); }}>
            <Upload /> Upload documents
          </CommandItem>
          <CommandItem onSelect={() => { onOpenChange(false); go("/copilot"); }}>
            <Sparkles /> Ask AI Copilot
          </CommandItem>
          <CommandItem onSelect={() => { onOpenChange(false); toast.success("Report queued for generation"); }}>
            <FileText /> Create compliance report
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}
