"use client";

import { Cloud, CloudRain, CloudSun, Sun, Thermometer, Wind } from "lucide-react";

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

export function WeatherVisualization({ weather }: WeatherProps) {
  if (!weather || typeof weather === "string") return null;

  const getIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes("sun") || c.includes("clear")) return <Sun className="w-8 h-8 text-yellow-500" />;
    if (c.includes("rain") || c.includes("shower")) return <CloudRain className="w-8 h-8 text-blue-500" />;
    if (c.includes("cloud") && c.includes("sun")) return <CloudSun className="w-8 h-8 text-gray-400" />;
    return <Cloud className="w-8 h-8 text-gray-400" />;
  };

  return (
    <div className="bg-card rounded-3xl p-6 border border-border shadow-sm mb-8 overflow-hidden relative">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Thermometer className="w-32 h-32" />
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
            {getIcon(weather.summary)}
          </div>
          <div>
            <h3 className="text-xl font-bold">{weather.summary}</h3>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Thermometer className="w-3 h-3" />
              {weather.temperature.low} - {weather.temperature.high}
            </p>
          </div>
        </div>

        {weather.forecast && (
          <div className="flex gap-4 overflow-x-auto pb-4 md:pb-2 pt-2">
            {weather.forecast.map((f, i) => (
              <div key={i} className="flex flex-col items-center min-w-[80px] p-3 rounded-xl bg-muted/50 shrink-0">
                <span className="text-[10px] font-bold uppercase opacity-50 mb-1">Day {f.day}</span>
                {getIcon(f.condition)}
                <span className="text-[11px] text-center font-medium mt-2 leading-tight">{f.condition}</span>
                <span className="text-sm font-bold mt-1">{f.temp}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-start gap-3 bg-primary/5 p-4 rounded-2xl">
          <Wind className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary block mb-1">Travel Recommendation</span>
            <p className="text-sm leading-relaxed">{weather.recommendations}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
