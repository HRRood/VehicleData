import { db } from "@/firebase/clientApp";
import { query, collection, where, getDocs } from "firebase/firestore";
import { User } from "./getAllUsersFirebase";

export async function FindUserByEmail(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const usersSnap = await getDocs(q);

  if (usersSnap.empty) {
    return null;
  }

  const user = {
    id: usersSnap.docs[0].id,
    ...usersSnap.docs[0].data(),
  } as User;

  return user;
}
