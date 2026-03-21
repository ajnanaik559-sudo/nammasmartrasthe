export type Direction = "north" | "south" | "east" | "west";

export type SignalState = "red" | "yellow" | "green";

export type CrowdLevel = "low" | "medium" | "high";

export interface RoadState {
  direction: Direction;
  label: string;
  vehicleDensity: number; // 0-100
  emergencyVehicle: boolean;
  signal: SignalState;
  timer: number;
  priorityScore: number;
}

export interface ContextState {
  rain: boolean;
  schoolZone: boolean;
  crowdLevel: CrowdLevel;
  accident: boolean;
}

export interface Scenario {
  id: string;
  label: string;
  description: string;
  icon: string;
  roads: Partial<Record<Direction, { density: number; emergency: boolean }>>;
  context: Partial<ContextState>;
}

export const ROAD_LABELS: Record<Direction, string> = {
  north: "Hosur Road (North)",
  south: "Bannerghatta Rd (South)",
  east: "Sarjapur Road (East)",
  west: "Kanakapura Rd (West)",
};

export const DIRECTIONS: Direction[] = ["north", "south", "east", "west"];

export function computePriority(
  vehicleDensity: number,
  emergency: boolean,
  crowdLevel: CrowdLevel,
  rain: boolean,
  schoolZone: boolean
): number {
  const crowdMap: Record<CrowdLevel, number> = { low: 0.2, medium: 0.5, high: 1.0 };
  const score =
    0.5 * (vehicleDensity / 100) +
    1.0 * (emergency ? 1 : 0) +
    0.3 * crowdMap[crowdLevel] +
    0.2 * (rain ? 1 : 0) +
    0.4 * (schoolZone ? 1 : 0);
  return Math.round(score * 100) / 100;
}
