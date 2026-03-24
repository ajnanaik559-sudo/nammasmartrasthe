import { motion, AnimatePresence } from "framer-motion";

interface Props {
  explanations: string[];
}

export default function HomeExplainPanel({ explanations }: Props) {
  return (
    <div className="rounded-2xl border-2 border-border bg-card p-6 shadow-lg">
      <p className="text-sm text-muted-foreground mb-4">Every decision is transparent — no black boxes!</p>

      <div className="space-y-2.5">
        <AnimatePresence mode="popLayout">
          {explanations.map((exp, i) => (
            <motion.div
              key={exp}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl bg-muted p-4 text-sm text-foreground border border-border"
            >
              {exp}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
