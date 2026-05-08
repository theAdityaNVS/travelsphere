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
    if (!admin.apps.length) return undefined;
    return admin.firestore()[prop as keyof FirebaseFirestore.Firestore];
  }
});

const adminAuth = new Proxy({} as admin.auth.Auth, {
  get: (target, prop) => {
    if (!admin.apps.length) return undefined;
    return admin.auth()[prop as keyof admin.auth.Auth];
  }
});

export { adminDb, adminAuth };
