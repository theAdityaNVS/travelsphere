# Project Manifesto: TravelSphere AI

## What was built
TravelSphere AI is an autonomous travel planning engine designed to transform high-level user intent into detailed, actionable, and visually rich itineraries. It bridges the gap between static travel guides and personalized travel agency services by leveraging state-of-the-art Generative AI.

### Core Ecosystem:
- **Intelligence Layer**: Google Gemini 2.5 Flash for rapid, context-aware reasoning.
- **Persistence Layer**: Google Cloud Firestore for real-time document storage.
- **Execution Layer**: Next.js 15 (React 19) running on Google Cloud Run.
- **Visual Layer**: Google Maps API & Unsplash Image API.

## Why was it built this way
- **Speed-to-Value**: Gemini 2.5 Flash was chosen for its low latency and high context window, allowing for "on-the-fly" itinerary generation without keeping the user waiting.
- **Infinite Scalability**: Using Cloud Run (containers) ensures the app can scale from zero to thousands of users automatically during the hackathon peak.
- **Zero-Trust Security**: By utilizing Next.js Server Actions, the Gemini API key and Firebase credentials never touch the client-side, eliminating common leakage vectors.
- **Performance First**: The "Standalone" build mode and multi-stage Docker builds were used to keep image sizes small (<200MB), leading to sub-second cold starts.

## High-Level Architecture (Step-by-Step)
1.  **Intent Capture**: The user submits preferences via a responsive Tailwind UI.
2.  **AI Orchestration**: A Next.js Server Action sanitizes the input with **Zod** and triggers the Gemini generation with a strict JSON-enforcing system prompt.
3.  **Data Persistence**: The generated itinerary is stored in **Firestore** with a unique ID, enabling easy sharing via persistent URLs.
4.  **UI Streaming**: The frontend receives the response and renders an interactive dashboard featuring a **Map**, **Chat Assistant**, and **Carousel-based Itinerary**.
5.  **Refinement Loop**: The user can chat with the "TravelSphere Assistant" to modify the trip (e.g., "Make it more family-friendly"), which triggers a partial update to the Firestore document.

---
*Next Step: See [01-frontend.md](./01-frontend.md) for UI implementation details.*
