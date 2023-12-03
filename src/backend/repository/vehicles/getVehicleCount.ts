import { options } from '@/app/api/auth/[...nextauth]/options';
import { db } from '@/firebase/clientApp';
import { query, collection, where, getDocs } from 'firebase/firestore';
import { getServerSession } from 'next-auth';

export async function getVehicleCount() {
  const session = await getServerSession(options);

  if (!session || !session.user) {
    return 0;
  }

  const q = query(collection(db, 'vehicles'), where('userId', '==', session.user.id));
  const vehicleSnap = await getDocs(q);

  if (!vehicleSnap || vehicleSnap.empty) {
    return 0;
  }
  return vehicleSnap.size;
}
