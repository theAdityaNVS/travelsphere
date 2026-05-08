"use client";

import { Cloud, CloudRain, CloudSnow, CloudSun, Sun, Thermometer, Wind } from "lucide-react";

interface WeatherData {
  summary: string;
  temperature: {
    low: string;
    high: string;
  };
  forecast?: Array<{
    day: number;
    condition: string;
    temp: string;
  }>;
  recommendations: string;
}

interface WeatherProps {
  weather: WeatherData | string | undefined;
}

function WeatherIcon({ condition, size = "md" }: { condition: string; size?: "sm" | "md" | "lg" }) {
  const c = condition.toLowerCase();
  const cls = size === "lg" ? "w-10 h-10" : size === "sm" ? "w-5 h-5" : "w-7 h-7";

  if (c.includes("sun") || c.includes("clear") || c.includes("☀"))
    return <Sun className={`${cls} text-amber-400`} />;
  if (c.includes("rain") || c.includes("shower") || c.includes("🌧"))
    return <CloudRain className={`${cls} text-blue-400`} />;
  if (c.includes("snow") || c.includes("❄"))
    return <CloudSnow className={`${cls} text-sky-300`} />;
  if (c.includes("partly") || c.includes("⛅"))
    return <CloudSun className={`${cls} text-amber-300`} />;
  return <Cloud className={`${cls} text-slate-400`} />;
}

export function WeatherVisualization({ weather }: WeatherProps) {
  if (!weather || typeof weather === "string") return null;

  return (
    <div className="bg-card rounded-3xl border border-border shadow-sm mb-8 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500/10 via-sky-400/10 to-cyan-400/10 px-6 pt-6 pb-4 border-b border-border">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            <WeatherIcon condition={weather.summary} size="lg" />
          </div>
          <div className="min-w-0">
            <h3 className="text-lg font-bold leading-tight truncate">{weather.summary}</h3>
            <p className="text-muted-foreground text-sm flex items-center gap-1.5 mt-0.5">
              <Thermometer className="w-3.5 h-3.5 shrink-0" />
              <span>{weather.temperature.low} – {weather.temperature.high}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Forecast strip */}
      {weather.forecast && weather.forecast.length > 0 && (
        <div className="px-6 py-4 border-b border-border">
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-3">
            Daily Forecast
          </p>
          <div className="grid grid-flow-col auto-cols-[minmax(72px,1fr)] gap-2 overflow-x-auto pb-1">
            {weather.forecast.map((f, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1.5 p-2.5 rounded-2xl bg-muted/50 border border-border/50"
              >
                <span className="text-[10px] font-bold text-muted-foreground">Day {f.day}</span>
                <WeatherIcon condition={f.condition} size="sm" />
                <span className="text-[10px] text-center font-medium leading-tight text-foreground/80 line-clamp-2">
                  {f.condition}
                </span>
                <span className="text-sm font-bold text-foreground">{f.temp}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      <div className="px-6 py-4">
        <div className="flex items-start gap-3 bg-primary/5 px-4 py-3.5 rounded-2xl border border-primary/10">
          <Wind className="w-4 h-4 text-primary mt-0.5 shrink-0" />
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-primary block mb-1">
              Travel Tip
            </span>
            <p className="text-sm leading-relaxed text-foreground/90">{weather.recommendations}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
