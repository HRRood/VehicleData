import { options } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/firebase/clientApp';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

export async function getFillupCountForVehicle(vehicleId: string) {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    return 0;
  }

  const q = query(collection(db, 'fillups'), where('vehicleId', '==', vehicleId));
  const fillupSnap = await getDocs(q);

  if (!fillupSnap || fillupSnap.empty) {
    return 0;
  }
  return fillupSnap.size;
}
