"use client";

import { cn } from "@/app/_lib/utils";
import { Bitcoin, LayoutDashboard, User, Wallet } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const routes = [
  {
    label: "Dashboard",
    href: "/dashboard",
    Icon: LayoutDashboard,
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    Icon: Bitcoin,
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

export const Navigation = () => {
  const pathname = usePathname();
  return (
    <div className="flex flex-col">
      {routes.map((route) => {
        const isActive = pathname === route.href;
        return (
          <Link key={route.href} href={route.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary-foreground transition text-neutral-500",
                isActive &&
                  "bg-primary shadow-sm hover:opacity-100 text-primary-foreground",
              )}
            >
              <route.Icon className="size-5 text-accent-background group-hover:text-accent-foreground" />
              {route.label}
            </div>
          </Link>
        );
      })}
    </div>
  );
};
