import Image from "next/image";
import Link from "next/link";
import { Navigation } from "./navigation";
import { DottedSeparator } from "@/app/_components/dotted-separator";

export const Sidebar = () => {
  return (
    <aside className="h-full bg-card p-4 w-full border-r">
      <Link href="/">
        <Image src="/logo.svg" width={164} height={48} alt="logo" />
      </Link>
      <DottedSeparator className="mt-4 mb-4" />
      <Navigation />
    </aside>
  );
};
