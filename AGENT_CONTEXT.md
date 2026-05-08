# 專案上下文 (Agent Context)：travelsphere

> **最後更新時間**：2026-05-08 22:06
> **自動生成**：由 `prepare_context.py` 產生，供 AI Agent 快速掌握專案全局

---

## 🎯 1. 專案目標 (Project Goal)
* **核心目的**：TravelSphere AI is an enterprise-grade, serverless application that autonomously designs personalized travel itineraries using Google's Gemini AI. Built for the PromptWars 2026 Hackathon.
* _完整說明見 [README.md](README.md)_

## 🛠️ 2. 技術棧與環境 (Tech Stack & Environment)
* **核心套件**：@google-cloud/bigquery, @google-cloud/logging, @google/genai, @vis.gl/react-google-maps, clsx, embla-carousel-autoplay, embla-carousel-react, firebase, firebase-admin, framer-motion
* **開發套件**：@eslint/eslintrc, @playwright/test, @tailwindcss/postcss, @testing-library/dom, @testing-library/react, @types/node, @types/react, @types/react-dom
* **可用指令**：dev, build, start, lint, test, test:e2e

### 原始設定檔

<details><summary>package.json</summary>

```json
{
  "name": "travelsphere",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build --turbopack",
    "start": "node .next/standalone/server.js",
    "lint": "eslint",
    "test": "vitest",
    "test:e2e": "playwright test"
  },
  "dependencies": {
    "@google-cloud/bigquery": "^8.3.0",
    "@google-cloud/logging": "^11.2.1",
    "@google/genai": "^2.0.0",
    "@vis.gl/react-google-maps": "^1.8.3",
    "clsx": "^2.1.1",
    "embla-carousel-autoplay": "^8.6.0",
    "embla-carousel-react": "^8.6.0",
    "firebase": "^12.13.0",
    "firebase-admin": "^13.9.0",
    "framer-motion": "^12.38.0",
    "lucide-react": "^1.14.0",
    "next": "15.5.18",
    "next-themes": "^0.4.6",
    "react": "19.1.0",
    "react-dom": "19.1.0",
    "tailwind-merge": "^3.5.0",
    "zod": "^4.4.3"
  },
  "devDependencies": {
    "@eslint/eslintrc": "^3",
    "@playwright/test": "^1.59.1",
    "@tailwindcss/postcss": "^4",
    "@testing-library/dom": "^10.4.1",
    "@testing-library/react": "^16.3.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^6.0.1",
    "@vitest/coverage-v8": "^4.1.5",
    "eslint": "^9",
    "eslint-config-next": "15.5.18",
    "eslint-config-prettier": "^10.1.8",
    "husky": "^9.1.7",
    "jsdom": "^29.1.1",
    "lint-staged": "^16.4.0",
    "prettier": "^3.8.3",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vitest": "^4.1.5"
  }
}

```
</details>

<details><summary>.env.example</summary>

```text
# Gemini API
GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Public (Prefix with NEXT_PUBLIC_)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id

# Firebase Admin (Server-side ONLY)
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-xxxxx@your_project_id.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"

# Google Maps (Prefix with NEXT_PUBLIC_ for client-side use)
NEXT_PUBLIC_MAPS_API_KEY=your_google_maps_api_key

```
</details>

## 📂 3. 核心目錄結構 (Core Structure)
_(💡 AI 讀取守則：請依據此結構尋找對應檔案，勿盲目猜測路徑)_
```text
travelsphere/
├── AGENT_CONTEXT.md
├── Dockerfile
├── INSTRUCTIONS.md
├── README.md
├── coverage
│   ├── base.css
│   ├── block-navigation.js
│   ├── clover.xml
│   ├── coverage-final.json
│   ├── favicon.png
│   ├── index.html
│   ├── prettify.css
│   ├── prettify.js
│   ├── sort-arrow-sprite.png
│   ├── sorter.js
│   └── utils.ts.html
├── diary
│   └── 2026
│       └── 05
├── docs
│   ├── 00-project-manifesto.md
│   ├── 01-frontend.md
│   ├── 02-backend-ai.md
│   ├── 03-docker.md
│   ├── 04-firebase.md
│   ├── 05-gcloud-setup.md
│   ├── 06-security-performance.md
│   └── nextjs-mastery.md
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package-lock.json
├── package.json
├── playwright.config.ts
├── postcss.config.mjs
├── public
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
├── src
│   ├── app
│   │   ├── favicon.ico
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── trip
│   ├── components
│   │   ├── AnimatedBackground.tsx
│   │   ├── ExampleSuggestions.tsx
│   │   ├── ShowcaseTrips.tsx
│   │   ├── ThemeProvider.tsx
│   │   ├── ThemeToggle.tsx
│   │   └── WeatherVisualization.tsx
│   ├── features
│   │   ├── auth
│   │   └── itinerary
│   ├── lib
│   │   ├── api
│   │   ├── env.ts
│   │   ├── firebase
│   │   └── logger.ts
│   └── middleware.ts
├── tests
│   ├── e2e
│   │   └── itinerary.spec.ts
│   └── utils.test.ts
├── tsconfig.json
├── tsconfig.tsbuildinfo
└── vitest.config.mts
```

## 🏛️ 4. 架構與設計約定 (Architecture & Conventions)
* _（尚無 `.auto-skill-local.md`，專案踩坑經驗將在開發過程中自動累積）_

## 🚦 5. 目前進度與待辦 (Current Status & TODO)
_(自動提取自最近日記 2026-05-08)_

### 🚧 待辦事項
- [ ] Implement collaborative editing of the itinerary via Firebase Realtime Database.
- [ ] Add "Export to Calendar" functionality for generated trips.
- [ ] Integrate image generation for each day's highlight activity using the Gemini API.

