import { env } from "../env";

export const getMapsApiKey = () => {
  return env.NEXT_PUBLIC_MAPS_API_KEY || "";
};

export async function fetchPlaceDetails(placeId: string) {
  // Example abstraction for Places API
  if (!getMapsApiKey()) return null;
  const url = `https://places.googleapis.com/v1/places/${placeId}?fields=id,displayName,photos,rating&key=${getMapsApiKey()}`;
  const response = await fetch(url);
  if (!response.ok) return null;
  return await response.json();
}
