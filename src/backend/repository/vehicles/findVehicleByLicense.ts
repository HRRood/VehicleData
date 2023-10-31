import { db } from "@/firebase/clientApp";
import { FireBaseVehicle, Vehicle } from "@/frontend/hooks/useVehicles";
import { collection, getDocs, query, where } from "firebase/firestore";

export async function FindVehicleByLicense(license: string) {
  const q = query(collection(db, "vehicles"), where("licensePlate", "==", license));
  const querySnapshot = await getDocs(q);
  const vehicle = querySnapshot.docs.map((doc) => {
    const data = doc.data() as FireBaseVehicle;
    return {
      id: doc.id,
      ...data,
    } as Vehicle;
  })[0];

  if (!vehicle) {
    return null;
  }

  return vehicle;
}
