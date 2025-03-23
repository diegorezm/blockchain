import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

import { Sidebar } from "./_components/sidebar";
import { Navbar } from "./_components/navbar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/sign-in");
  }

  return (
    <div className="w-full">
      <Sidebar />
      <div className="px-4 py-2 lg:ml-[255px] space-y-4">
        <Navbar />
        {children}
      </div>
    </div>
  );
}
