"use server";

import { chatAssistant, generateItinerary } from "./gemini";
import { TravelPlanRequestSchema, TravelPlanResponse } from "./types";
import { z } from "zod";
import { adminDb } from "../../lib/db/admin";

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
    return { success: false, error: "Failed to generate itinerary. Please try again." };
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
