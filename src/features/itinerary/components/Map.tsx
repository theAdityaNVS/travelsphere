"use client";

interface MapProps {
  destination: string;
}

export default function Map({ destination }: MapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  
  if (!apiKey) {
    return <div className="bg-gray-100 rounded-xl h-[400px] flex items-center justify-center text-gray-500">Google Maps API key missing</div>;
  }

  const encodedDestination = encodeURIComponent(destination);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${apiKey}&q=${encodedDestination}`;

  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg border border-gray-100">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        src={mapUrl}
        title={`Map of ${destination}`}
        aria-label={`Interactive map showing ${destination}`}
      ></iframe>
    </div>
  );
}
