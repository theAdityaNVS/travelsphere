"use server";

import { generateItinerary } from "./gemini";
import { TravelPlanRequestSchema, TravelPlanResponse } from "./types";
import { z } from "zod";

export async function generateItineraryAction(prevState: unknown, formData: FormData): Promise<{ success: boolean; data?: TravelPlanResponse; error?: string; destination?: string }> {
  try {
    const rawData = {
      destination: formData.get("destination"),
      budget: formData.get("budget"),
      duration: formData.get("duration"),
      style: formData.get("style"),
    };

    const validatedData = TravelPlanRequestSchema.parse(rawData);

    // Call Gemini API
    const plan = await generateItinerary(
      validatedData.destination,
      validatedData.budget,
      validatedData.duration.toString(),
      validatedData.style
    );

    // TODO: Save to Firestore using Admin SDK

    return { success: true, data: plan, destination: validatedData.destination };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, error: error.issues[0].message };
    }
    console.error("Action Error:", error);
    return { success: false, error: "Failed to generate itinerary. Please try again." };
  }
}
