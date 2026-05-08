"use server";

import { chatAssistant, generateItinerary } from "./gemini";
import { TravelPlanRequestSchema, TravelPlanResponse } from "./types";
import { z } from "zod";
import { adminDb } from "@/lib/firebase/admin";

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
      const docRef = await adminDb.collection("trips").add({
        ...validatedData,
        plan,
        createdAt: new Date(),
      });
      tripId = docRef.id;
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
