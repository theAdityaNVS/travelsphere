import * as admin from "firebase-admin";
import { env } from "../env";

if (!admin.apps.length) {
  try {
    if (env.FIREBASE_PRIVATE_KEY) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId: env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
          clientEmail: env.FIREBASE_CLIENT_EMAIL,
          privateKey: env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
        }),
      });
    }
  } catch (error) {
    console.error('Firebase admin initialization error', error);
  }
}

const adminDb = new Proxy({} as FirebaseFirestore.Firestore, {
  get: (target, prop) => {
    if (!admin.apps.length) {
      throw new Error("Firebase Admin is not initialized. Check your environment variables.");
    }
    const firestore = admin.firestore();
    const value = firestore[prop as keyof FirebaseFirestore.Firestore];
    if (typeof value === "function") {
      return value.bind(firestore);
    }
    return value;
  }
});

const adminAuth = new Proxy({} as admin.auth.Auth, {
  get: (target, prop) => {
    if (!admin.apps.length) {
      throw new Error("Firebase Admin is not initialized. Check your environment variables.");
    }
    const auth = admin.auth();
    const value = auth[prop as keyof admin.auth.Auth];
    if (typeof value === "function") {
      return value.bind(auth);
    }
    return value;
  }
});

export const isFirebaseAdminInitialized = () => admin.apps.length > 0;

export { adminDb, adminAuth };
