"use client";

import { useState } from "react";
import Form from "@/features/itinerary/components/Form";
import Itinerary from "@/features/itinerary/components/Itinerary";
import Map from "@/features/itinerary/components/Map";
import Chat from "@/features/itinerary/components/Chat";
import { Plane } from "lucide-react";
import { TravelPlanResponse } from "@/features/itinerary/types";

export default function Home() {
  const [plan, setPlan] = useState<TravelPlanResponse | null>(null);
  const [destination, setDestination] = useState<string>("");

  const handlePlanGenerated = (newPlan: TravelPlanResponse, dest: string) => {
    setPlan(newPlan);
    setDestination(dest);
    
    // Scroll to results slightly after render
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-indigo-100 selection:text-indigo-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white">
            <Plane className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">TravelSphere AI</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3">
          <div className="w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl"></div>
        </div>
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3">
          <div className="w-96 h-96 bg-indigo-100/40 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
              Design your perfect trip in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">seconds.</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed">
              Tell us where you want to go, and our AI will craft a personalized itinerary, complete with food recommendations and local secrets.
            </p>
          </div>
          
          <div className="max-w-xl mx-auto">
            <Form onPlanGenerated={handlePlanGenerated} />
          </div>
        </div>
      </section>

      {/* Results Section */}
      {plan && destination && (
        <section id="results" className="max-w-5xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <Itinerary plan={plan} />
            </div>
            <div className="lg:col-span-5 space-y-8">
              <div className="sticky top-24 space-y-8">
                <Map destination={destination} />
                <Chat />
              </div>
            </div>
          </div>
        </section>
      )}
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-gray-500 text-sm">
          Built for the PromptWars 2026 Hackathon. 
        </div>
      </footer>
    </main>
  );
}
