import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ContextState, CrowdLevel, Direction, RoadState } from "./types";

interface Props {
  context: ContextState;
  roads: RoadState[];
  onContextChange: (ctx: ContextState) => void;
  onDensityChange: (dir: Direction, val: number) => void;
  onToggleEmergency: (dir: Direction) => void;
}

export default function ContextControlPanel({
  context,
  roads,
  onContextChange,
  onDensityChange,
  onToggleEmergency,
}: Props) {
  const crowdLevels: CrowdLevel[] = ["low", "medium", "high"];

  return (
    <div className="rounded-xl border border-border bg-card p-5 space-y-5">
      <h3 className="text-sm font-semibold text-foreground">🎛️ Context Control Panel</h3>
      <p className="text-xs text-muted-foreground">Adjust real-world conditions to see how the system adapts</p>

      {/* Toggles */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
          <div>
            <p className="text-xs font-semibold text-foreground">🌧️ Rain</p>
            <p className="text-[10px] text-muted-foreground">+0.2 to score</p>
          </div>
          <Switch
            checked={context.rain}
            onCheckedChange={(v) => onContextChange({ ...context, rain: v })}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
          <div>
            <p className="text-xs font-semibold text-foreground">🏫 School Zone</p>
            <p className="text-[10px] text-muted-foreground">+0.4 to score</p>
          </div>
          <Switch
            checked={context.schoolZone}
            onCheckedChange={(v) => onContextChange({ ...context, schoolZone: v })}
          />
        </div>
        <div className="flex items-center justify-between rounded-lg bg-muted p-3">
          <div>
            <p className="text-xs font-semibold text-foreground">💥 Accident</p>
            <p className="text-[10px] text-muted-foreground">Reroute active</p>
          </div>
          <Switch
            checked={context.accident}
            onCheckedChange={(v) => onContextChange({ ...context, accident: v })}
          />
        </div>
        <div className="rounded-lg bg-muted p-3">
          <p className="text-xs font-semibold text-foreground mb-2">👥 Crowd Level</p>
          <div className="flex gap-1">
            {crowdLevels.map((lvl) => (
              <button
                key={lvl}
                onClick={() => onContextChange({ ...context, crowdLevel: lvl })}
                className={`flex-1 rounded-md px-2 py-1 text-[10px] font-semibold capitalize transition-all ${
                  context.crowdLevel === lvl
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Density sliders per road */}
      <div className="space-y-3">
        <p className="text-xs font-semibold text-foreground">🚗 Vehicle Density per Road</p>
        {roads.map((r) => (
          <div key={r.direction} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-[11px] text-muted-foreground">{r.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono text-foreground">{r.vehicleDensity}%</span>
                <button
                  onClick={() => onToggleEmergency(r.direction)}
                  className={`text-[10px] rounded px-1.5 py-0.5 font-semibold transition-all ${
                    r.emergencyVehicle
                      ? "bg-destructive text-destructive-foreground"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                  }`}
                >
                  🚑 {r.emergencyVehicle ? "ON" : "OFF"}
                </button>
              </div>
            </div>
            <Slider
              value={[r.vehicleDensity]}
              onValueChange={([v]) => onDensityChange(r.direction, v)}
              min={0}
              max={100}
              step={1}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
