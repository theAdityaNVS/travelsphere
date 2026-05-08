import { GoogleGenAI } from "@google/genai";
import { TravelPlanResponse } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateItinerary(
  destination: string,
  budget: string,
  duration: string,
  style: string
): Promise<TravelPlanResponse> {
  const prompt = `You are an expert travel planner. Create a detailed ${duration} day itinerary for ${destination} focusing on a ${style} travel style with a ${budget} budget.
Format your response strictly as a JSON object with the following structure:
{
  "itinerary": [
    {
      "day": 1,
      "theme": "Arrival & City Center",
      "activities": ["Check-in", "Walk around square"]
    }
  ],
  "food": ["Local dish 1", "Restaurant 2"],
  "tips": ["Tip 1", "Tip 2"],
  "packing": ["Item 1", "Item 2"],
  "weather": "Brief weather description for the typical season."
}
Do not include any other text or markdown formatting outside of the JSON object. Just return the valid JSON data.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text || "";
  try {
    const jsonStr = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(jsonStr) as TravelPlanResponse;
  } catch (e) {
    console.error("Failed to parse JSON from Gemini", e);
    throw new Error("Invalid response from AI");
  }
}
