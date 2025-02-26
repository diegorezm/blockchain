import styles from "./sidebar.module.css";
import Navigation from "../Navigation";

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      {/* Sidebar Header */}
      <div className={styles.sidebar_header}>
        <h1>Dashboard</h1>
      </div>
      <Navigation />
    </div>
  );
}
