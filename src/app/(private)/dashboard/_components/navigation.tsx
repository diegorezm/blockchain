import { HandCoins, LayoutDashboard, Wallet } from "lucide-react";
import Link from "next/link";

export function Navigation() {
  const routes = [
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
  ] as const;

  return (
    <ul className="flex flex-col items-start">
      {routes.map((e, i) => (
        <Link href={e.href} key={i}>
          <li className="inline-flex items-center gap-x-4">
            <e.Icon />
            <p>{e.label}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
}
