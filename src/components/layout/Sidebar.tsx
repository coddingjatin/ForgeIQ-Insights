import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  FolderTree,
  FileText,
  Network,
  MessageSquare,
  Wrench,
  ShieldCheck,
  AlertTriangle,
  BarChart3,
  Users,
  Bell,
  Settings,
  ChevronsLeft,
  Moon,
  Sun,
  Factory,
} from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/knowledge-hub", label: "Knowledge Hub", icon: FolderTree },
  { to: "/documents", label: "Documents", icon: FileText },
  { to: "/knowledge-graph", label: "Knowledge Graph", icon: Network },
  { to: "/copilot", label: "AI Copilot", icon: MessageSquare },
  { to: "/maintenance", label: "Maintenance Intelligence", icon: Wrench },
  { to: "/compliance", label: "Compliance Center", icon: ShieldCheck },
  { to: "/incidents", label: "Incident Intelligence", icon: AlertTriangle },
  { to: "/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/experts", label: "Experts", icon: Users },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);

  return (
    <aside
      className={cn(
        "sticky top-0 z-30 flex h-screen flex-col glass-soft border-r border-border/50 transition-[width] duration-300",
        collapsed ? "w-[76px]" : "w-[264px]",
      )}
      style={{ borderRadius: 0 }}
    >
      <div className="flex items-center justify-between px-4 py-5">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
            <Factory className="h-5 w-5" />
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-[15px] font-semibold tracking-tight">ForgeIQ</div>
              <div className="text-[11px] text-muted-foreground">Industrial Intelligence</div>
            </div>
          )}
        </Link>
        <button
          onClick={onToggle}
          className={cn(
            "flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-muted",
            collapsed && "rotate-180",
          )}
          aria-label="Toggle sidebar"
        >
          <ChevronsLeft className="h-4 w-4" />
        </button>
      </div>

      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 pb-4">
        {nav.map(({ to, label, icon: Icon, exact }) => {
          const active = exact ? pathname === to : pathname === to || pathname.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition",
                active
                  ? "bg-primary/8 text-primary shadow-[inset_0_0_0_1px_rgba(15,76,129,0.12)]"
                  : "text-foreground/75 hover:bg-white/60 hover:text-foreground",
              )}
            >
              <Icon
                className={cn("h-[18px] w-[18px] shrink-0", active ? "text-primary" : "text-muted-foreground")}
              />
              {!collapsed && <span className="truncate">{label}</span>}
              {!collapsed && active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary pulse-dot" />
              )}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border/60 p-3">
        <div className={cn("flex items-center gap-3 rounded-xl p-2", collapsed && "justify-center")}>
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-xs font-semibold text-white">
            AD
          </div>
          {!collapsed && (
            <div className="min-w-0 flex-1 leading-tight">
              <div className="truncate text-sm font-medium">Arjun Deshmukh</div>
              <div className="truncate text-[11px] text-muted-foreground">Hazira · Reliability</div>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => setDark((d) => !d)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
          )}
        </div>
        {!collapsed && (
          <div className="mt-2 flex items-center justify-between rounded-lg bg-white/50 px-3 py-2 text-[11px] text-muted-foreground">
            <span>Workspace</span>
            <span className="font-medium text-foreground">Tata Steel · Jamshedpur</span>
          </div>
        )}
      </div>
    </aside>
  );
}
