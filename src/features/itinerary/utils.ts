import { TravelPlanResponse } from './types';

export function formatItineraryToMarkdown(plan: TravelPlanResponse | null): string {
  if (!plan) return '';
  
  let markdown = `# Travel Itinerary\n\n`;
  
  if (plan.weather) {
    markdown += `## Weather\n${plan.weather}\n\n`;
  }
  
  if (plan.itinerary && plan.itinerary.length > 0) {
    markdown += `## Itinerary\n\n`;
    plan.itinerary.forEach((day) => {
      markdown += `### Day ${day.day}: ${day.theme}\n`;
      day.activities.forEach((activity: string) => {
        markdown += `- ${activity}\n`;
      });
      markdown += `\n`;
    });
  }

  if (plan.food && plan.food.length > 0) {
    markdown += `## Food Recommendations\n`;
    plan.food.forEach((item: string) => {
      markdown += `- ${item}\n`;
    });
    markdown += `\n`;
  }

  if (plan.tips && plan.tips.length > 0) {
    markdown += `## Local Tips\n`;
    plan.tips.forEach((tip: string) => {
      markdown += `- ${tip}\n`;
    });
    markdown += `\n`;
  }

  if (plan.packing && plan.packing.length > 0) {
    markdown += `## Packing Checklist\n`;
    plan.packing.forEach((item: string) => {
      markdown += `- [ ] ${item}\n`;
    });
    markdown += `\n`;
  }

  return markdown;
}
