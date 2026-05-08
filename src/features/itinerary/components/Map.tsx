"use client";

import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import { TravelPlanResponse } from "../types";

interface MapExperienceProps {
  destination: string;
  plan?: TravelPlanResponse;
}

import { useEffect, useState } from "react";
import { getMapsApiKey } from "../actions";

export default function MapExperience({ destination, plan }: MapExperienceProps) {
  const [apiKey, setApiKey] = useState<string>("");
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [zoom, setZoom] = useState(3);
  const [markerCoords, setMarkerCoords] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    getMapsApiKey().then(key => setApiKey(key)).catch(console.error);
  }, []);

  useEffect(() => {
    if (!apiKey || !destination) return;
    
    let isMounted = true;
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(destination)}&key=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        if (data.results && data.results.length > 0 && isMounted) {
          const location = data.results[0].geometry.location;
          setCenter(location);
          setMarkerCoords(location);
          setZoom(10);
        }
      })
      .catch(console.error);
      
    return () => { isMounted = false; };
  }, [apiKey, destination]);

  if (!apiKey) {
    return (
      <div className="w-full h-[300px] bg-muted rounded-3xl flex items-center justify-center text-muted-foreground border border-border">
        Loading Map...
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey}>
      <div className="w-full h-[300px] rounded-3xl overflow-hidden shadow-xl border border-border relative group">
        <Map
          center={center}
          zoom={zoom}
          onCenterChanged={(ev) => setCenter(ev.detail.center)}
          onZoomChanged={(ev) => setZoom(ev.detail.zoom)}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId="bf50a913160a24f0" // Optional: custom styled map id
        >
          {markerCoords && (
            <AdvancedMarker position={markerCoords}>
              <Pin background={"#FF385C"} borderColor={"#FF385C"} glyphColor={"#fff"} />
            </AdvancedMarker>
          )}
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
