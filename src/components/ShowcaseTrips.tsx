"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Star } from "lucide-react";
import Image from "next/image";
import { TravelExample } from "./ExampleSuggestions";

const SHOWCASE_TRIPS: (TravelExample & { image: string, rating: number, title: string })[] = [
  {
    title: "Tokyo Explorer",
    destination: "Tokyo, Japan",
    duration: 7,
    budget: "moderate",
    style: "Adventure",
    image: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    emoji: "🗾",
  },
  {
    title: "Bali Wellness Retreat",
    destination: "Bali, Indonesia",
    duration: 10,
    budget: "luxury",
    style: "Relaxation",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=800&auto=format&fit=crop",
    rating: 4.8,
    emoji: "🧘‍♀️",
  },
  {
    title: "Paris Romantic Escape",
    destination: "Paris, France",
    duration: 4,
    budget: "luxury",
    style: "Romantic",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    rating: 4.9,
    emoji: "🥐",
  },
];

interface ShowcaseTripsProps {
  onSelect?: (example: TravelExample) => void;
}

export function ShowcaseTrips({ onSelect }: ShowcaseTripsProps) {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h3 className="text-3xl font-bold tracking-tight mb-4">Popular Destinations</h3>
            <p className="text-muted-foreground max-w-lg">
              Explore our hand-picked AI-generated itineraries to get inspired for your next adventure.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {SHOWCASE_TRIPS.map((trip, i) => (
            <motion.div
              key={trip.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group cursor-pointer"
              onClick={() => onSelect?.(trip)}
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mb-6 shadow-xl shadow-primary/5 transition-transform duration-500 group-hover:scale-[1.02]">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i === 0}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute top-4 right-4">
                  <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-full px-3 py-1 flex items-center gap-1 text-white text-xs font-bold">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    {trip.rating}
                  </div>
                </div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs font-bold uppercase tracking-widest mb-2 opacity-80">{trip.style}</div>
                  <h4 className="text-2xl font-bold mb-2">{trip.title}</h4>
                  <div className="flex items-center gap-3 text-sm opacity-90">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {trip.destination}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {trip.duration} Days
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
