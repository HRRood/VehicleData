import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  console.log(session);
  if (!session) {
    return <div>Not logged in</div>;
  }
  return <div>Vehicle Data</div>;
}
