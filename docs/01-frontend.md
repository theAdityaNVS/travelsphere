# Frontend Documentation

## What was built
A high-performance, accessible, and responsive user interface for TravelSphere AI. The frontend allows users to input travel preferences and visualize generated itineraries with integrated maps and a conversational AI assistant.

### Key Components:
- **Interactive Form**: A multi-field selection system for destination, budget, duration, style, and accessibility needs.
- **Dynamic Itinerary View**: An Embla-carousel-powered daily view with activity cards.
- **Real-time Map**: Google Maps integration for visualizing trip locations.
- **AI Chat Assistant**: A slide-in or sidebar component for refining trip details.
- **Responsive Navigation**: Sticky header with dark mode toggle.

## Why was it built this way
- **Next.js 15 & React 19**: Leverages the latest server component patterns for SEO and client components for interactivity.
- **Tailwind CSS 4**: Used for a modern, token-based design system that supports dark mode and responsive layouts natively.
- **Embla Carousel**: Selected for its lightweight footprint and touch-friendly performance compared to heavier slider libraries.
- **Framer Motion**: Adds premium micro-animations (fade-ins, scale-ups) to make the experience feel "alive."
- **Accessibility-First**: Used semantic HTML and ARIA roles to ensure screen reader compatibility.

## How was it done (Step-by-Step)
1.  **Design Tokens**: Established a base `index.css` with HSL color variables for both light and dark themes.
2.  **Layout Scaffolding**: Created a global `layout.tsx` with a shared header/footer and the `ThemeProvider` for consistent UI state.
3.  **Component Modularization**: Split the UI into functional features under `src/features/itinerary/components/` (Chat, Map, Itinerary, Form).
4.  **State Management**: Used standard React `useState` for UI states (theme, selected trip) and Next.js Server Actions for data fetching to avoid complex client-side state libraries.
5.  **Performance Polishing**:
    -   Implemented `priority` on above-the-fold images to fix LCP.
    -   Used `next/image` with proper `sizes` to optimize assets.
    -   Lazy-loaded the Map component to reduce initial bundle size.
