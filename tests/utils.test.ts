import { describe, it, expect } from 'vitest';
import { formatItineraryToMarkdown } from '../src/features/itinerary/utils';

describe('utils', () => {
  describe('formatItineraryToMarkdown', () => {
    it('returns empty string when plan is null', () => {
      expect(formatItineraryToMarkdown(null)).toBe('');
    });

    it('formats a complete plan to markdown correctly', () => {
      const mockPlan = {
        weather: 'Sunny and 25C',
        itinerary: [
          { day: 1, theme: 'Arrival', activities: ['Check in', 'Rest'] }
        ],
        food: ['Pizza'],
        tips: ['Use public transport'],
        packing: ['Sunscreen']
      };
      
      const markdown = formatItineraryToMarkdown(mockPlan);
      expect(markdown).toContain('## Weather\nSunny and 25C');
      expect(markdown).toContain('### Day 1: Arrival');
      expect(markdown).toContain('- Check in');
      expect(markdown).toContain('## Food Recommendations\n- Pizza');
      expect(markdown).toContain('## Local Tips\n- Use public transport');
      expect(markdown).toContain('## Packing Checklist\n- [ ] Sunscreen');
    });

    it('handles missing fields gracefully', () => {
      const mockPlan = {
        itinerary: [
          { day: 1, theme: 'Arrival', activities: ['Check in'] }
        ],
        food: [],
        tips: [],
        packing: [],
      };
      
      const markdown = formatItineraryToMarkdown(mockPlan);
      expect(markdown).toContain('### Day 1: Arrival');
      expect(markdown).not.toContain('## Weather');
      expect(markdown).not.toContain('## Food Recommendations');
    });
  });
});
