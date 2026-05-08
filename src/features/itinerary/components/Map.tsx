"use client";

import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { TravelPlanResponse } from "../types";

interface MapExperienceProps {
  destination: string;
  plan?: TravelPlanResponse;
}

import { useEffect, useState } from "react";
import { getMapsApiKey } from "../actions";

export default function MapExperience({ destination, plan }: MapExperienceProps) {
  const [apiKey, setApiKey] = useState<string>("");

  useEffect(() => {
    getMapsApiKey().then(key => setApiKey(key)).catch(console.error);
  }, []);

  if (!apiKey) {
    return (
      <div className="w-full h-[500px] bg-muted rounded-3xl flex items-center justify-center text-muted-foreground border border-border">
        Loading Map...
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="w-full h-[500px] rounded-3xl overflow-hidden shadow-xl border border-border relative group">
        <Map
          defaultCenter={{ lat: 0, lng: 0 }}
          defaultZoom={3}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="bf50a913160a24f0" // Optional: custom styled map id
        >
          {/* We would normally geocode the destination and activities here. 
              For this demo, we'll show a placeholder message or just the map of the area.
              Real implementation would use a geocoding service. */}
        </Map>
        
        <div className="absolute bottom-4 left-4 right-4 bg-card/90 backdrop-blur-md p-4 rounded-2xl border border-border shadow-lg">
          <h4 className="font-bold text-sm mb-1">{destination}</h4>
          <p className="text-xs text-muted-foreground">
            {plan?.itinerary.length} days of exploration planned.
          </p>
        </div>
      </div>
    </APIProvider>
  );
}
