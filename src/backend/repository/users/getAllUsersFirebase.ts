import { db } from "@/firebase/clientApp";
import { collection, getDocs, query, where } from "firebase/firestore";

export interface User {
  id: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
}

export async function GetAllUsers() {
  const q = query(collection(db, "users"), where("email", "==", "hrroodenburg@gmail.com"));
  const usersSnap = await getDocs(q);
  const user = {
    id: usersSnap.docs[0].id,
    ...usersSnap.docs[0].data(),
  } as User;

  return user;
}
