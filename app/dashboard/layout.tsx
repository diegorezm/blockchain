"use server"

import {redirect} from "next/navigation"
import {isValidSession} from "../_actions/auth"

export default async function DashboardLayout({children}: {children: React.ReactNode}) {
  const isAuth = await isValidSession()
  if (!isAuth) return redirect("/sign-in")
  return (
    <div>
      testing
    </div>
  )
}
