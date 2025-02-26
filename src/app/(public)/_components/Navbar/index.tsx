import Button from "@/components/ui/Button";
import styles from "./navbar.module.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar_logo}>
        <Link href="/">
          <span>Crypto</span>bank
        </Link>
      </div>
      <div className={styles.navbar_links}>
        <Link href="/sign-in">
          <Button size="sm" variant="outline">
            Sign-In
          </Button>
        </Link>

        <Link href="/sign-up">
          <Button size="sm">Sign-Up</Button>
        </Link>
      </div>
    </nav>
  );
}
