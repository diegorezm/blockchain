"use server"

import env from "@/env";
import {validateSessionTokenUseCase} from "@/src/modules/auth/use-cases/validate-session";
import {cookies} from "next/headers";

const SESSION_KEY = "session"

export async function isValidSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_KEY)?.value

  if (token) {
    try {
      await validateSessionTokenUseCase(token);
      return true
    } catch (e: unknown) {
      if (env.NODE_ENV === "development") {
        console.error(e)
      }
      return false
    }
  }
  return false
}

export async function getSession() {
  const cookieStore = await cookies()
  const token = cookieStore.get(SESSION_KEY)?.value
  if (token) {
    try {
      return await validateSessionTokenUseCase(token);
    } catch (e: unknown) {
      if (env.NODE_ENV === "development") {
        console.error(e)
      }
      return {session: null, userId: null}
    }
  }
  return {session: null, userId: null}
}

export async function setSession(token: string, expiresAt: Date) {
  const cookieStore = await cookies()
  cookieStore.set(SESSION_KEY, token, {
    expires: expiresAt,
    sameSite: "strict",
    secure: env.NODE_ENV === "production" ? true : false,
    httpOnly: true
  })
}
