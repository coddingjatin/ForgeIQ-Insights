import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Factory } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · ForgeIQ" },
      { name: "description", content: "Sign in to ForgeIQ — the enterprise operating system for industrial knowledge." },
      { property: "og:title", content: "ForgeIQ · Sign in" },
      { property: "og:description", content: "Access your industrial knowledge workspace." },
    ],
  }),
  component: Login,
});

function Login() {
  const nav = useNavigate();
  const [email, setEmail] = useState("arjun.deshmukh@tatasteel.com");
  const [password, setPassword] = useState("••••••••••••");

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      <div className="absolute inset-0 blueprint-grid" />
      <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/70" />
      <div className="relative w-full max-w-md">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <Factory className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="text-xl font-semibold tracking-tight">ForgeIQ</div>
            <div className="text-[11px] text-muted-foreground">Industrial Knowledge Intelligence</div>
          </div>
        </div>
        <div className="glass p-8">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to your workspace</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Use your enterprise SSO or corporate email to continue.
          </p>
          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              nav({ to: "/" });
            }}
          >
            <div>
              <div className="mb-1.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Email
              </div>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                  Password
                </span>
                <a className="text-[11px] font-medium text-primary hover:underline" href="#">
                  Forgot?
                </a>
              </div>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button
              type="submit"
              className="h-11 w-full rounded-xl bg-primary text-sm font-medium text-primary-foreground shadow-sm hover:opacity-90"
            >
              Continue
            </button>
            <button
              type="button"
              className="glass-soft h-11 w-full rounded-xl text-sm font-medium hover:bg-white/70"
            >
              Continue with SSO
            </button>
          </form>
          <p className="mt-6 text-center text-[11.5px] text-muted-foreground">
            Protected by enterprise SSO · SOC 2 Type II · ISO 27001
          </p>
        </div>
        <div className="mt-4 text-center text-[12px] text-muted-foreground">
          Need access?{" "}
          <Link to="/" className="text-primary hover:underline">
            Contact your workspace admin
          </Link>
        </div>
      </div>
    </div>
  );
}
