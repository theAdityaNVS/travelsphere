import { db } from "./client";
import { doc, getDoc } from "firebase/firestore";

export async function getTrip(tripId: string) {
  const tripRef = doc(db, "trips", tripId);
  const tripSnap = await getDoc(tripRef);
  if (tripSnap.exists()) {
    return tripSnap.data();
  } else {
    return null;
  }
}
