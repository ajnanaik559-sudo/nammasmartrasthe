import { motion } from "framer-motion";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface Stats {
  avgWait: number;
  throughput: number;
  congestion: number;
}

interface Props {
  before: Stats;
  after: Stats;
}

function BarCompare({ label, before, after, unit, invert, tooltip }: {
  label: string; before: number; after: number; unit: string; invert?: boolean; tooltip: string;
}) {
  const improved = invert ? after < before : after > before;
  const pctChange = before === 0 ? 0 : Math.round(((after - before) / before) * 100);
  const absChange = Math.abs(pctChange);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="rounded-xl bg-muted p-4 cursor-help">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-bold font-display text-foreground">{label}</span>
            <span className={`text-sm font-mono font-bold px-2 py-0.5 rounded-full ${
              improved ? "text-accent bg-accent/15" : "text-destructive bg-destructive/15"
            }`}>
              {improved ? "↓" : "↑"} {absChange}%
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <div className="text-xs text-muted-foreground mb-1">🔴 Old System</div>
              <div className="h-3 rounded-full bg-card overflow-hidden">
                <motion.div className="h-full rounded-full bg-destructive/50" animate={{ width: `${Math.min(100, before)}%` }} />
              </div>
              <span className="text-xs font-mono text-foreground mt-1 block">{before}{unit}</span>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">🟢 Smart Raste</div>
              <div className="h-3 rounded-full bg-card overflow-hidden">
                <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${Math.min(100, after)}%` }} />
              </div>
              <span className="text-xs font-mono text-accent font-bold mt-1 block">{after}{unit}</span>
            </div>
          </div>
        </div>
      </TooltipTrigger>
      <TooltipContent>{tooltip}</TooltipContent>
    </Tooltip>
  );
}

export default function HomeBeforeAfter({ before, after }: Props) {
  const timeSaved = Math.max(0, before.avgWait - after.avgWait);
  const fuelSaved = Math.round(timeSaved * 0.15 * 100) / 100;

  return (
    <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-lg">
      <div className="space-y-4">
        <BarCompare label="⏱️ Avg Wait Time" before={before.avgWait} after={after.avgWait} unit="s" invert tooltip="Less waiting = less road rage! 😌" />
        <BarCompare label="🚗 Congestion Index" before={before.congestion} after={after.congestion} unit="%" invert tooltip="Lower congestion = happier commuters! 🎉" />
        <BarCompare label="🏎️ Throughput" before={before.throughput} after={after.throughput} unit=" v/hr" tooltip="More vehicles getting through per hour! 🚀" />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="rounded-xl bg-accent/10 border-2 border-accent/30 p-4 text-center cursor-help">
              <p className="text-2xl font-extrabold font-display text-accent">{timeSaved}s</p>
              <p className="text-xs text-muted-foreground mt-1">Time saved per cycle</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>That's {timeSaved} extra seconds to sip your filter coffee! ☕</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="rounded-xl bg-accent/10 border-2 border-accent/30 p-4 text-center cursor-help">
              <p className="text-2xl font-extrabold font-display text-accent">{fuelSaved}L</p>
              <p className="text-xs text-muted-foreground mt-1">Est. fuel saved/hr</p>
            </div>
          </TooltipTrigger>
          <TooltipContent>Planet Earth says thank you! 🌍💚</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
