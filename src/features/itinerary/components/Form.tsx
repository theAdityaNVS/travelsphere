"use client";

import { useActionState, useEffect } from "react";
import { Compass, Calendar, DollarSign, Loader2, Globe, Accessibility } from "lucide-react";
import { generateItineraryAction } from "../actions";
import { TravelPlanResponse } from "../types";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

interface FormProps {
  onPlanGenerated: (plan: TravelPlanResponse, dest: string) => void;
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
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

export default function Form({ onPlanGenerated }: FormProps) {
  const [state, formAction] = useActionState(generateItineraryAction, { success: false });
  const router = useRouter();

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
    <form action={formAction} className="bg-white p-8 rounded-3xl shadow-xl shadow-indigo-100/50 border border-indigo-50">
      <div className="space-y-6">
        <div>
          <label htmlFor="destination" className="block text-sm font-semibold text-gray-700 mb-2">
            Where do you want to go?
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Compass className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              name="destination"
              id="destination"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none text-gray-900 placeholder:text-gray-400"
              placeholder="e.g. Tokyo, Japan"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="duration" className="block text-sm font-semibold text-gray-700 mb-2">
              Duration (Days)
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="number"
                name="duration"
                id="duration"
                min="1"
                max="30"
                defaultValue="3"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none text-gray-900"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="budget" className="block text-sm font-semibold text-gray-700 mb-2">
              Budget
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="budget"
                id="budget"
                className="block w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none text-gray-900 appearance-none bg-white"
                required
              >
                <option value="budget">Budget-Friendly</option>
                <option value="moderate">Moderate</option>
                <option value="luxury">Luxury</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="language" className="block text-sm font-semibold text-gray-700 mb-2">
              Language
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Globe className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="language"
                id="language"
                className="block w-full pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-shadow outline-none text-gray-900 appearance-none bg-white"
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
            <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
              <Accessibility className="w-4 h-4 text-gray-500" />
              Accessibility Needs
            </label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {["Wheelchair", "Visual", "Hearing", "Cognitive"].map((acc) => (
                <label key={acc} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" name="accessibility" value={acc} className="rounded text-indigo-600 focus:ring-indigo-500" />
                  {acc}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Travel Style
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["Adventure", "Relaxation", "Culture", "Food", "Family", "Romantic"].map((style) => (
              <label key={style} className="cursor-pointer">
                <input type="radio" name="style" value={style} className="peer sr-only" defaultChecked={style === "Adventure"} />
                <div className="text-center px-4 py-3 border border-gray-200 rounded-xl peer-checked:bg-indigo-50 peer-checked:border-indigo-500 peer-checked:text-indigo-700 hover:bg-gray-50 transition-colors font-medium text-gray-600 text-sm">
                  {style}
                </div>
              </label>
            ))}
          </div>
        </div>

        {!state.success && state.error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl text-sm border border-red-100" role="alert">
            {state.error}
          </div>
        )}

        <SubmitButton />
      </div>
    </form>
  );
}
