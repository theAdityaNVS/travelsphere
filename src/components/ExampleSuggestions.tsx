"use client";

import { motion } from "framer-motion";

export interface TravelExample {
  title: string;
  emoji: string;
  destination: string;
  duration: number;
  budget: string;
  style: string;
}

const EXAMPLES: TravelExample[] = [
  { emoji: "✈️", title: "7-Day Japan Adventure", destination: "Tokyo, Japan", duration: 7, budget: "moderate", style: "Adventure" },
  { emoji: "🏖", title: "Bali Remote Work", destination: "Bali, Indonesia", duration: 14, budget: "budget", style: "Relaxation" },
  { emoji: "🍝", title: "Italy Food Tour", destination: "Rome, Italy", duration: 5, budget: "luxury", style: "Food" },
  { emoji: "👨‍👩‍👧", title: "Swiss Family Trip", destination: "Interlaken, Switzerland", duration: 10, budget: "moderate", style: "Family" },
  { emoji: "💸", title: "Europe Backpacking", destination: "Berlin, Germany", duration: 21, budget: "budget", style: "Culture" },
  { emoji: "❤️", title: "Romantic Paris", destination: "Paris, France", duration: 4, budget: "luxury", style: "Romantic" },
];

interface ExampleSuggestionsProps {
  onSelect: (example: TravelExample) => void;
}

export function ExampleSuggestions({ onSelect }: ExampleSuggestionsProps) {
  return (
    <div className="mb-8">
      <p className="text-sm font-semibold text-muted-foreground mb-4 text-center uppercase tracking-wider">Try an example</p>
      <div className="flex flex-wrap justify-center gap-2">
        {EXAMPLES.map((ex, i) => (
          <motion.button
            key={ex.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(ex)}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
          >
            <span className="text-lg group-hover:scale-125 transition-transform">{ex.emoji}</span>
            <span className="text-xs font-bold whitespace-nowrap uppercase opacity-70 group-hover:opacity-100">{ex.title}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
