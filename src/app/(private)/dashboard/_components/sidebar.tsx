import { DottedSeparator } from "@/components/dotted_separator";
import { Navigation } from "./navigation";
import Link from "next/link";
import Image from "next/image";

export function Sidebar() {
  return (
    <aside className="hidden lg:block fixed w-[250px] border-r-1 border-surface h-screen p-2 space-y-4 bg-primary text-on-primary">
      <div className="py-2 px-4">
        <Link href="/">
          <Image src="/logo.svg" alt="app logo" height={150} width={150} />
        </Link>
      </div>
      <DottedSeparator />
      <Navigation />
    </aside>
  );
}
