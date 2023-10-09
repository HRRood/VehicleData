import Link from "next/link";
import styles from "./NavBar.module.css";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export const Navbar = async () => {
  const session = await getServerSession(options);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/star_wars_logo.png" fill alt="Logo" className={styles.logoImage} />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          {session && <Link href="/api/auth/signout">Logout</Link>}
          {!session && <Link href="/login">Login</Link>}
        </li>
      </ul>
    </nav>
  );
};
