import { useEffect, useRef, useState } from "react";
import { CONSOLE_LOG } from "../data/hub";
import { Circle, Maximize2, Trash2 } from "lucide-react";

const LEVEL_COLOR: Record<string, string> = {
  INFO: "text-phosphor/70",
  OK:   "text-phosphor",
  WARN: "text-amber-crt",
  ERR:  "text-destructive",
  AI:   "text-violet",
};

export function CrtConsole({ compact = false }: { compact?: boolean }) {
  const [lines, setLines] = useState(CONSOLE_LOG.slice(0, compact ? 8 : CONSOLE_LOG.length));
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (compact) return;
    let i = 0;
    const t = setInterval(() => {
      setLines((prev) => {
        const next = CONSOLE_LOG[(prev.length + i) % CONSOLE_LOG.length];
        i++;
        return [...prev, { ...next, ts: new Date().toISOString().slice(11, 23) }].slice(-80);
      });
    }, 1400);
    return () => clearInterval(t);
  }, [compact]);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight });
  }, [lines]);

  return (
    <section className="glass overflow-hidden rounded-2xl">
      <div className="flex items-center justify-between border-b border-border bg-background/60 px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-crt/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-phosphor/70 shadow-[0_0_6px_oklch(0.86_0.22_145)]" />
          <div className="ml-2 font-mono text-[11px] text-muted-foreground">
            gateway@auto-loop:~$ tail -f /var/log/gemini-cli.log
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="rounded p-1 text-muted-foreground hover:text-foreground"><Trash2 className="h-3.5 w-3.5" /></button>
          <button className="rounded p-1 text-muted-foreground hover:text-foreground"><Maximize2 className="h-3.5 w-3.5" /></button>
        </div>
      </div>
      <div className="relative crt">
        <div className="crt-scan" />
        <div ref={ref} className={`relative max-h-[520px] overflow-y-auto px-5 py-4 font-mono text-[11.5px] leading-relaxed ${compact ? "max-h-[260px]" : ""}`}>
          {lines.map((l, i) => (
            <div key={i} className="flex items-baseline gap-3">
              <span className="text-phosphor/40 tabular-nums">{l.ts}</span>
              <span className={`w-10 shrink-0 font-semibold ${LEVEL_COLOR[l.level]}`}>{l.level}</span>
              <span className="w-20 shrink-0 text-phosphor/60">[{l.tag}]</span>
              <span className="text-phosphor/90">{l.msg}</span>
            </div>
          ))}
          <div className="mt-1 flex items-center gap-2 text-phosphor/80">
            <Circle className="h-2 w-2 animate-pulse fill-phosphor text-phosphor" />
            <span>auto-loop active · awaiting next critic verdict<span className="ml-0.5 inline-block w-2 animate-pulse">▍</span></span>
          </div>
        </div>
      </div>
    </section>
  );
}