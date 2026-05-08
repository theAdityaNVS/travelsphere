import { GoogleGenAI } from "@google/genai";
import { env } from "../env";

// Initialize the Gemini API client
export const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY });

// We can expose generic abstractions here
export async function streamGeminiGeneration(systemPrompt: string, userPrompt: string) {
  return await ai.models.generateContentStream({
    model: "gemini-2.0-flash",
    contents: `${systemPrompt}\n<USER_INPUT>${userPrompt}</USER_INPUT>`,
  });
}
