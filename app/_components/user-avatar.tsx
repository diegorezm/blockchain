import { UserSafe } from "@/src/modules/user/models/user";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function UserAvatar({
  user,
  className = "",
}: {
  user: UserSafe;
  className?: string;
}) {
  return (
    <Avatar className={className}>
      {user.imgUrl && <AvatarImage src={user.imgUrl} />}
      <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
