"use client";

import { useState, useCallback } from "react";
import Form from "@/features/itinerary/components/Form";
import Itinerary from "@/features/itinerary/components/Itinerary";
import Map from "@/features/itinerary/components/Map";
import Chat from "@/features/itinerary/components/Chat";
import { Plane, Loader2, Sparkles } from "lucide-react";
import { TravelPlanResponse } from "@/features/itinerary/types";

import { AnimatedBackground } from "@/components/AnimatedBackground";
import { ExampleSuggestions, TravelExample } from "@/components/ExampleSuggestions";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShowcaseTrips } from "@/components/ShowcaseTrips";

export default function Home() {
  const [plan, setPlan] = useState<TravelPlanResponse | null>(null);
  const [destination, setDestination] = useState<string>("");
  const [selectedExample, setSelectedExample] = useState<TravelExample | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanGenerated = useCallback((newPlan: TravelPlanResponse, dest: string) => {
    setPlan(newPlan);
    setDestination(dest);
    setIsLoading(false);

    // Scroll to results slightly after render
    setTimeout(() => {
      document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const handleExampleSelect = useCallback((example: TravelExample) => {
    setSelectedExample(example);
    // Scroll up to form so user sees it updating & auto-submitting
    setTimeout(() => {
      document.getElementById("trip-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  }, []);

  const handleLoadingChange = useCallback((loading: boolean) => {
    setIsLoading(loading);
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">

      {/* ── Full-screen Loading Overlay ── */}
      {isLoading && (
        <div className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-md flex flex-col items-center justify-center gap-6">
          <div className="relative">
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary animate-pulse" />
            </div>
          </div>
          <div className="text-center">
            <p className="text-xl font-bold mb-1">Crafting your perfect itinerary…</p>
            <p className="text-muted-foreground text-sm">Our AI is researching the best experiences for you</p>
          </div>
          {/* Animated dots */}
          <div className="flex gap-2">
            {[0, 1, 2].map(i => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary"
                style={{ animation: `bounce 1.2s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
          <style>{`
            @keyframes bounce {
              0%, 100% { transform: translateY(0); opacity: 0.4; }
              50% { transform: translateY(-8px); opacity: 1; }
            }
          `}</style>
        </div>
      )}

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
          
          <div id="trip-form" className="max-w-2xl mx-auto">
            <ExampleSuggestions onSelect={handleExampleSelect} />
            <Form
              onPlanGenerated={handlePlanGenerated}
              initialValues={selectedExample}
              onLoadingChange={handleLoadingChange}
              autoSubmit={true}
            />
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      {!plan && <ShowcaseTrips onSelect={handleExampleSelect} />}

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
      <footer className="bg-card/80 border-t border-border py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-muted-foreground text-sm">
          Built for the PromptWars 2026 Hackathon.
        </div>
      </footer>
    </main>
  );
}
