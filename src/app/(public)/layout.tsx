import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <nav className="w-full px-6 py-4 md:px-24 flex justify-between">
        <Link href="/">
          <Image src="/logo.svg" alt="app logo" height={150} width={150} />
        </Link>
        <SignedIn>
          <UserButton />
        </SignedIn>

        <SignedOut>
          <Link href="/sign-in">
            <Button variant="secondary">SignIn</Button>
          </Link>
        </SignedOut>
      </nav>
      {children}
    </div>
  );
}
