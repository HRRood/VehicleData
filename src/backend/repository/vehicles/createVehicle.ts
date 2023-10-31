import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { FindUserByEmail } from "../users/findUserByEmail";
import { db } from "@/firebase/clientApp";
import { addDoc, collection } from "firebase/firestore";

export async function CreateVehicle(make: string, model: string, year: number, license: string, odo?: number) {
  const session = await getServerSession(options);

  if (!session || !session.user || !session.user.email) {
    return null;
  }

  const user = await FindUserByEmail(session.user?.email);

  if (!user) {
    return null;
  }

  const newVehicle = await addDoc(collection(db, "vehicles"), {
    userId: user.id,
    make: make,
    model: model,
    year: year,
    licensePlate: license,
    odometer: odo,
  });

  return newVehicle;
}
