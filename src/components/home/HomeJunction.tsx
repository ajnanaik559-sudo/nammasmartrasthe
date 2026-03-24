import { motion } from "framer-motion";
import { RoadState, Direction } from "@/components/simulation/types";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";

interface Props {
  roads: RoadState[];
}

const SIGNAL_COLORS = {
  red: "bg-destructive shadow-[0_0_12px_hsl(0,80%,55%,0.5)]",
  yellow: "bg-secondary shadow-[0_0_12px_hsl(45,95%,55%,0.5)]",
  green: "bg-accent shadow-[0_0_12px_hsl(145,58%,48%,0.5)]",
};

const dirPos: Record<Direction, { x: number; y: number }> = {
  north: { x: 50, y: 8 },
  south: { x: 50, y: 92 },
  east: { x: 92, y: 50 },
  west: { x: 8, y: 50 },
};

const tooltips: Record<Direction, string> = {
  north: "Hosur Road — the legendary traffic jam! 🚗",
  south: "Bannerghatta Rd — zoo traffic on weekends! 🐘",
  east: "Sarjapur Road — IT crowd rush! 💻",
  west: "Kanakapura Rd — smooth until it isn't! 🛺",
};

function VehicleDots({ density, direction }: { density: number; direction: Direction }) {
  const count = Math.round(density / 18);
  const isVertical = direction === "north" || direction === "south";
  return (
    <>
      {Array.from({ length: count }).map((_, i) => {
        const offset = (i + 1) * (isVertical ? 6 : 8);
        const jitter = (Math.random() - 0.5) * 3;
        const pos = dirPos[direction];
        const x = isVertical ? pos.x + jitter : direction === "east" ? pos.x - offset : pos.x + offset;
        const y = isVertical ? (direction === "north" ? pos.y + offset : pos.y - offset) : pos.y + jitter;
        return (
          <motion.rect
            key={`${direction}-${i}`}
            x={`${x - 1}%`}
            y={`${y - 0.8}%`}
            width="2.2%"
            height="1.8%"
            rx="1.5"
            fill={density > 75 ? "hsl(0 72% 55%)" : density > 45 ? "hsl(38 92% 55%)" : "hsl(145 58% 48%)"}
            opacity={0.85}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        );
      })}
    </>
  );
}

export default function HomeJunction({ roads }: Props) {
  return (
    <div className="rounded-2xl border-2 border-border bg-card p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display text-base font-bold text-foreground">🚦 Silk Board Junction</h3>
        <div className="flex items-center gap-1.5 text-xs font-mono text-accent">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-accent" />
          </span>
          LIVE
        </div>
      </div>

      <div className="relative aspect-square max-w-[380px] mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <rect x="38" y="0" width="24" height="100" rx="2" className="fill-muted" />
          <rect x="0" y="38" width="100" height="24" rx="2" className="fill-muted" />
          <rect x="38" y="38" width="24" height="24" className="fill-primary/10" stroke="hsl(199 89% 48% / 0.3)" strokeWidth="0.4" strokeDasharray="2 1" />
          {/* Road markings */}
          {[15, 30, 70, 85].map((y) => (
            <rect key={`vl-${y}`} x="49.5" y={y} width="1" height="4" className="fill-secondary/40" rx="0.5" />
          ))}
          {[15, 30, 70, 85].map((x) => (
            <rect key={`hl-${x}`} x={x} y="49.5" width="4" height="1" className="fill-secondary/40" rx="0.5" />
          ))}
          {roads.map((r) => (
            <VehicleDots key={r.direction} density={r.vehicleDensity} direction={r.direction} />
          ))}
        </svg>

        {/* Signal indicators */}
        {roads.map((r) => {
          const pos = dirPos[r.direction];
          return (
            <Tooltip key={r.direction}>
              <TooltipTrigger asChild>
                <div
                  className="absolute flex flex-col items-center gap-1 cursor-help"
                  style={{ left: `${pos.x}%`, top: `${pos.y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <motion.div
                    className={`h-5 w-5 rounded-full ${SIGNAL_COLORS[r.signal]}`}
                    animate={{ scale: r.signal === "green" ? [1, 1.25, 1] : 1 }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-[10px] font-mono text-foreground font-bold">{r.timer}s</span>
                  {r.emergencyVehicle && (
                    <motion.span className="text-sm" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>🚑</motion.span>
                  )}
                </div>
              </TooltipTrigger>
              <TooltipContent>{tooltips[r.direction]}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>

      {/* Road labels */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {roads.map((r) => (
          <Tooltip key={r.direction}>
            <TooltipTrigger asChild>
              <div className={`flex items-center justify-between rounded-xl p-2.5 text-xs font-mono cursor-help transition-all ${
                r.signal === "green" ? "bg-accent/10 border-2 border-accent/30" : "bg-muted border-2 border-transparent"
              }`}>
                <span className="text-muted-foreground capitalize">{r.direction}</span>
                <span className={r.signal === "green" ? "text-accent font-bold" : "text-foreground"}>{r.vehicleDensity}%</span>
              </div>
            </TooltipTrigger>
            <TooltipContent>{r.label} — Density: {r.vehicleDensity}%</TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
