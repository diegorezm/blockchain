"use server"

import {getSession} from "@/app/_actions/auth"
import {redirect} from "next/navigation"
import ProfileEditDialog from "./edit-dialog"
import {UserAvatar} from "@/app/_components/user-avatar"

import {
  Card,
  CardHeader,
  CardContent,
} from "@/app/_components/ui/card";

export default async function ProfilePage() {
  const {user} = await getSession()
  if (!user) return redirect("/sign-in")

  return (
    <Card className="relative mx-auto w-full h-fit md:w-[500px]">
      <CardHeader className="flex items-center justify-center">
        <div className="absolute top-2 right-2">
          <ProfileEditDialog user={user} />
        </div>
        <UserAvatar user={user} className="w-20 h-20 text-4xl" />
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <h1 className="text-2xl font-semibold">{user.name}</h1>
        <h2 className="text-lg text-muted-foreground">{user.email}</h2>
      </CardContent>
    </Card>
  )
}
