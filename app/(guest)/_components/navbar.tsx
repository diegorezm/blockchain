"use client";
import Image from "next/image";
import Link from "next/link";
import {Avatar, AvatarFallback} from "@/components/ui/avatar"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import {HomeIcon, Info, LayoutDashboard, LogIn, LogOut, Mail, Menu, User} from "lucide-react";
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
import {cn} from "@/lib/utils";
import {UserSafe} from "@/features/user/model";
import {useServerAction} from "zsa-react";
import {logoutAction} from "@/features/auth/controller";
import {useRouter} from "next/navigation";
import {exec} from "child_process";
import toast from "react-hot-toast";

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
  user: UserSafe | null
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
              <Button variant={pathname === "/auth/login" ? "default" : "ghost"} size="lg" className="text-xl w-full"
                onClick={() => setIsOpen(false)}
              >
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

const DesktopNavbar = ({pathname, user}: Props) => {
  const router = useRouter()
  const {execute, isPending} = useServerAction(logoutAction)

  const onClick = async () => {
    const [data, err] = await execute()
    if (err) {
      toast.error(err.message)
    } else {
      toast.success(data.message);
      router.push("/auth/login")
    }
  }

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
              <Button variant={"ghost"} className={cn("text-xl", isActive && "text-primary")}>
                <link.Icon className="h-6 w-6" />
                {link.label}
              </Button>
            </Link>
          )
        }
        )}
        {user ? (
          <Popover>
            <PopoverTrigger>

              <Avatar>
                <AvatarFallback>
                  {user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>
            <PopoverContent className="w-full p-1">
              <ul>
                <li>
                  <Link href="/dashboard" className="flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500">
                    <LayoutDashboard className="size-4" />
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500">
                    <User className="size-4" />
                    Profile
                  </Link>
                </li>
                <li>
                  <button className="flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500" onClick={onClick} disabled={isPending}>
                    <LogOut className="size-4" />
                    Logout
                  </button>
                </li>
              </ul>
            </PopoverContent>
          </Popover>
        ) : (
          <Link href="/auth/login">
            <Button variant={"default"} size="lg" className="text-xl">
              Login
            </Button>
          </Link>
        )}

      </div>
    </div>
  );
};

export const Navbar = ({user}: {user: UserSafe | null}) => {
  const pathname = usePathname();
  return (
    <>
      <DesktopNavbar pathname={pathname} user={user} />
      <MobileNavbar pathname={pathname} user={user} />
    </>
  )
}
