import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <SignedIn>
        <nav className="w-full px-6 py-4 md:px-24 flex justify-end">
          <UserButton
            appearance={{
              variables: {
                colorText: "#faf9f5",
                colorPrimary: "#f865b0",
                colorBackground: "#000000",
                colorInputBackground: "transparent",
                colorInputText: "#e2eeee",
                colorTextOnPrimaryBackground: "#000000",
                colorNeutral: "#e2eeee",
                colorTextSecondary: "#faf9f5",
              },
            }}
          />
        </nav>
      </SignedIn>
      <SignedOut>
        <nav className="w-full px-6 py-4 md:px-24 flex justify-between">
          <Link href="/">
            <Button variant="ghost">Cryptobank</Button>
          </Link>

          <Link href="/sign-in">
            <Button variant="secondary">SignIn</Button>
          </Link>
        </nav>
      </SignedOut>
      {children}
    </div>
  );
}
