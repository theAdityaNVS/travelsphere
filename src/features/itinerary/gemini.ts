import { GoogleGenAI } from "@google/genai";
import { TravelPlanResponse } from "./types";
import { env } from "../../lib/env";

const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

export async function generateItinerary(
  destination: string,
  budget: string,
  duration: string,
  style: string,
  language: string,
  accessibility: string[]
): Promise<TravelPlanResponse> {
  const prompt = `You are an expert travel planner and accessibility advocate. Create a detailed ${duration} day itinerary for ${destination} focusing on a ${style} travel style with a ${budget} budget.
The user speaks ${language} and has the following accessibility requirements: ${accessibility.join(", ")}. Ensure all recommendations are strictly suitable for these requirements.

Provide a smart budget plan with estimated costs for each activity.

Format your response strictly as a JSON object with the following structure:
{
  "itinerary": [
    {
      "day": 1,
      "theme": "Arrival & City Center",
      "activities": [
        {
          "name": "Check-in at Hotel",
          "description": "Arrive and settle in.",
          "estimatedCost": "$0",
          "accessibilityNotes": "Wheelchair accessible entrance."
        }
      ]
    }
  ],
  "food": ["Local dish 1", "Restaurant 2"],
  "tips": ["Tip 1", "Tip 2"],
  "packing": ["Item 1", "Item 2"],
  "weather": {
    "summary": "Brief weather description for the typical season.",
    "temperature": { "low": "15°C", "high": "22°C" },
    "forecast": [
      { "day": 1, "condition": "Sunny", "temp": "20°C" }
    ],
    "recommendations": "Specific advice based on weather (e.g., bring an umbrella)."
  },
  "totalEstimatedCost": "$500"
}

Respond ONLY in ${language}. Do not include any other text, markdown formatting, or code blocks outside of the JSON object. Return strictly valid JSON data.`;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text || "";
  try {
    const jsonStr = text.replace(/```json/gi, "").replace(/```/g, "").trim();
    return JSON.parse(jsonStr) as TravelPlanResponse;
  } catch (e) {
    console.error("Failed to parse JSON from Gemini", e, text);
    throw new Error("Invalid response from AI");
  }
}

export async function chatAssistant(messages: { role: "user" | "model", content: string }[], newPrompt: string) {
  const systemInstruction = "You are a helpful travel assistant. Keep responses concise, friendly, and formatted in clean text or markdown.";
  const contents = messages.map(m => ({ role: m.role, parts: [{ text: m.content }] }));
  contents.push({ role: "user", parts: [{ text: newPrompt }] });
  
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      { role: "user", parts: [{ text: systemInstruction }] },
      { role: "model", parts: [{ text: "Understood." }] },
      ...contents
    ],
  });
  return response.text;
}
