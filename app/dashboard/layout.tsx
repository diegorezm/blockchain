"use server";

import { redirect } from "next/navigation";
import { getSession } from "../_actions/auth";
import { Navbar } from "./_components/navbar";
import { Sidebar } from "./_components/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await getSession();
  if (!isAuth.session || !isAuth.user) return redirect("/sign-in");
  const user = isAuth.user;
  return (
    <div className="min-h-screen">
      <div className="flex w-full h-full">
        <div className="fixed left-0 top-0 hidden lg:block lg:w-[264px] h-full overflow-y-auto">
          <Sidebar />
        </div>
        <div className="w-full lg:pl-[264px]">
          <div className="mx-auto max-w-screen-2xl h-full">
            <Navbar user={user} />
            <main className="h-full py-8 px-6 flex flex-col">{children}</main>
          </div>
        </div>
      </div>
    </div>
  );
}
