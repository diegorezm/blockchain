import {cookies} from "next/headers";
import {createSession, getSessionByToken, removeSession} from "./queries";
import {UserSafe} from "@/src/components/user/model";
import {getUserById} from "@/src/components/user/queries";

const SESSION_COOKIE_KEY = "bl-session"

export async function createSessionHandler(userId: string) {
  const session = await createSession(userId)

  if (session != undefined && 'error' in session) {
    return {
      error: session.error
    }
  }

  const {token, expiresAt} = session;
  const maxAge = Math.floor((expiresAt.getTime() - Date.now()) / 1000);

  const store = await cookies();

  store.set(SESSION_COOKIE_KEY, token, {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: maxAge
  });
}

export async function verifySessionHandler(): Promise<UserSafe | {error: string}> {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_KEY);
  if (token) {
    const session = await getSessionByToken(token.value);
    if ('error' in session) {
      return {
        error: session.error
      }
    }
    const userId = session.userId;
    const user = await getUserById(userId);
    if ('error' in user) {
      return {
        error: user.error
      }
    }
    return {
      id: userId,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }
  } else {
    return {
      error: "No session token."
    }
  }
}

export async function removeSessionHandler() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE_KEY);
  if (token) {
    store.delete(SESSION_COOKIE_KEY);
    const session = await removeSession(token.value);
    if (session !== undefined) {
      return {
        error: session.error
      }
    }
  } else {
    return {
      error: "No session token."
    }
  }
}
