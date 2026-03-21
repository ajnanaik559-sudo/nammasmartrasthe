import { motion, AnimatePresence } from "framer-motion";

interface Props {
  explanations: string[];
}

export default function ExplainPanel({ explanations }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h3 className="text-sm font-semibold text-foreground mb-1">🧠 Why This Signal Is Green?</h3>
      <p className="text-[10px] text-muted-foreground mb-3">Explainable AI — every decision is transparent</p>

      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {explanations.map((exp, i) => (
            <motion.div
              key={exp}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-lg bg-muted p-3 text-xs text-foreground"
            >
              {exp}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
