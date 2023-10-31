import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/firebase/clientApp";
import { FireBaseVehicle, Vehicle } from "@/frontend/hooks/useVehicles";
import { query, collection, where, getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";

export async function GetAllVehiclesOfUser() {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    return [];
  }

  const q = query(collection(db, "vehicles"), where("userId", "==", session.user.id));
  const vehiclesSnap = await getDocs(q);
  const vehicles = vehiclesSnap.docs.map((doc) => {
    const data = doc.data() as FireBaseVehicle;
    return {
      id: doc.id,
      ...data,
    } as Vehicle;
  });

  return vehicles;
}
