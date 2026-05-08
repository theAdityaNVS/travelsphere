"use client";

import { useState } from "react";
import Form from "@/features/itinerary/components/Form";
import Itinerary from "@/features/itinerary/components/Itinerary";
import Map from "@/features/itinerary/components/Map";
import Chat from "@/features/itinerary/components/Chat";
import { Plane } from "lucide-react";
import { TravelPlanResponse } from "@/features/itinerary/types";

import { AnimatedBackground } from "@/components/AnimatedBackground";

import { ExampleSuggestions, TravelExample } from "@/components/ExampleSuggestions";

import { ShowcaseTrips } from "@/components/ShowcaseTrips";

export default function Home() {
  const [plan, setPlan] = useState<TravelPlanResponse | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [selectedExample, setSelectedExample] = useState<TravelExample | undefined>();

  const handlePlanGenerated = (newPlan: TravelPlanResponse, dest: string) => {
    setPlan(newPlan);
    setDestination(dest);
    
    // Scroll to results slightly after render
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleExampleSelect = (example: TravelExample) => {
    setSelectedExample(example);
    // Smooth scroll to form if needed
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-card/80 border-b border-border sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Plane className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">TravelSphere AI</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-background border-b border-border">
        <AnimatedBackground />

        <div className="max-w-5xl mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight mb-8 leading-[1.1]">
              Design your perfect trip in <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-emerald-500 to-cyan-500">seconds.</span>
            </h2>
            <p className="text-lg md:text-2xl text-muted-foreground mb-12 leading-relaxed">
              Tell us where you want to go, and our AI will craft a personalized itinerary, complete with food recommendations and local secrets.
            </p>
          </div>
          
          <div className="max-w-xl mx-auto">
            <ExampleSuggestions onSelect={handleExampleSelect} />
            <Form onPlanGenerated={handlePlanGenerated} initialValues={selectedExample} />
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      {!plan && <ShowcaseTrips />}

      {/* Results Section */}
      {plan && destination && (
        <section id="results" className="max-w-5xl mx-auto px-4 py-16 md:py-24">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <Itinerary plan={plan} />
            </div>
            <div className="lg:col-span-5 space-y-8">
              <div className="sticky top-24 space-y-8">
                <Map destination={destination} plan={plan} />
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
