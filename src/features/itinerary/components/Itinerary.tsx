"use client";

import Image from "next/image";

import { CheckCircle2, Copy, Check, Sparkles, DollarSign, Accessibility, Sunrise, Sunset, Utensils, Navigation } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { TravelPlanResponse } from "../types";
import { formatItineraryToMarkdown } from "../utils";
import { WeatherVisualization } from "@/components/WeatherVisualization";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ItineraryProps {
  plan: TravelPlanResponse;
}

export default function Itinerary({ plan }: ItineraryProps) {
  const [copied, setCopied] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" }, [
    Autoplay({ delay: 7000, stopOnInteraction: true, stopOnMouseEnter: true })
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  const handleCopy = () => {
    const md = formatItineraryToMarkdown(plan);
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getDayIcon = (theme: string) => {
    const l = theme.toLowerCase();
    if (l.includes("arrival") || l.includes("start")) return <Sunrise className="w-5 h-5" />;
    if (l.includes("depart") || l.includes("end")) return <Sunset className="w-5 h-5" />;
    if (l.includes("food") || l.includes("taste")) return <Utensils className="w-5 h-5" />;
    return <Navigation className="w-5 h-5" />;
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-72 md:h-[400px] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl"
      >
        <Image 
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop"
          alt={plan.itinerary[0]?.theme || "Destination"}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1200px"
          className="object-cover transition-transform duration-1000 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-10 left-8 right-8 text-white">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-primary/90 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-flex items-center gap-2"
          >
            <Sparkles className="w-3 h-3" /> {plan.itinerary.length} Day Journey
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70"
          >
            Discover {plan.itinerary[0]?.theme.split(" ").pop() || "the World"}
          </motion.h1>
        </div>
      </motion.div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2 flex items-center gap-3">
            Your Premium Itinerary <Sparkles className="w-7 h-7 text-primary animate-pulse" />
          </h2>
          {plan.totalEstimatedCost && (
            <p className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 font-semibold text-sm">
              <DollarSign className="w-4 h-4" /> Estimated Total: {plan.totalEstimatedCost}
            </p>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 px-5 py-2.5 bg-card hover:bg-primary/5 text-primary rounded-2xl transition-all border border-border shadow-sm hover:shadow-md active:scale-95 font-semibold text-sm"
          aria-label="Export itinerary as markdown"
        >
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? "Copied!" : "Export MD"}
        </button>
      </div>

      <WeatherVisualization weather={plan.weather} />

      {/* Itinerary Carousel */}
      <div className="relative pt-4">
        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
          <div className="flex touch-pan-y">
            {plan.itinerary.map((day, index) => (
              <div 
                key={day.day} 
                className="flex-[0_0_100%] min-w-0 pl-4 pr-4 md:flex-[0_0_80%] lg:flex-[0_0_70%]"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={cn(
                    "h-full p-8 rounded-3xl border transition-all duration-500",
                    "bg-card/50 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)]",
                    selectedIndex === index ? "border-primary/50 ring-1 ring-primary/20 scale-100" : "border-border/50 scale-[0.98] opacity-70"
                  )}
                >
                  <div className="flex items-start justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-indigo-600 flex items-center justify-center text-white shadow-lg">
                        <span className="text-xl font-bold">D{day.day}</span>
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{day.theme}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-1">
                          {getDayIcon(day.theme)} {day.activities.length} planned activities
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:h-full before:w-[2px] before:bg-gradient-to-b before:from-primary/50 before:to-transparent">
                    {day.activities.map((activity, i) => (
                      <div key={i} className="relative pl-8">
                        <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-background border-2 border-primary flex items-center justify-center -ml-1.5 z-10">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <div className="bg-background/50 hover:bg-background/80 transition-colors p-4 rounded-2xl border border-border/50">
                          <div className="flex justify-between items-start mb-2 gap-4">
                            <h4 className="font-bold text-lg text-foreground leading-tight">{activity.name}</h4>
                            <span className="shrink-0 inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                              {activity.estimatedCost}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm leading-relaxed mb-3">{activity.description}</p>
                          {activity.accessibilityNotes && (
                            <div className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30 px-2.5 py-1.5 rounded-lg">
                              <Accessibility className="w-3.5 h-3.5" />
                              {activity.accessibilityNotes}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {plan.itinerary.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "w-2.5 h-2.5 rounded-full transition-all duration-300",
                selectedIndex === i ? "bg-primary w-8" : "bg-primary/20 hover:bg-primary/40"
              )}
              aria-label={`Go to day ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        {plan.food && plan.food.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card/50 backdrop-blur-lg p-6 rounded-3xl border border-border shadow-lg"
          >
            <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 text-xl shadow-inner">🍜</span>
              Must Try Food
            </h3>
            <ul className="space-y-4">
              {plan.food.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {plan.tips && plan.tips.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card/50 backdrop-blur-lg p-6 rounded-3xl border border-border shadow-lg"
          >
            <h3 className="text-xl font-bold mb-5 flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 text-xl shadow-inner">💡</span>
              Local Secrets
            </h3>
            <ul className="space-y-4">
              {plan.tips.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-foreground/80 leading-relaxed">
                  <Sparkles className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {plan.packing && plan.packing.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-card/50 backdrop-blur-lg p-8 rounded-3xl border border-border shadow-lg mt-6"
        >
          <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 text-xl shadow-inner">🎒</span>
            Packing Checklist
          </h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {plan.packing.map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-sm font-medium text-foreground/80 bg-background/50 p-3 rounded-xl border border-border/50">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}
