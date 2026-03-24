import { motion } from "framer-motion";
import { RoadState, ContextState } from "@/components/simulation/types";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface Props {
  roads: RoadState[];
  context: ContextState;
}

const crowdVal = { low: 0.2, medium: 0.5, high: 1.0 };

export default function HomePriorityPanel({ roads, context }: Props) {
  const maxScore = Math.max(...roads.map((r) => r.priorityScore));

  return (
    <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-lg">
      {/* Formula */}
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="rounded-xl bg-muted p-4 mb-5 font-mono text-xs text-muted-foreground leading-relaxed cursor-help">
            <p className="text-foreground font-bold text-sm mb-1 font-display">The Magic Formula ✨</p>
            <p>
              Score = <span className="text-primary font-semibold">(0.5 × density)</span> +{" "}
              <span className="text-destructive font-semibold">(1.0 × emergency)</span> +{" "}
              <span className="text-secondary font-semibold">(0.3 × crowd)</span> +{" "}
              <span className="text-primary font-semibold">(0.2 × rain)</span> +{" "}
              <span className="text-accent font-semibold">(0.4 × school)</span>
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>Higher score = gets green signal first! 🟢</TooltipContent>
      </Tooltip>

      <div className="space-y-3">
        {roads.map((r) => {
          const isWinner = r.priorityScore === maxScore;
          return (
            <motion.div
              key={r.direction}
              layout
              className={`rounded-xl p-4 transition-all ${
                isWinner ? "bg-accent/10 border-2 border-accent/40 glow-accent" : "bg-muted border-2 border-transparent"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold font-display text-foreground">{r.label}</span>
                <div className="flex items-center gap-2">
                  {isWinner && (
                    <span className="text-xs font-bold text-accent bg-accent/20 px-2 py-0.5 rounded-full">
                      🟢 GREEN
                    </span>
                  )}
                  <span className={`text-base font-mono font-bold ${isWinner ? "text-accent" : "text-foreground"}`}>
                    {r.priorityScore.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[10px] bg-primary/15 text-primary px-2 py-0.5 rounded-full font-mono font-semibold">
                  D: {(0.5 * r.vehicleDensity / 100).toFixed(2)}
                </span>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-semibold ${r.emergencyVehicle ? "bg-destructive/20 text-destructive" : "bg-muted text-muted-foreground"}`}>
                  E: {r.emergencyVehicle ? "1.00" : "0.00"}
                </span>
                <span className="text-[10px] bg-secondary/20 text-secondary-foreground px-2 py-0.5 rounded-full font-mono font-semibold">
                  C: {(0.3 * crowdVal[context.crowdLevel]).toFixed(2)}
                </span>
                <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-mono font-semibold">
                  R: {context.rain ? "0.20" : "0.00"}
                </span>
                <span className="text-[10px] bg-accent/15 text-accent px-2 py-0.5 rounded-full font-mono font-semibold">
                  S: {context.schoolZone ? "0.40" : "0.00"}
                </span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${isWinner ? "bg-accent" : "bg-primary/40"}`}
                  animate={{ width: `${Math.min(100, r.priorityScore * 40)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
