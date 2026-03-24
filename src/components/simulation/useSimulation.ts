import { useState, useCallback, useEffect, useRef } from "react";
import {
  Direction, SignalState, RoadState, ContextState, CrowdLevel,
  DIRECTIONS, ROAD_LABELS, computePriority, Scenario,
} from "./types";

const SCENARIOS: Scenario[] = [
  {
    id: "rain",
    label: "Bengaluru Rain Traffic",
    description: "Monsoon downpour reduces visibility, slows traffic across all roads",
    icon: "🌧️",
    roads: {
      north: { density: 85, emergency: false },
      south: { density: 78, emergency: false },
      east: { density: 70, emergency: false },
      west: { density: 65, emergency: false },
    },
    context: { rain: true, crowdLevel: "medium", schoolZone: false, accident: false },
  },
  {
    id: "festival",
    label: "Temple Festival Crowd",
    description: "Bull Temple Road procession — heavy pedestrian movement",
    icon: "🎉",
    roads: {
      north: { density: 60, emergency: false },
      south: { density: 90, emergency: false },
      east: { density: 45, emergency: false },
      west: { density: 50, emergency: false },
    },
    context: { rain: false, crowdLevel: "high", schoolZone: false, accident: false },
  },
  {
    id: "school",
    label: "School Rush Hour",
    description: "8:30 AM near DPS Whitefield — parents dropping kids",
    icon: "🏫",
    roads: {
      north: { density: 72, emergency: false },
      south: { density: 55, emergency: false },
      east: { density: 80, emergency: false },
      west: { density: 40, emergency: false },
    },
    context: { rain: false, crowdLevel: "medium", schoolZone: true, accident: false },
  },
  {
    id: "emergency",
    label: "Emergency Situation",
    description: "Ambulance approaching from Hosur Road — needs priority clearance",
    icon: "🚑",
    roads: {
      north: { density: 70, emergency: true },
      south: { density: 60, emergency: false },
      east: { density: 55, emergency: false },
      west: { density: 50, emergency: false },
    },
    context: { rain: false, crowdLevel: "low", schoolZone: false, accident: false },
  },
  {
    id: "accident",
    label: "Silk Board Accident",
    description: "Multi-vehicle collision blocking east lane at Silk Board Junction",
    icon: "💥",
    roads: {
      north: { density: 90, emergency: false },
      south: { density: 85, emergency: false },
      east: { density: 95, emergency: true },
      west: { density: 70, emergency: false },
    },
    context: { rain: false, crowdLevel: "high", schoolZone: false, accident: true },
  },
];

function makeInitialRoads(context: ContextState): RoadState[] {
  return DIRECTIONS.map((dir) => ({
    direction: dir,
    label: ROAD_LABELS[dir],
    vehicleDensity: 30 + Math.floor(Math.random() * 40),
    emergencyVehicle: false,
    signal: "red" as SignalState,
    timer: 0,
    priorityScore: 0,
  }));
}

export function useSimulation() {
  const callBackend = async () => {
  try {
    const res = await fetch("https://smartflow-backend-kk0i.onrender.com/");
    const data = await res.json();
    console.log("Backend:", data);
  } catch (err) {
    console.log(err);
  }
};
  const [context, setContext] = useState<ContextState>({
    rain: false,
    schoolZone: false,
    crowdLevel: "low",
    accident: false,
  });

  const [roads, setRoads] = useState<RoadState[]>(() => makeInitialRoads(context));
  const [activeScenario, setActiveScenario] = useState<string | null>(null);
  const [explanations, setExplanations] = useState<string[]>([]);
  const [beforeStats, setBeforeStats] = useState({ avgWait: 68, throughput: 320, congestion: 78 });
  const [afterStats, setAfterStats] = useState({ avgWait: 68, throughput: 320, congestion: 78 });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const recalculate = useCallback((currentRoads: RoadState[], ctx: ContextState) => {
    // Compute priority scores
    const scored = currentRoads.map((r) => ({
      ...r,
      priorityScore: computePriority(
        r.vehicleDensity,
        r.emergencyVehicle,
        ctx.crowdLevel,
        ctx.rain,
        ctx.schoolZone
      ),
    }));

    // Find highest priority
    const maxScore = Math.max(...scored.map((r) => r.priorityScore));
    const winner = scored.find((r) => r.priorityScore === maxScore)!;

    // Assign signals
    const withSignals = scored.map((r) => ({
      ...r,
      signal: (r.direction === winner.direction ? "green" : "red") as SignalState,
      timer: r.direction === winner.direction ? 30 : 45,
    }));

    // Build explanations
    const reasons: string[] = [];
    if (winner.emergencyVehicle) {
      reasons.push(`🚑 Emergency vehicle detected on ${winner.label} → highest priority override`);
    }
    reasons.push(
      `📊 ${winner.label} has the highest priority score: ${winner.priorityScore.toFixed(2)}`
    );
    if (winner.vehicleDensity > 70) {
      reasons.push(
        `🚗 High vehicle density (${winner.vehicleDensity}%) on ${winner.label} contributed +${(0.5 * winner.vehicleDensity / 100).toFixed(2)} to score`
      );
    }
    if (ctx.crowdLevel === "high") {
      reasons.push("👥 High crowd density increased priority score by +0.30");
    }
    if (ctx.rain) {
      reasons.push("🌧️ Rain factor added +0.20 to all road scores — longer green for safety");
    }
    if (ctx.schoolZone) {
      reasons.push("🏫 School zone active — added +0.40 for pedestrian safety");
    }
    if (ctx.accident) {
      reasons.push("💥 Accident reported — rerouting priority adjusted");
    }

    // Compute before/after
    const totalDensity = withSignals.reduce((s, r) => s + r.vehicleDensity, 0) / 4;
    const baseCongestion = Math.round(totalDensity * 1.1);
    const optimizedCongestion = Math.round(totalDensity * 0.65);
    const baseWait = Math.round(40 + totalDensity * 0.5);
    const optimizedWait = Math.round(20 + totalDensity * 0.25);

    setBeforeStats({
      avgWait: baseWait,
      throughput: Math.round(200 + (100 - totalDensity) * 3),
      congestion: Math.min(100, baseCongestion),
    });
    setAfterStats({
      avgWait: optimizedWait,
      throughput: Math.round(350 + (100 - totalDensity) * 4),
      congestion: Math.max(10, optimizedCongestion),
    });

    setExplanations(reasons);
    return withSignals;
  }, []);

  // Recalculate on any change
  useEffect(() => {
    setRoads((prev) => recalculate(prev, context));
  }, [context, recalculate]);

  // Live timer tick
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRoads((prev) => {
        const updated = prev.map((r) => {
          const jitter = (Math.random() - 0.45) * 4;
          return {
            ...r,
            vehicleDensity: Math.max(5, Math.min(100, Math.round(r.vehicleDensity + jitter))),
            timer: Math.max(0, r.timer - 1),
          };
        });
        // Recalculate when any timer hits 0
        if (updated.some((r) => r.timer <= 0)) {
          return recalculate(updated, context);
        }
        return updated;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [context, recalculate]);

  const setDensity = useCallback((dir: Direction, val: number) => {
    setRoads((prev) => {
      const updated = prev.map((r) =>
        r.direction === dir ? { ...r, vehicleDensity: val } : r
      );
      return recalculate(updated, context);
    });
  }, [context, recalculate]);

  const toggleEmergency = useCallback((dir: Direction) => {
    setRoads((prev) => {
      const updated = prev.map((r) =>
        r.direction === dir ? { ...r, emergencyVehicle: !r.emergencyVehicle } : r
      );
      return recalculate(updated, context);
    });
  }, [context, recalculate]);

  const applyScenario = useCallback((scenarioId: string) => {
    const scenario = SCENARIOS.find((s) => s.id === scenarioId);
    if (!scenario) return;
    setActiveScenario(scenarioId);
    const newCtx: ContextState = {
      ...context,
      ...scenario.context,
  
    };
    callBackend();
    setContext(newCtx);
    setRoads((prev) => {
      const updated = prev.map((r) => {
        const sd = scenario.roads[r.direction];
        return {
          ...r,
          vehicleDensity: sd?.density ?? r.vehicleDensity,
          emergencyVehicle: sd?.emergency ?? r.emergencyVehicle,
        };
      });
      return recalculate(updated, newCtx);
    });
  }, [context, recalculate]);

  return {
    roads,
    context,
    setContext,
    setDensity,
    toggleEmergency,
    explanations,
    scenarios: SCENARIOS,
    activeScenario,
    applyScenario,
    beforeStats,
    afterStats,
  };
}
