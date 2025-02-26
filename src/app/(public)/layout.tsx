import Navbar from "./_components/Navbar";
import styles from "./layout.module.css";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.page}>
      <Navbar />
      <main>{children}</main>
    </div>
  );
}
