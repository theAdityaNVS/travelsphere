# Firebase Documentation

## What was built
A scalable persistence layer for storing generated itineraries and enabling future features like trip sharing and collaborative planning.

### Key Components:
- **Firestore Database**: NoSQL document storage for "trips" collection.
- **Firebase Admin SDK**: Server-side access for secure, privileged data operations.
- **Proxy-based Initialization**: A resilient initialization pattern that prevents crashes if environment variables are missing.

## Why was it built this way
- **NoSQL Flexibility**: Travel itineraries vary in length and content; Firestore's schema-less nature handles this perfectly.
- **Admin SDK**: By using the Admin SDK in Server Actions, we bypass the need for client-side Firebase Auth and complex Security Rules for the initial MVP.
- **Real-time Ready**: Firestore allows for future real-time collaboration updates without an architecture overhaul.
- **Scalability**: Firebase handles the heavy lifting of database scaling, perfect for a serverless Cloud Run setup.

## How was it done (Step-by-Step)
1.  **Project Setup**: Created a Firebase Project and enabled the Firestore Database.
2.  **Service Account**: Generated a Private Key from the Google Cloud Console for the Firebase Admin SDK.
3.  **Initialization Pattern**:
    -   Implemented a `Proxy` in `src/lib/firebase/admin.ts` with explicit guard checks (`admin.apps.length`) within the traps.
    -   Exported `isFirebaseAdminInitialized()` for runtime safety and implemented cleaner error handling for missing environment variables.
4.  **Data Modeling**:
    -   Every trip is stored in the `trips` collection.
    -   Documents include the original user request (destination, budget, etc.) and the final AI-generated JSON.
5.  **Integration**:
    -   Connected Firestore inside `generateItineraryAction`.
    -   Implemented the trip detail page (`/trip/[id]`) which fetches data directly from Firestore via the Admin SDK.
