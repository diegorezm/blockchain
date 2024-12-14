"use client";
import Image from "next/image";
import Link from "next/link";

import {HomeIcon, Info, LogIn, Mail, Menu} from "lucide-react";
import {usePathname} from 'next/navigation';
import {Button} from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {useState} from "react";

const LINKS = [
  {
    label: "Home",
    href: "/",
    Icon: HomeIcon
  },
  {
    label: "About",
    href: "/about",
    Icon: Info
  },
  {
    label: "Contact",
    href: "/contact",
    Icon: Mail
  }
];

type Props = {
  pathname: string;
}

const MobileNavbar = ({pathname}: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex lg:hidden py-2 w-full items-center justify-between">
      <Link href="/">
        <Image src={"/logo.svg"} alt="logo" width={150} height={40} priority />
      </Link>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon">
            <Menu className="h-12 w-12" />
            <span className="sr-only">Open menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Choose a route</SheetTitle>
            <SheetDescription>
              Select a route to navigate to.
            </SheetDescription>
          </SheetHeader>
          <div className="flex flex-col gap-2 items-center my-4">
            {LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="w-full">
                  <Button variant={isActive ? "default" : "ghost"} size="lg" className="text-xl w-full" onClick={() => setIsOpen(false)}>
                    <link.Icon className="h-6 w-6" />
                    {link.label}
                  </Button>
                </Link>
              )
            })}
            <Link href="/auth/login" className="w-full">
              <Button variant={pathname === "/auth/login" ? "default" : "ghost"} size="lg" className="text-xl w-full">
                <LogIn className="h-6 w-6" />
                Login
              </Button>
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

const DesktopNavbar = ({pathname}: Props) => {
  return (
    <div className="hidden lg:flex flex-row justify-between gap-2 py-2 w-full items-center">
      <Link href="/">
        <Image src={"/logo.svg"} alt="logo" width={150} height={40} priority />
      </Link>
      <div className="flex gap-2 items-center">
        {LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link key={link.href} href={link.href}>
              <Button variant={isActive ? "link" : "ghost"} className="text-xl">
                <link.Icon className="h-6 w-6" />
                {link.label}
              </Button>
            </Link>
          )
        }
        )}
        <Link href="/auth/login">
          <Button variant={"default"} size="lg" className="text-xl">
            Login
          </Button>
        </Link>
      </div>
    </div>
  );
};

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <>
      <DesktopNavbar pathname={pathname} />
      <MobileNavbar pathname={pathname} />
    </>
  )
}
