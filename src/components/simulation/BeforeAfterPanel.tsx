import { motion } from "framer-motion";

interface Stats {
  avgWait: number;
  throughput: number;
  congestion: number;
}

interface Props {
  before: Stats;
  after: Stats;
}

function StatBar({ label, before, after, unit, invert }: { label: string; before: number; after: number; unit: string; invert?: boolean }) {
  const improved = invert ? after < before : after > before;
  const pctChange = before === 0 ? 0 : Math.round(((after - before) / before) * 100);
  const absChange = Math.abs(pctChange);

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <span className={`text-xs font-mono font-bold ${improved ? "text-eco" : "text-destructive"}`}>
          {improved ? "↓" : "↑"} {absChange}%
        </span>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="text-[10px] text-muted-foreground mb-0.5">Before</div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-destructive/60"
              animate={{ width: `${Math.min(100, before)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-foreground">{before}{unit}</span>
        </div>
        <div className="flex-1">
          <div className="text-[10px] text-muted-foreground mb-0.5">After (SATS)</div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-eco"
              animate={{ width: `${Math.min(100, after)}%` }}
            />
          </div>
          <span className="text-[10px] font-mono text-eco font-bold">{after}{unit}</span>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfterPanel({ before, after }: Props) {
  const timeSaved = Math.max(0, before.avgWait - after.avgWait);
  const fuelSaved = Math.round(timeSaved * 0.15 * 100) / 100;

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-1">📈 Before vs After — SATS Impact</h3>
      <p className="text-[10px] text-muted-foreground mb-4">Static signals vs Context-Aware Smart Traffic System</p>

      <div className="space-y-4">
        <StatBar label="Avg Wait Time" before={before.avgWait} after={after.avgWait} unit="s" invert />
        <StatBar label="Congestion Index" before={before.congestion} after={after.congestion} unit="%" invert />
        <StatBar label="Throughput" before={before.throughput} after={after.throughput} unit=" v/hr" />
      </div>

      {/* Estimated savings */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-eco/10 border border-eco/30 p-3 text-center">
          <p className="text-lg font-bold font-mono text-eco">{timeSaved}s</p>
          <p className="text-[10px] text-muted-foreground">Time saved per cycle</p>
        </div>
        <div className="rounded-lg bg-eco/10 border border-eco/30 p-3 text-center">
          <p className="text-lg font-bold font-mono text-eco">{fuelSaved}L</p>
          <p className="text-[10px] text-muted-foreground">Est. fuel saved/hr</p>
        </div>
      </div>
    </div>
  );
}
