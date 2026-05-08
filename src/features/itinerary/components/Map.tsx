"use client";

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { TravelPlanResponse } from "../types";
import { useEffect, useState } from "react";
import { geocodeDestination } from "../actions";
import { MapPin, Loader2 } from "lucide-react";

interface MapExperienceProps {
  destination: string;
  plan?: TravelPlanResponse;
}

export default function MapExperience({ destination, plan }: MapExperienceProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";
  const [markerCoords, setMarkerCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    if (!destination) return;
    setIsGeocoding(true);
    setMarkerCoords(null);

    geocodeDestination(destination)
      .then((coords) => {
        if (coords) {
          setMarkerCoords(coords);
          // Increment key to force Map remount with new defaultCenter/defaultZoom
          setMapKey((k) => k + 1);
        }
      })
      .catch(console.error)
      .finally(() => setIsGeocoding(false));
  }, [destination]);

  if (!apiKey) {
    return (
      <div className="w-full h-[320px] bg-muted rounded-3xl flex flex-col items-center justify-center text-muted-foreground border border-border gap-3">
        <MapPin className="w-8 h-8 opacity-30" />
        <span className="text-sm font-medium">Map unavailable</span>
        <span className="text-xs opacity-60">Configure NEXT_PUBLIC_GOOGLE_MAPS_API_KEY</span>
      </div>
    );
  }

  const center = markerCoords ?? { lat: 20, lng: 0 };
  const zoom = markerCoords ? 11 : 2;

  return (
    <APIProvider apiKey={apiKey}>
      <div className="w-full h-[320px] rounded-3xl overflow-hidden shadow-xl border border-border relative">

        {/* Geocoding loader overlay */}
        {isGeocoding && (
          <div className="absolute inset-0 z-10 bg-muted/70 backdrop-blur-sm flex flex-col items-center justify-center gap-2 pointer-events-none">
            <Loader2 className="w-6 h-6 animate-spin text-primary" />
            <span className="text-xs text-muted-foreground">Locating {destination}…</span>
          </div>
        )}

        {/*
          The `key` prop forces a full Map remount when coords change.
          This is necessary because @vis.gl/react-google-maps ignores
          `defaultCenter` / `defaultZoom` updates after first render.
        */}
        <Map
          key={mapKey}
          defaultCenter={center}
          defaultZoom={zoom}
          gestureHandling="greedy"
          disableDefaultUI={false}
          zoomControl={true}
          mapTypeControl={false}
          streetViewControl={false}
          fullscreenControl={false}
          // mapId is required for AdvancedMarker; use "DEMO_MAP_ID" for testing
          // Replace with your own Maps Platform mapId in production
          mapId="DEMO_MAP_ID"
        >
          {markerCoords && (
            <AdvancedMarker position={markerCoords} title={destination}>
              <Pin
                background="#6366f1"
                borderColor="#4338ca"
                glyphColor="#fff"
              />
            </AdvancedMarker>
          )}
        </Map>

        {/* Info overlay */}
        <div className="absolute bottom-4 left-4 right-4 bg-card/95 backdrop-blur-md p-4 rounded-2xl border border-border shadow-lg pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
            <MapPin className="w-4 h-4 text-primary shrink-0" />
            <h4 className="font-bold text-sm truncate">{destination}</h4>
          </div>
          <p className="text-xs text-muted-foreground pl-6">
            {plan?.itinerary?.length ?? 0} day{plan?.itinerary?.length !== 1 ? "s" : ""} of exploration planned
          </p>
        </div>
      </div>
    </APIProvider>
  );
}
