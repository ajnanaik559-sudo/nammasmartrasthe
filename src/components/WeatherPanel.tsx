import { useEffect, useState } from "react";

function WeatherPanel() {
  const [rainFactor, setRainFactor] = useState<number | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const API_URL = import.meta.env.VITE_API_URL;
        const res = await fetch(`${API_URL}/weather`);
        const data = await res.json();
        setRainFactor(data.rainFactor); // must match backend JSON field
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    }
    fetchWeather();
  }, []);

  return (
    <div className="p-4 border border-border rounded-md shadow-md bg-card">
      <h3 className="text-lg font-bold text-foreground">
        Weather Condition (Bengaluru)
      </h3>
      <p className="text-muted-foreground">
        Rain Factor: {rainFactor !== null ? rainFactor : "Loading..."}
      </p>
      {rainFactor === 1 ? (
        <p className="text-primary">🌧 Rain detected → signals adapt for safety</p>
      ) : (
        <p className="text-eco">☀ No rain → normal traffic flow</p>
      )}
    </div>
  );
}

export default WeatherPanel;
