import { motion } from "framer-motion";
import { Scenario } from "@/components/simulation/types";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface Props {
  scenarios: Scenario[];
  activeScenario: string | null;
  onApply: (id: string) => void;
}

const scenarioTooltips: Record<string, string> = {
  rain: "Brace yourself, it's Bengaluru rain! ☔",
  festival: "Karaga or Ganesha procession vibes! 🎊",
  school: "Every parent becomes a traffic cop! 👨‍👩‍👧",
  emergency: "Make way for the ambulance siren! 🚨",
  accident: "Silk Board doing Silk Board things 😅",
};

const scenarioColors: Record<string, string> = {
  rain: "from-primary/20 to-primary/5 border-primary/30",
  festival: "from-secondary/20 to-secondary/5 border-secondary/30",
  school: "from-accent/20 to-accent/5 border-accent/30",
  emergency: "from-destructive/20 to-destructive/5 border-destructive/30",
  accident: "from-warning/20 to-warning/5 border-warning/30",
};

export default function HomeScenarioCards({ scenarios, activeScenario, onApply }: Props) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
      {scenarios.map((s, i) => (
        <Tooltip key={s.id}>
          <TooltipTrigger asChild>
            <motion.button
              onClick={() => onApply(s.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className={`text-left rounded-2xl p-5 border-2 transition-all bg-gradient-to-br shadow-md ${
                activeScenario === s.id
                  ? "ring-2 ring-primary ring-offset-2 ring-offset-background " + (scenarioColors[s.id] || "")
                  : scenarioColors[s.id] || "border-border bg-card"
              }`}
            >
              <span className="text-3xl block mb-3">{s.icon}</span>
              <h3 className="font-display text-base font-bold text-foreground mb-1">{s.label}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">{s.description}</p>
              {activeScenario === s.id && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-3 text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full inline-block"
                >
                  ✓ Active
                </motion.div>
              )}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent>{scenarioTooltips[s.id] || "Click to activate!"}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
