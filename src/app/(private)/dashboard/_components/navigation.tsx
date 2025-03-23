"use client";
import { cn } from "@/utils/cn";
import { HandCoins, LayoutDashboard, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();

  return (
    <ul className="flex flex-col items-start gap-2">
      {routes.map((e, i) => (
        <Link href={e.href} key={i} className="w-full h-full">
          <li
            className={cn(
              "inline-flex items-center  gap-x-4  w-full h-full px-4 py-2 rounded-lg transition-colors duration-400 text-sm",
              pathname === e.href
                ? "text-on-surface bg-surface hover:opacity-90"
                : "text-surface hover:bg-surface hover:text-on-surface",
            )}
          >
            <e.Icon className="size-5" />
            <p className="font-semibold">{e.label}</p>
          </li>
        </Link>
      ))}
    </ul>
  );
}
