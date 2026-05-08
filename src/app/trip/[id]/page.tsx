import { adminDb } from "@/lib/firebase/admin";
import Itinerary from "@/features/itinerary/components/Itinerary";
import Map from "@/features/itinerary/components/Map";
import Chat from "@/features/itinerary/components/Chat";
import { Plane } from "lucide-react";
import Link from "next/link";
import { TravelPlanResponse } from "@/features/itinerary/types";
import { notFound } from "next/navigation";

import { ThemeToggle } from "@/components/ThemeToggle";

export const dynamic = "force-dynamic";

export default async function TripPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = await adminDb.collection("trips").doc(id).get();
  
  if (!doc.exists) {
    notFound();
  }
  
  const tripData = doc.data();
  const plan = tripData?.plan as TravelPlanResponse;
  const destination = tripData?.destination as string;

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-indigo-100 selection:text-indigo-900 transition-colors duration-300">
      <header className="bg-card/80 border-b border-border sticky top-0 z-50 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white">
              <Plane className="w-5 h-5" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">TravelSphere AI</h1>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">Create New Trip</Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <section id="results" className="max-w-5xl mx-auto px-4 py-16 md:py-24">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-foreground">Your Trip to {destination}</h2>
            <p className="text-muted-foreground mt-2">Share this URL with your friends to plan together!</p>
          </div>
        </div>
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
      
      <footer className="bg-card/80 border-t border-border py-8 mt-auto">
        <div className="max-w-5xl mx-auto px-4 text-center text-muted-foreground text-sm">
          Built for the PromptWars 2026 Hackathon. 
        </div>
      </footer>
    </main>
  );
}
