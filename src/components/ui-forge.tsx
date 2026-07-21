import { cn } from "@/lib/utils";
import { useEffect, useState, type ReactNode } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

export function GlassCard({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return <Tag className={cn("glass p-6", className)}>{children}</Tag>;
}

export function AnimatedNumber({ value, format }: { value: number; format?: (n: number) => string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = performance.now();
    const dur = 900;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [value]);
  return <>{format ? format(display) : display.toLocaleString()}</>;
}

const accents: Record<string, string> = {
  primary: "from-primary/15 to-primary/0 text-primary",
  secondary: "from-secondary/15 to-secondary/0 text-secondary",
  accent: "from-accent/15 to-accent/0 text-accent",
  warning: "from-warning/20 to-warning/0 text-warning",
  danger: "from-destructive/15 to-destructive/0 text-destructive",
  success: "from-success/15 to-success/0 text-success",
};

export function KpiCard({
  label,
  value,
  delta,
  accent = "primary",
  icon,
}: {
  label: string;
  value: string | number;
  delta?: string;
  accent?: keyof typeof accents;
  icon?: ReactNode;
}) {
  const numeric = typeof value === "number";
  const positive = delta ? !delta.startsWith("-") : true;
  return (
    <div className="glass group relative overflow-hidden p-5 transition hover:-translate-y-0.5 hover:shadow-[0_20px_60px_-20px_rgba(15,76,129,0.25)]">
      <div className={cn("absolute inset-0 bg-gradient-to-br opacity-70", accents[accent])} />
      <div className="relative flex items-start justify-between">
        <div className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </div>
        {icon && <div className={cn("opacity-80", accents[accent].split(" ").pop())}>{icon}</div>}
      </div>
      <div className="relative mt-3 text-[28px] font-semibold tracking-tight text-foreground">
        {numeric ? <AnimatedNumber value={value as number} /> : value}
      </div>
      {delta && (
        <div className="relative mt-2 flex items-center gap-1 text-xs font-medium">
          {positive ? (
            <ArrowUpRight className="h-3.5 w-3.5 text-success" />
          ) : (
            <ArrowDownRight className="h-3.5 w-3.5 text-destructive" />
          )}
          <span className={positive ? "text-success" : "text-destructive"}>{delta}</span>
          <span className="text-muted-foreground">vs last 30d</span>
        </div>
      )}
    </div>
  );
}

export function SectionTitle({
  title,
  hint,
  action,
}: {
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <div>
        <h2 className="text-[17px] font-semibold tracking-tight">{title}</h2>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
      {action}
    </div>
  );
}

export function Pill({
  children,
  tone = "default",
}: {
  children: ReactNode;
  tone?: "default" | "primary" | "success" | "warning" | "danger" | "accent";
}) {
  const map = {
    default: "bg-muted text-foreground/75",
    primary: "bg-primary/10 text-primary",
    success: "bg-success/12 text-success",
    warning: "bg-warning/15 text-[#a86224]",
    danger: "bg-destructive/12 text-destructive",
    accent: "bg-accent/12 text-accent",
  } as const;
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium",
        map[tone],
      )}
    >
      {children}
    </span>
  );
}
