import { z } from "zod";

export const TravelStyleSchema = z.enum(["Adventure", "Relaxation", "Culture", "Food", "Family", "Romantic"]);
export type TravelStyle = z.infer<typeof TravelStyleSchema>;

export const BudgetSchema = z.enum(["budget", "moderate", "luxury"]);
export type Budget = z.infer<typeof BudgetSchema>;

export const LanguageSchema = z.enum(["English", "Spanish", "French", "German", "Japanese", "Mandarin"]);
export type Language = z.infer<typeof LanguageSchema>;

export const AccessibilitySchema = z.array(z.enum(["Wheelchair", "Visual", "Hearing", "Cognitive", "None"])).default(["None"]);
export type Accessibility = z.infer<typeof AccessibilitySchema>;

export const TravelPlanRequestSchema = z.object({
  destination: z.string().min(2, "Destination must be at least 2 characters long"),
  budget: BudgetSchema,
  duration: z.coerce.number().min(1).max(30, "Duration must be between 1 and 30 days"),
  style: TravelStyleSchema,
  language: LanguageSchema.default("English"),
  accessibility: AccessibilitySchema,
});
export type TravelPlanRequest = z.infer<typeof TravelPlanRequestSchema>;

export const ActivitySchema = z.object({
  day: z.number().int().positive(),
  theme: z.string(),
  activities: z.array(z.object({
    name: z.string(),
    description: z.string(),
    estimatedCost: z.string(),
    accessibilityNotes: z.string().optional(),
  })),
});
export type Activity = z.infer<typeof ActivitySchema>;

export const WeatherSchema = z.object({
  summary: z.string(),
  temperature: z.object({
    low: z.string(),
    high: z.string(),
  }),
  forecast: z.array(z.object({
    day: z.number(),
    condition: z.string(),
    temp: z.string(),
  })).optional(),
  recommendations: z.string(),
});

export const TravelPlanResponseSchema = z.object({
  itinerary: z.array(ActivitySchema),
  food: z.array(z.string()).optional().default([]),
  tips: z.array(z.string()).optional().default([]),
  packing: z.array(z.string()).optional().default([]),
  weather: z.union([z.string(), WeatherSchema]).optional(),
  totalEstimatedCost: z.string().optional(),
});
export type TravelPlanResponse = z.infer<typeof TravelPlanResponseSchema>;
