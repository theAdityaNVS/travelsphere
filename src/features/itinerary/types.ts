import { z } from "zod";

export const TravelStyleSchema = z.enum(["Adventure", "Relaxation", "Culture", "Food"]);
export type TravelStyle = z.infer<typeof TravelStyleSchema>;

export const BudgetSchema = z.enum(["budget", "moderate", "luxury"]);
export type Budget = z.infer<typeof BudgetSchema>;

export const TravelPlanRequestSchema = z.object({
  destination: z.string().min(2, "Destination must be at least 2 characters long"),
  budget: BudgetSchema,
  duration: z.coerce.number().min(1).max(30, "Duration must be between 1 and 30 days"),
  style: TravelStyleSchema,
});
export type TravelPlanRequest = z.infer<typeof TravelPlanRequestSchema>;

export const ActivitySchema = z.object({
  day: z.number().int().positive(),
  theme: z.string(),
  activities: z.array(z.string()),
});
export type Activity = z.infer<typeof ActivitySchema>;

export const TravelPlanResponseSchema = z.object({
  itinerary: z.array(ActivitySchema),
  food: z.array(z.string()).optional().default([]),
  tips: z.array(z.string()).optional().default([]),
  packing: z.array(z.string()).optional().default([]),
  weather: z.string().optional().default(""),
});
export type TravelPlanResponse = z.infer<typeof TravelPlanResponseSchema>;
