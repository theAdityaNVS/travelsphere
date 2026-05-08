# Backend & AI Documentation

## What was built
The intelligent core of TravelSphere, responsible for generating complex itineraries and providing a conversational interface.

### Key Components:
- **Gemini API Integration**: Uses `gemini-2.5-flash` for high-speed, structured JSON generation.
- **Server Actions**: Secure `use server` functions for itinerary generation and chat persistence.
- **Zod Validation Layer**: Schema-based validation for all user inputs before AI processing.
- **Structured Prompting**: Advanced multi-step prompts to ensure AI responses adhere strictly to JSON schemas.

## Why was it built this way
- **Gemini 2.5 Flash**: Chosen for its balance of speed and low cost, perfect for a high-traffic travel planner.
- **Server Actions**: By running logic on the server, we keep API keys secure and reduce the amount of JavaScript sent to the client.
- **Zod**: Provides a "single source of truth" for types that works for both TypeScript and runtime validation.
- **JSON Mode**: We enforce JSON output in the prompt to ensure the frontend can reliably parse activities into UI components.

## How was it done (Step-by-Step)
1.  **AI Engine Setup**: Configured `@google/genai` in `src/features/itinerary/gemini.ts`.
2.  **Schema Definition**: Created `TravelPlanRequestSchema` in `types.ts` to validate budget, style, and accessibility fields.
3.  **Prompt Engineering**: Crafted a system prompt that specifies:
    -   Structural requirements (JSON structure).
    -   Constraints (accessibility focus, budget adherence).
    -   Localization (language requirements).
4.  **Error Resilience**:
    -   Implemented a "Fallback Itinerary" system in `actions.ts` so the demo works even if the Gemini API hits rate limits.
    -   Added robust JSON parsing logic to strip markdown code blocks from AI responses.
5.  **Conversational Loop**: Integrated `chatAssistant` which maintains a message history to provide context-aware travel advice.
