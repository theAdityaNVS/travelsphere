"use client";

import { useActionState, useEffect, useState } from "react";
import { Compass, Calendar, DollarSign, Loader2, Globe, Accessibility } from "lucide-react";
import { generateItineraryAction } from "../actions";
import { TravelPlanResponse } from "../types";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

interface FormProps {
  onPlanGenerated: (plan: TravelPlanResponse, dest: string) => void;
  initialValues?: {
    destination: string;
    duration: number;
    budget: string;
    style: string;
  };
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/20"
    >
      {pending ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          Crafting your journey...
        </>
      ) : (
        "Generate Itinerary"
      )}
    </button>
  );
}

export default function Form({ onPlanGenerated, initialValues }: FormProps) {
  const [state, formAction] = useActionState(generateItineraryAction, { success: false });
  const router = useRouter();
  
  // Controlled inputs for programmatic updates
  const [destination, setDestination] = useState("");
  const [duration, setDuration] = useState(3);
  const [budget, setBudget] = useState("moderate");
  const [style, setStyle] = useState("Adventure");

  useEffect(() => {
    if (initialValues) {
      setDestination(initialValues.destination);
      setDuration(initialValues.duration);
      setBudget(initialValues.budget);
      setStyle(initialValues.style);
    }
  }, [initialValues]);

  useEffect(() => {
    if (state.success && state.data && state.destination) {
      if (state.tripId) {
        router.push(`/trip/${state.tripId}`);
      } else {
        onPlanGenerated(state.data, state.destination);
      }
    }
  }, [state, onPlanGenerated, router]);

  return (
    <form action={formAction} className="bg-card p-8 rounded-3xl shadow-2xl shadow-primary/5 border border-border">
      <div className="space-y-6">
        <div>
          <label htmlFor="destination" className="block text-sm font-semibold text-foreground mb-2">
            Where do you want to go?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Compass className="h-5 w-5 text-muted-foreground" />
            </div>
            <input
              type="text"
              name="destination"
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-shadow outline-none bg-background text-foreground placeholder:text-muted-foreground"
              placeholder="e.g. Tokyo, Japan"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="duration" className="block text-sm font-semibold text-foreground mb-2">
              Duration (Days)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-muted-foreground" />
              </div>
              <input
                type="number"
                name="duration"
                id="duration"
                min="1"
                max="30"
                value={duration}
                onChange={(e) => setDuration(parseInt(e.target.value))}
                className="block w-full pl-10 pr-3 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-shadow outline-none bg-background text-foreground"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-semibold text-foreground mb-2">
              Budget
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </div>
              <select
                name="budget"
                id="budget"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="block w-full pl-10 pr-8 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-shadow outline-none bg-background text-foreground appearance-none"
                required
              >
                <option value="budget">Budget-Friendly</option>
                <option value="moderate">Moderate</option>
                <option value="luxury">Luxury</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-muted-foreground">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="language" className="block text-sm font-semibold text-foreground mb-2">
              Language
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-muted-foreground" />
              </div>
              <select
                name="language"
                id="language"
                className="block w-full pl-10 pr-8 py-3 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-shadow outline-none bg-background text-foreground appearance-none"
              >
                <option value="English">English</option>
                <option value="Spanish">Español</option>
                <option value="French">Français</option>
                <option value="German">Deutsch</option>
                <option value="Japanese">日本語</option>
                <option value="Mandarin">中文</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-muted-foreground" />
              Accessibility Needs
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["Wheelchair", "Visual", "Hearing", "Cognitive"].map((acc) => (
                <label key={acc} className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input type="checkbox" name="accessibility" value={acc} className="rounded text-primary focus:ring-primary border-border bg-background" />
                  {acc}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-foreground mb-3">
            Travel Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["Adventure", "Relaxation", "Culture", "Food", "Family", "Romantic"].map((s) => (
              <label key={s} className="cursor-pointer">
                <input 
                  type="radio" 
                  name="style" 
                  value={s} 
                  className="peer sr-only" 
                  checked={style === s}
                  onChange={(e) => setStyle(e.target.value)}
                />
                <div className="text-center px-4 py-3 border border-border rounded-xl peer-checked:bg-primary/10 peer-checked:border-primary peer-checked:text-primary hover:bg-muted transition-colors font-medium text-muted-foreground text-sm">
                  {s}
                </div>
              </label>
            ))}
          </div>
        </div>

        {!state.success && state.error && (
          <div className="p-4 bg-red-50 dark:bg-red-950/20 text-red-700 dark:text-red-400 rounded-xl text-sm border border-red-100 dark:border-red-900/50" role="alert">
            {state.error}
          </div>
        )}

        <SubmitButton />
      </div>
    </form>
  );
}
