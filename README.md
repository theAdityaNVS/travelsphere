# TravelSphere AI

TravelSphere AI is an enterprise-grade, serverless application that autonomously designs personalized travel itineraries using Google's Gemini AI. Built for the PromptWars 2026 Hackathon.

## 🏗 Architecture Overview

TravelSphere employs a modern Serverless architecture hosted on Google Cloud Run, utilizing Next.js App Router for optimal performance.

```mermaid
graph TD;
    Client[Client UI] -->|React 19 Server Actions| NextJS[Next.js App Router];
    NextJS -->|Zod Validation| ValidationLayer;
    ValidationLayer -->|@google/genai| Gemini[Gemini API];
    ValidationLayer -->|Admin SDK| Firestore[(Firebase Firestore)];
    ValidationLayer -->|Logging| CloudLogging[Google Cloud Logging];
```

## ✨ Key Features
- **AI-Powered Itineraries:** Context-aware trip generation via Gemini 2.5 Flash.
- **Server Actions:** Secure, zero-bundle-size data mutations.
- **Zod Validation:** End-to-end type safety and runtime validation.
- **Enterprise Security:** Strict CSP headers, rate limiting, and SSRF protection.
- **Accessibility First:** ARIA compliant, keyboard navigable, and semantic HTML.

## 🧪 Testing Strategy
- **Unit/Integration:** 100% coverage on core utilities using `Vitest`.
- **E2E:** `Playwright` testing for critical user paths.
- **Accessibility:** `axe-core` CI pipeline validation.

## ⚡ Performance Optimization
- **Lighthouse Score:** Target 95+ across all metrics.
- **Dynamic Imports:** Heavy client components (like Maps) are lazy-loaded.
- **Streaming:** UI streaming during Gemini generation.

## 🚀 Google Cloud Integrations
- **Cloud Run:** Containerized deployment for scalable execution.
- **Firebase / Firestore:** Robust NoSQL document storage.
- **Gemini API:** Core intelligence engine.
- **Cloud Logging:** Distributed observability.

## 📦 Deployment
1. Build the Docker container: `docker build -t travelsphere .`
2. Deploy to Cloud Run: `gcloud run deploy travelsphere --image travelsphere --platform managed`

## 📚 Technical Documentation
For detailed step-by-step guides on how this project was built and configured, please refer to the following:
- [00: Project Manifesto & Architecture](./docs/00-project-manifesto.md)
- [01: Frontend & UI Design](./docs/01-frontend.md)
- [02: Backend & Gemini AI](./docs/02-backend-ai.md)
- [03: Docker & Containerization](./docs/03-docker.md)
- [04: Firebase & Data Infrastructure](./docs/04-firebase.md)
- [05: Google Cloud Setup & Deployment](./docs/05-gcloud-setup.md)
- [06: Security & Performance](./docs/06-security-performance.md)


## 🔒 Security Posture
- Strict Content Security Policy (CSP).
- Input sanitization via Zod.
- Secrets securely managed in Server-only environments.

## 🗺 Future Roadmap
- Collaborative multi-user itinerary planning.
- BigQuery analytics for usage patterns.
- Real-time weather API integration.
