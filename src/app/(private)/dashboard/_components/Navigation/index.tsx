import styles from "./navigation.module.css";

import Button from "@/components/ui/Button";
import Link from "next/link";

import { HandCoins, LayoutDashboard, User, Wallet } from "lucide-react";

export const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    Icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    Icon: HandCoins,
  },
  {
    label: "Wallet",
    href: "/dashboard/wallet",
    Icon: Wallet,
  },
  {
    label: "Profile",
    href: "/dashboard/profile",
    Icon: User,
  },
];

export default function Navigation() {
  return (
    <nav className={styles.navigation}>
      {routes.map((route) => (
        <Link key={route.href} href={route.href} className={styles.link}>
          <route.Icon />
          <span>{route.label}</span>
        </Link>
      ))}
    </nav>
  );
}
