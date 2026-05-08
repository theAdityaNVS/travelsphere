"use client";

import { CheckCircle2, MapPin, Copy, Check, Info, Sparkles, DollarSign, Accessibility } from "lucide-react";
import { useState } from "react";
import { TravelPlanResponse } from "../types";
import { formatItineraryToMarkdown } from "../utils";
import { WeatherVisualization } from "@/components/WeatherVisualization";

interface ItineraryProps {
  plan: TravelPlanResponse;
}

export default function Itinerary({ plan }: ItineraryProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const md = formatItineraryToMarkdown(plan);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1 flex items-center gap-2">
            Your Travel Plan <Sparkles className="w-6 h-6 text-primary" />
          </h2>
          {plan.totalEstimatedCost && (
            <p className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <DollarSign className="w-4 h-4" /> Estimated Total: {plan.totalEstimatedCost}
            </p>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-colors border border-primary/20"
          aria-label="Export itinerary as markdown"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="font-bold text-sm">{copied ? "Copied!" : "Export MD"}</span>
        </button>
      </div>

      <WeatherVisualization weather={plan.weather} />

      <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
        {plan.itinerary.map((day) => (
          <div key={day.day} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
            {/* Icon */}
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-border bg-card text-primary font-bold shadow-sm z-10 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
              {day.day}
            </div>
            
            {/* Content */}
            <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-3xl bg-card border border-border shadow-sm group-hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">{day.theme}</h3>
              </div>
              
              <ul className="space-y-6">
                {day.activities.map((activity, i) => (
                  <li key={i} className="relative pl-6 before:absolute before:left-0 before:top-2 before:w-2 before:h-2 before:bg-primary before:rounded-full">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-foreground">{activity.name}</h4>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">{activity.estimatedCost}</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-2">{activity.description}</p>
                    {activity.accessibilityNotes && (
                      <div className="flex items-center gap-2 text-[10px] font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-lg w-fit">
                        <Accessibility className="w-3 h-3 shrink-0" />
                        {activity.accessibilityNotes}
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {plan.food && plan.food.length > 0 && (
          <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600">🍝</span>
              Must Try Food
            </h3>
            <ul className="space-y-3">
              {plan.food.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {plan.tips && plan.tips.length > 0 && (
          <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">💡</span>
              Local Secrets
            </h3>
            <ul className="space-y-3">
              {plan.tips.map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Sparkles className="w-4 h-4 text-indigo-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {plan.packing && plan.packing.length > 0 && (
        <div className="bg-card p-6 rounded-3xl border border-border shadow-sm">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">📦</span>
            Packing Checklist
          </h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {plan.packing.map((item, i) => (
              <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
