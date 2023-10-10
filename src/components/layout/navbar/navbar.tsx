"use client";

import Link from "next/link";
import styles from "./NavBar.module.css";
import Image from "next/image";
import { Login } from "./login";

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src="/logo.png" fill alt="Logo" className={styles.logoImage} />
        </Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Login />
        </li>
      </ul>
    </nav>
  );
};
