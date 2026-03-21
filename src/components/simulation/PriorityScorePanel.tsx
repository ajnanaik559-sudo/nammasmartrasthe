import { motion } from "framer-motion";
import { RoadState, ContextState } from "./types";

interface Props {
  roads: RoadState[];
  context: ContextState;
}

const crowdVal = { low: 0.2, medium: 0.5, high: 1.0 };

export default function PriorityScorePanel({ roads, context }: Props) {
  const maxScore = Math.max(...roads.map((r) => r.priorityScore));

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-2">📊 Priority Score Engine</h3>

      {/* Formula display */}
      <div className="rounded-lg bg-muted p-3 mb-4 font-mono text-[10px] text-muted-foreground leading-relaxed">
        <p className="text-foreground font-semibold text-xs mb-1">Formula:</p>
        <p>Score = <span className="text-primary">(0.5 × density)</span> + <span className="text-destructive">(1.0 × emergency)</span> + <span className="text-warning">(0.3 × crowd)</span> + <span className="text-primary">(0.2 × rain)</span> + <span className="text-eco">(0.4 × school)</span></p>
      </div>

      {/* Scores per road */}
      <div className="space-y-3">
        {roads.map((r) => {
          const isWinner = r.priorityScore === maxScore;
          return (
            <div
              key={r.direction}
              className={`rounded-lg p-3 transition-all ${
                isWinner ? "bg-eco/10 border border-eco/40 glow-accent" : "bg-muted"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-foreground">{r.label}</span>
                <div className="flex items-center gap-2">
                  {isWinner && (
                    <span className="text-[10px] font-bold text-eco bg-eco/20 px-1.5 py-0.5 rounded">
                      🟢 GREEN
                    </span>
                  )}
                  <span className={`text-sm font-mono font-bold ${isWinner ? "text-eco" : "text-foreground"}`}>
                    {r.priorityScore.toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Score breakdown */}
              <div className="flex flex-wrap gap-1">
                <span className="text-[9px] bg-primary/15 text-primary px-1.5 py-0.5 rounded font-mono">
                  D: {(0.5 * r.vehicleDensity / 100).toFixed(2)}
                </span>
                <span className={`text-[9px] px-1.5 py-0.5 rounded font-mono ${r.emergencyVehicle ? "bg-destructive/20 text-destructive" : "bg-secondary text-muted-foreground"}`}>
                  E: {r.emergencyVehicle ? "1.00" : "0.00"}
                </span>
                <span className="text-[9px] bg-warning/15 text-warning px-1.5 py-0.5 rounded font-mono">
                  C: {(0.3 * crowdVal[context.crowdLevel]).toFixed(2)}
                </span>
                <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-mono">
                  R: {context.rain ? "0.20" : "0.00"}
                </span>
                <span className="text-[9px] bg-eco/15 text-eco px-1.5 py-0.5 rounded font-mono">
                  S: {context.schoolZone ? "0.40" : "0.00"}
                </span>
              </div>
              {/* Score bar */}
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${isWinner ? "bg-eco" : "bg-primary/50"}`}
                  animate={{ width: `${Math.min(100, r.priorityScore * 40)}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
