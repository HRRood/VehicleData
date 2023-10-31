import { db } from "@/firebase/clientApp";
import { doc, getDoc, setDoc } from "firebase/firestore";

export async function UpdateVehicleOdo(id: string, odo: number) {
  const docRef = doc(db, "vehicles", id);
  const existingDoc = await getDoc(docRef);

  await setDoc(docRef, {
    ...existingDoc.data(),
    odometer: odo,
  });
}
