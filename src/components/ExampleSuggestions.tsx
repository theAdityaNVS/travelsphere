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
    <div className="mb-12">
      <p className="text-sm font-semibold text-muted-foreground mb-4 text-center uppercase tracking-wider">Try an example</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {EXAMPLES.map((ex, i) => (
          <motion.button
            key={ex.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(ex)}
            className="flex flex-col items-center p-3 rounded-2xl bg-card border border-border hover:border-primary/50 hover:bg-accent/50 transition-all group"
          >
            <span className="text-2xl mb-2 group-hover:scale-125 transition-transform">{ex.emoji}</span>
            <span className="text-[10px] font-bold text-center leading-tight uppercase opacity-70 group-hover:opacity-100">{ex.title}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
