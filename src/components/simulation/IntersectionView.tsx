import { motion } from "framer-motion";
import { RoadState, Direction } from "./types";

interface Props {
  roads: RoadState[];
}

const SIGNAL_COLORS = {
  red: "bg-signal-red shadow-[0_0_12px_hsl(0,80%,55%,0.6)]",
  yellow: "bg-signal-yellow shadow-[0_0_12px_hsl(45,95%,55%,0.6)]",
  green: "bg-signal-green shadow-[0_0_12px_hsl(140,70%,50%,0.6)]",
};

const dirPos: Record<Direction, { x: number; y: number; rotate: number }> = {
  north: { x: 50, y: 8, rotate: 180 },
  south: { x: 50, y: 92, rotate: 0 },
  east: { x: 92, y: 50, rotate: 270 },
  west: { x: 8, y: 50, rotate: 90 },
};

function VehicleDots({ density, direction }: { density: number; direction: Direction }) {
  const count = Math.round(density / 15);
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
            width="2%"
            height="1.6%"
            rx="1"
            fill={density > 75 ? "hsl(0 80% 55%)" : density > 45 ? "hsl(38 92% 55%)" : "hsl(145 65% 45%)"}
            opacity={0.8}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
          />
        );
      })}
    </>
  );
}

export default function IntersectionView({ roads }: Props) {
  const getRoad = (d: Direction) => roads.find((r) => r.direction === d)!;

  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">🚦 Silk Board Junction — Live View</h3>
        <div className="flex items-center gap-1.5 text-xs font-mono text-eco">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-eco opacity-75" />
            <span className="relative h-2 w-2 rounded-full bg-eco" />
          </span>
          LIVE
        </div>
      </div>

      <div className="relative aspect-square max-w-[400px] mx-auto">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Road surface */}
          <rect x="38" y="0" width="24" height="100" fill="hsl(220 25% 15%)" />
          <rect x="0" y="38" width="100" height="24" fill="hsl(220 25% 15%)" />
          {/* Center intersection */}
          <rect x="38" y="38" width="24" height="24" fill="hsl(220 30% 12%)" stroke="hsl(185 80% 50%)" strokeWidth="0.3" strokeDasharray="2 1" />
          {/* Road markings */}
          {[15, 30, 70, 85].map((y) => (
            <rect key={`vl-${y}`} x="49.5" y={y} width="1" height="4" fill="hsl(38 92% 55% / 0.4)" rx="0.5" />
          ))}
          {[15, 30, 70, 85].map((x) => (
            <rect key={`hl-${x}`} x={x} y="49.5" width="4" height="1" fill="hsl(38 92% 55% / 0.4)" rx="0.5" />
          ))}
          {/* Vehicle dots */}
          {roads.map((r) => (
            <VehicleDots key={r.direction} density={r.vehicleDensity} direction={r.direction} />
          ))}
        </svg>

        {/* Signal indicators at corners */}
        {roads.map((r) => {
          const pos = dirPos[r.direction];
          return (
            <div
              key={r.direction}
              className="absolute flex flex-col items-center gap-1"
              style={{
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: "translate(-50%, -50%)",
              }}
            >
              <motion.div
                className={`h-4 w-4 rounded-full ${SIGNAL_COLORS[r.signal]}`}
                animate={{ scale: r.signal === "green" ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              <span className="text-[10px] font-mono text-foreground font-bold">{r.timer}s</span>
              {r.emergencyVehicle && (
                <motion.span
                  className="text-[9px] text-destructive font-bold"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  🚑
                </motion.span>
              )}
            </div>
          );
        })}
      </div>

      {/* Road labels */}
      <div className="grid grid-cols-2 gap-2 mt-3">
        {roads.map((r) => (
          <div
            key={r.direction}
            className={`flex items-center justify-between rounded-lg p-2 text-xs font-mono ${
              r.signal === "green" ? "bg-eco/10 border border-eco/30" : "bg-muted"
            }`}
          >
            <span className="text-muted-foreground capitalize">{r.direction}</span>
            <span className={r.signal === "green" ? "text-eco font-bold" : "text-foreground"}>
              {r.vehicleDensity}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
