import { useEffect, useState } from "react";

function TrafficPanel() {
  const [density, setDensity] = useState<number | null>(null);

  useEffect(() => {
    async function fetchTraffic() {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/traffic`);
        const data = await res.json();
        setDensity(data.density); // <-- update state here
      } catch (err) {
        console.error("Error fetching traffic data:", err);
      }
    }
    fetchTraffic();
  }, []);

  return (
    <div className="p-4 border border-border rounded-md shadow-md bg-card">
      <h3 className="text-lg font-bold text-foreground">
        Traffic Density (Bengaluru)
      </h3>
      <p className="text-muted-foreground">
        BTIS Vehicle Density: {density !== null ? density : "Loading..."}
      </p>
    </div>
  );
}

export default TrafficPanel;
