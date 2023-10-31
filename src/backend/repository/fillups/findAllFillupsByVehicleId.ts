import { options } from "@/app/api/auth/[...nextauth]/options";
import { db } from "@/firebase/clientApp";
import { query, collection, where, getDocs, orderBy } from "firebase/firestore";
import { getServerSession } from "next-auth";

export interface FireBaseFillup {
  vehicleId: string;
  date: Date;
  drivenKm: number;
  litersFilled: number;
  efficiency: number;
  location: string;
  station: string;
  costs: number;
}
export interface Fillup extends FireBaseFillup {
  id: string;
}

export async function FindAllFillupsByVehicleId(vehicleId: string) {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    return [];
  }

  const q = query(collection(db, "fillups"), where("vehicleId", "==", vehicleId), orderBy("date", "asc"));
  const fillupSnap = await getDocs(q);
  const fillups = fillupSnap.docs.map((doc) => {
    const data = doc.data();

    const mapped = {
      id: doc.id,
      ...data,
      date: new Date(data.date.seconds * 1000),
    } as Fillup;

    return mapped;
  });
  return fillups;
}
