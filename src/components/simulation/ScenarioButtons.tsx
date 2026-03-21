import { motion } from "framer-motion";
import { Scenario } from "./types";

interface Props {
  scenarios: Scenario[];
  activeScenario: string | null;
  onApply: (id: string) => void;
}

export default function ScenarioButtons({ scenarios, activeScenario, onApply }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-1">🎬 Scenario Demo Mode</h3>
      <p className="text-[10px] text-muted-foreground mb-3">Click a scenario to see real-time system adaptation</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {scenarios.map((s) => (
          <motion.button
            key={s.id}
            onClick={() => onApply(s.id)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`text-left rounded-lg p-3 transition-all ${
              activeScenario === s.id
                ? "bg-primary/10 border border-primary/40 glow-primary"
                : "bg-muted hover:bg-secondary border border-transparent"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-base">{s.icon}</span>
              <span className="text-xs font-semibold text-foreground">{s.label}</span>
            </div>
            <p className="text-[10px] text-muted-foreground">{s.description}</p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
