"use client";

import { usePathname } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { UserButton } from "@/app/_components/user-button";
import { UserSafe } from "@/src/modules/user/models/user";

const MESSAGES: Record<string, { title: string; description: string }> = {
  "/dashboard/profile": {
    title: "Your profile",
    description: "See and manage your information",
  },
  "/dashboard/transactions": {
    title: "Transactions",
    description: "View all your transactions",
  },
  "/dashboard/wallet": {
    title: "Wallet",
    description: "View your wallet",
  },
  "/dashboard": {
    title: "Dashboard",
    description: "View your dashboard",
  },
};

export const Navbar = ({ user }: { user: UserSafe }) => {
  const pathname = usePathname();
  const message = MESSAGES[pathname];
  if (!message) {
    return null;
  }
  return (
    <nav className="flex items-center justify-between pt-4 px-6 w-full">
      <div className="hidden lg:flex flex-col">
        <h1 className="text-2xl font-semibold">{message?.title}</h1>
        <p className="text-foreground-alt">{message?.description}</p>
      </div>
      <MobileSidebar />
      <div>
        <UserButton user={user} />
      </div>
    </nav>
  );
};
