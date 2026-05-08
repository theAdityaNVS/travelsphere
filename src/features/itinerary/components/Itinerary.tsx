"use client";

import { TravelPlanResponse } from "../types";
import { formatItineraryToMarkdown } from "../utils";
import { CheckCircle2, CloudSun, MapPin, Copy, Check, DollarSign, Accessibility } from "lucide-react";
import { useState } from "react";

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
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Your Travel Plan</h2>
          {plan.totalEstimatedCost && (
             <p className="text-emerald-600 font-medium mt-1 flex items-center gap-1">
               <DollarSign className="w-4 h-4" /> Estimated Total: {plan.totalEstimatedCost}
             </p>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors"
          aria-label="Export itinerary as markdown"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span className="font-medium text-sm">{copied ? "Copied!" : "Export MD"}</span>
        </button>
      </div>

      {plan.weather && (
        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 rounded-2xl border border-emerald-100/50">
          <div className="flex items-center gap-3 mb-2 text-emerald-800">
            <CloudSun className="w-6 h-6" />
            <h3 className="text-lg font-semibold">Weather Insights</h3>
          </div>
          <p className="text-emerald-900/80 leading-relaxed">{plan.weather}</p>
        </div>
      )}

      <div className="space-y-6">
        {plan.itinerary.map((day) => (
          <div key={day.day} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-indigo-100 text-indigo-700 font-bold text-lg shrink-0">
                D{day.day}
              </div>
              <h3 className="text-xl font-bold text-gray-900">{day.theme}</h3>
            </div>
            <ul className="space-y-4">
              {day.activities.map((activity, idx) => (
                <li key={idx} className="flex items-start gap-3 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                  <MapPin className="w-5 h-5 mt-0.5 text-indigo-400 shrink-0" />
                  <div className="space-y-1 w-full">
                    <div className="flex justify-between items-start">
                      <span className="font-semibold text-gray-900">{activity.name}</span>
                      <span className="text-sm font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">{activity.estimatedCost}</span>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-sm">{activity.description}</p>
                    {activity.accessibilityNotes && (
                      <div className="flex items-start gap-1.5 mt-2 text-xs text-blue-700 bg-blue-50 p-2 rounded-lg">
                        <Accessibility className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        <span>{activity.accessibilityNotes}</span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {plan.food && plan.food.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Must Try Food</h3>
            <ul className="space-y-2">
              {plan.food.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {plan.tips && plan.tips.length > 0 && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Local Tips</h3>
            <ul className="space-y-2">
              {plan.tips.map((tip, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                  <span>{tip}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {plan.packing && plan.packing.length > 0 && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Packing Checklist</h3>
          <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {plan.packing.map((item, idx) => (
              <li key={idx} className="flex items-center gap-2 text-gray-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
