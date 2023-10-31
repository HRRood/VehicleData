import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/firebase/clientApp";
import { query, collection, where, orderBy, getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";

export interface FireBaseTrip {
  vehicleId: string;
  startTime: Date;
  endTime: Date;
  drivenKm: number;
  start: string;
  end: string;
}
export interface Trip extends FireBaseTrip {
  id: string;
}

export async function FindAllTripsByVehicleId(vehicleId: string) {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    return [];
  }

  const q = query(collection(db, "trips"), where("vehicleId", "==", vehicleId), orderBy("startTime", "asc"));
  const tripSnap = await getDocs(q);
  const trips = tripSnap.docs.map((doc) => {
    const data = doc.data();

    const mapped = {
      id: doc.id,
      ...data,
      startTime: new Date(data.startTime.seconds * 1000),
      endTime: new Date(data.endTime.seconds * 1000),
    } as Trip;

    return mapped;
  });
  return trips;
}
