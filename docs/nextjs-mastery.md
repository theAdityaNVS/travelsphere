# Next.js Mastery Guide: From React to Next.js 15

This guide uses a "diff" format to show you how Next.js simplifies and enhances standard React development.

## 1. Routing: From Config to Folders
In standard React, you use `react-router-dom` with a big configuration file. In Next.js, the **filesystem is the router**.

### The React Way (Imperative)
```jsx
// App.js
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/trip/:id" element={<TripDetails />} />
</Routes>
```

### The Next.js Way (Declarative)
```text
src/app/
├── page.tsx          // Maps to /
├── about/
│   └── page.tsx      // Maps to /about
└── trip/
    └── [id]/
        └── page.tsx  // Maps to /trip/123 (Dynamic Route)
```

---

## 2. Components: Server vs. Client
This is the biggest change. By default, all components in the `app` directory are **Server Components**.

### The Transition
```diff
+ // This is a Server Component (Default)
+ // - Fetches data on the server
+ // - No 'useEffect' or 'useState'
+ // - Faster: Sends zero JS to the browser

- // If you need interactivity (onClick, useState, etc.):
+ 'use client';
+ 
+ import { useState } from 'react';
+ 
+ export default function Counter() {
+   const [count, setCount] = useState(0);
+   return <button onClick={() => setCount(count + 1)}>{count}</button>;
+ }
```

---

## 3. Data Fetching: No more `useEffect`
In Next.js, you fetch data directly in your Server Component using `async/await`.

### Standard React (The "Waterfall")
```jsx
function Profile() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    fetch('/api/user').then(res => res.json()).then(setData);
  }, []);

  if (!data) return <Loading />;
  return <div>{data.name}</div>;
}
```

### Next.js (The "Direct Fetch")
```tsx
// This component IS an async function!
export default async function Profile() {
  const res = await fetch('https://api.example.com/user');
  const data = await res.json();

  return <div>{data.name}</div>;
}
```

---

## 4. Server Actions: Forms without APIs
Next.js allows you to write functions that run on the server but are called from the client.

### The Old Way
1. Create a `pages/api/submit.js` file.
2. Write a handler to parse JSON.
3. Call `fetch('/api/submit', { method: 'POST' })` from the form.

### The Next.js Way
```tsx
export default function Form() {
  async function createTrip(formData: FormData) {
    'use server'; // This makes the function run on the server!
    const destination = formData.get('destination');
    // Save to database here...
  }

  return (
    <form action={createTrip}>
      <input name="destination" />
      <button type="submit">Create Trip</button>
    </form>
  );
}
```

---

## 5. Layouts: Shared UI
Layouts allow you to wrap pages with shared UI (like Navbars) without re-rendering them on navigation.

```tsx
// src/app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Navbar />
        <main>{children}</main> {/* The page content goes here */}
        <Footer />
      </body>
    </html>
  );
}
```

---

## 6. Pro-Tip: Running "Standalone" Mode
In your project, you have `output: 'standalone'` enabled in `next.config.ts`. This is for production (Cloud Run/Docker).

- **`npm run dev`**: Best for coding. High speed, hot reloading.
- **`npm run build`**: Compiles everything into a tiny, self-contained server.
- **`npm start`**: Usually runs `next start`, but in standalone mode, you should run:
  ```bash
  node .next/standalone/server.js
  ```

---

### Summary Checklist
- [ ] Is it a page? Put it in `app/folder-name/page.tsx`.
- [ ] Does it need state/hooks? Add `'use client'` at the top.
- [ ] Fetching data? Use `async/await` in the component itself.
- [ ] Form submission? Use a `Server Action`.
