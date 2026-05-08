"use server";

import { chatAssistant, generateItinerary } from "./gemini";
import { TravelPlanRequestSchema, TravelPlanResponse } from "./types";
import { z } from "zod";
import { adminDb, isFirebaseAdminInitialized } from "@/lib/firebase/admin";

export async function generateItineraryAction(prevState: unknown, formData: FormData): Promise<{ success: boolean; data?: TravelPlanResponse; error?: string; destination?: string; tripId?: string }> {
  try {
    const rawData = {
      destination: formData.get("destination"),
      budget: formData.get("budget"),
      duration: formData.get("duration"),
      style: formData.get("style"),
      language: formData.get("language") || "English",
      accessibility: formData.getAll("accessibility"),
    };

    const validatedData = TravelPlanRequestSchema.parse(rawData);

    // Call Gemini API
    const plan = await generateItinerary(
      validatedData.destination,
      validatedData.budget,
      validatedData.duration.toString(),
      validatedData.style,
      validatedData.language,
      validatedData.accessibility
    );

    // Save to Firestore using Admin SDK for persistence / collaborative planning
    let tripId = undefined;
    try {
      if (isFirebaseAdminInitialized()) {
        const docRef = await adminDb.collection("trips").add({
          ...validatedData,
          plan,
          createdAt: new Date(),
        });
        tripId = docRef.id;
      }
    } catch (dbErr) {
      console.error("Failed to save trip to DB", dbErr);
      // We don't fail the action if DB save fails to keep it resilient
    }

    return { success: true, data: plan, destination: validatedData.destination, tripId };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Action Error:", error);

    // Fallback mock data for hackathon demo resilience if Gemini is down
    const fallbackPlan: TravelPlanResponse = {
      itinerary: [
        {
          day: 1,
          theme: "Arrival & Exploration",
          activities: [
            {
              name: "Arrival and Check-in",
              description: "Settle into your accommodation and freshen up.",
              estimatedCost: "$0",
              accessibilityNotes: "Verified accessible entrance."
            },
            {
              name: "City Center Walk",
              description: "Explore the main squares and get a feel for the city.",
              estimatedCost: "$0",
              accessibilityNotes: "Paved roads, mostly flat."
            }
          ]
        },
        {
          day: 2,
          theme: "Culture & Sightseeing",
          activities: [
            {
              name: "Morning Museum Visit",
              description: "Visit the top-rated local museum.",
              estimatedCost: "$25",
              accessibilityNotes: "Elevator access to all floors."
            },
            {
              name: "Local Market Lunch",
              description: "Try street food and local delicacies.",
              estimatedCost: "$15",
              accessibilityNotes: "Can be crowded, but navigable."
            }
          ]
        }
      ],
      food: ["Local specialty dish", "Street food market"],
      tips: ["Buy a transit pass", "Keep a water bottle handy"],
      packing: ["Comfortable walking shoes", "Universal power adapter", "Light jacket"],
      weather: {
        summary: "Generally pleasant with mild temperatures.",
        temperature: { low: "15°C", high: "24°C" },
        forecast: [
          { day: 1, condition: "Sunny", temp: "22°C" },
          { day: 2, condition: "Partly Cloudy", temp: "20°C" }
        ],
        recommendations: "Dress in layers and bring sunglasses."
      },
      totalEstimatedCost: "$450"
    };

    return {
      success: true,
      data: fallbackPlan,
      destination: "Fallback Destination (API High Demand)",
      error: "Gemini API is currently experiencing high demand. Showing a sample fallback itinerary."
    };
  }
}

export async function chatAction(messages: { role: "user" | "model", content: string }[], prompt: string) {
  try {
    const reply = await chatAssistant(messages, prompt);
    return { success: true, reply };
  } catch (error) {
    console.error("Chat Error:", error);
    return { success: false, error: "Failed to fetch response." };
  }
}

// Fallback coordinates for popular destinations when Geocoding API is unavailable
const CITY_COORDS: Record<string, { lat: number; lng: number }> = {
  "tokyo": { lat: 35.6762, lng: 139.6503 },
  "paris": { lat: 48.8566, lng: 2.3522 },
  "new york": { lat: 40.7128, lng: -74.006 },
  "london": { lat: 51.5074, lng: -0.1278 },
  "rome": { lat: 41.9028, lng: 12.4964 },
  "barcelona": { lat: 41.3851, lng: 2.1734 },
  "dubai": { lat: 25.2048, lng: 55.2708 },
  "bali": { lat: -8.3405, lng: 115.092 },
  "singapore": { lat: 1.3521, lng: 103.8198 },
  "istanbul": { lat: 41.0082, lng: 28.9784 },
  "amsterdam": { lat: 52.3676, lng: 4.9041 },
  "sydney": { lat: -33.8688, lng: 151.2093 },
  "bangkok": { lat: 13.7563, lng: 100.5018 },
  "madrid": { lat: 40.4168, lng: -3.7038 },
  "vienna": { lat: 48.2082, lng: 16.3738 },
  "prague": { lat: 50.0755, lng: 14.4378 },
  "athens": { lat: 37.9838, lng: 23.7275 },
  "cairo": { lat: 30.0444, lng: 31.2357 },
  "toronto": { lat: 43.6532, lng: -79.3832 },
  "miami": { lat: 25.7617, lng: -80.1918 },
  "los angeles": { lat: 34.0522, lng: -118.2437 },
  "chicago": { lat: 41.8781, lng: -87.6298 },
  "seoul": { lat: 37.5665, lng: 126.978 },
  "beijing": { lat: 39.9042, lng: 116.4074 },
  "shanghai": { lat: 31.2304, lng: 121.4737 },
  "mumbai": { lat: 19.076, lng: 72.8777 },
  "mexico city": { lat: 19.4326, lng: -99.1332 },
  "rio de janeiro": { lat: -22.9068, lng: -43.1729 },
  "Buenos Aires": { lat: -34.6037, lng: -58.3816 },
  "cape town": { lat: -33.9249, lng: 18.4241 },
  "nairobi": { lat: -1.2921, lng: 36.8219 },
  "kyoto": { lat: 35.0116, lng: 135.7681 },
  "osaka": { lat: 34.6937, lng: 135.5023 },
  "lisbon": { lat: 38.7169, lng: -9.1399 },
  "copenhagen": { lat: 55.6761, lng: 12.5683 },
  "zurich": { lat: 47.3769, lng: 8.5417 },
  "budapest": { lat: 47.4979, lng: 19.0402 },
  "maldives": { lat: 3.2028, lng: 73.2207 },
  "santorini": { lat: 36.3932, lng: 25.4615 },
};

function getFallbackCoords(destination: string): { lat: number; lng: number } | null {
  const lower = destination.toLowerCase();
  for (const [city, coords] of Object.entries(CITY_COORDS)) {
    if (lower.includes(city)) return coords;
  }
  return null;
}

export async function getMapsApiKey() {
  return process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_MAPS_API_KEY || process.env.MAPS_API_KEY || "";
}

export async function geocodeDestination(destination: string): Promise<{ lat: number; lng: number } | null> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || process.env.NEXT_PUBLIC_MAPS_API_KEY || process.env.MAPS_API_KEY || "";

  if (!destination) return null;

  // Try Google Geocoding API first if key is available
  if (apiKey) {
    try {
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${apiKey}`,
        { next: { revalidate: 3600 } } // cache geocode results for 1 hour
      );
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        return data.results[0].geometry.location as { lat: number; lng: number };
      }
    } catch (e) {
      console.error("Geocoding API error:", e);
    }
  }

  // Fallback to built-in coordinate table
  return getFallbackCoords(destination);
}
