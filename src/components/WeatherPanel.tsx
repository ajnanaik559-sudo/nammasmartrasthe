import { useEffect, useState } from "react";

function WeatherPanel() {
  const [rainFactor, setRainFactor] = useState<number>(0);

  useEffect(() => {
    fetch("https://api.open-meteo.com/v1/forecast?latitude=12.9716&longitude=77.5946&hourly=precipitation")
      .then(res => res.json())
      .then(data => {
        const precipitation = data.hourly.precipitation[0]; // first hour
        setRainFactor(precipitation > 0 ? 1 : 0);
      })
      .catch(err => console.error("Weather API error:", err));
  }, []);

  return (
    <div className="p-4 border border-border rounded-md shadow-md bg-card">
      <h3 className="text-lg font-bold text-foreground">Weather Condition (Bengaluru)</h3>
      <p className="text-muted-foreground">Rain Factor: {rainFactor}</p>
      {rainFactor === 1 ? (
        <p className="text-primary">🌧 Rain detected → signals adapt for safety</p>
      ) : (
        <p className="text-eco">☀ No rain → normal traffic flow</p>
      )}
    </div>
  );
}

export default WeatherPanel;
