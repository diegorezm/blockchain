"use server";

import env from "@/env";
import {signOutUseCase} from "@/src/modules/auth/use-cases/sign-out";
import {validateSessionTokenUseCase} from "@/src/modules/auth/use-cases/validate-session";
import {findUserByIdUseCase} from "@/src/modules/user/use-cases/find-by-id";
import {cookies} from "next/headers";
import {authenticatedAction} from "../_lib/safe-action";

const SESSION_KEY = "session";

export async function isValidSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_KEY)?.value;

  if (token) {
    try {
      await validateSessionTokenUseCase(token);
      return true;
    } catch (e: unknown) {
      if (env.NODE_ENV === "development") {
        console.error(e);
      }
      return false;
    }
  }
  return false;
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_KEY)?.value;
  if (token) {
    try {
      const {session, userId} = await validateSessionTokenUseCase(token);
      const user = await findUserByIdUseCase(userId);
      if (!user) {
        await signOutUseCase(session.id);
        return {session: null, user: null};
      }
      return {session, user};
    } catch (e: unknown) {
      if (env.NODE_ENV === "development") {
        console.error(e);
      }
      return {session: null, user: null};
    }
  }
  return {session: null, user: null};
}

export async function setSession(token: string, expiresAt: Date) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_KEY, token, {
    expires: expiresAt,
    sameSite: "strict",
    secure: env.NODE_ENV === "production" ? true : false,
    httpOnly: true,
  });
}

export const signOutAction = async () => {
  const response = await getSession()
  if (!response.session) return
  signOutUseCase(response.session.id)
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY)
}
