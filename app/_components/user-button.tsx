"use client";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import {LayoutDashboard, LogOut, User} from "lucide-react";
import {UserAvatar} from "./user-avatar";
import {UserSafe} from "@/src/modules/user/models/user";
import {useToast} from "../_hooks/use-toast";
import {useRouter} from "next/navigation";
import {signOutAction} from "../_actions/auth";

export const UserButton = ({user}: {user: UserSafe}) => {
  const router = useRouter();
  const {toast} = useToast();

  const onClick = async () => {
    await signOutAction()
    toast({
      title: "Success!",
      description: "You are now logged out!"
    })
    router.push("/sign-in")
  };

  return (
    <Popover modal={false}>
      <PopoverTrigger>
        <UserAvatar user={user} />
      </PopoverTrigger>
      <PopoverContent className="w-full p-1">
        <ul>
          <li>
            <Link
              href="/dashboard"
              className="flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-primary-foreground"
            >
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-primary-foreground"
            >
              <User className="size-4" />
              Profile
            </Link>
          </li>
          <li>
            <button
              className="flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-primary-foreground"
              onClick={onClick}
              disabled={false}
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </li>
        </ul>
      </PopoverContent>
    </Popover>
  );
};
