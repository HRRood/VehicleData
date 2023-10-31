import { db } from "@/firebase/clientApp";
import { Vehicle } from "@/frontend/hooks/useVehicles";
import { doc, getDoc } from "firebase/firestore";

export async function FindVehicleById(id: string) {
  const docRef = doc(db, "vehicles", id);
  const existingDoc = await getDoc(docRef);

  if (!existingDoc.exists()) {
    return null;
  }

  const data = existingDoc.data();
  return {
    id: existingDoc.id,
    ...data,
  } as Vehicle;
}
