import { getSession } from "@/app/_actions/auth";
import Sidebar from "./_components/Sidebar";
import styles from "./dashboard.module.css";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const isAuth = await getSession();
  if (!isAuth.session || !isAuth.user) return redirect("/sign-in");
  return (
    <div className={styles.page}>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}
