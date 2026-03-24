import { useState } from "react";

function TrafficPanel() {
  const [density, setDensity] = useState<number>(50); // mock BTIS value

  return (
    <div className="p-4 border border-border rounded-md shadow-md bg-card">
      <h3 className="text-lg font-bold text-foreground">Traffic Density (Bengaluru)</h3>
      <p className="text-muted-foreground">BTIS Vehicle Density: {density}</p>
      <input
        type="range"
        min="0"
        max="100"
        value={density}
        onChange={(e) => setDensity(Number(e.target.value))}
        className="w-full accent-primary"
      />
    </div>
  );
}

export default TrafficPanel;
