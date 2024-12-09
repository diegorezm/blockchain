import "server-only"

import {db} from "@/db";
import {sessionsTable} from "@/db/schema";
import {TokenService} from "@/src/services/token.service";
import {count, eq} from "drizzle-orm";

type SessionJWTPayload = {
  userId: string;
}

const tokenService = new TokenService<SessionJWTPayload>();

export async function createSession(userId: string) {
  try {
    const {token, exp} = await tokenService.genToken({
      userId
    });
    await db.insert(sessionsTable).values([{
      userId,
      token: token,
      expiresAt: exp
    }])
    return {
      token,
      expiresAt: exp
    }
  } catch (error) {
    console.error(error);
    return {
      error: "Not able to create session."
    }
  }

}

export async function getSessionByToken(token: string) {
  try {
    const [sessionCount] = await db.select({count: count()}).from(sessionsTable).where(eq(sessionsTable.token, token));
    if (sessionCount.count === 0) {
      return {
        error: "Invalid token."
      }
    }

    const session = await tokenService.verifyToken(token);
    if (session === undefined) {
      return {
        error: "Invalid token."
      }
    }

    return session;
  } catch (error) {
    console.error(error);
    return {
      error: "Invalid token."
    }
  }
}

export async function removeSession(token: string) {
  try {
    await db.delete(sessionsTable).where(eq(sessionsTable.token, token));
  } catch (error) {
    console.error(error);
    return {
      error: "Not able to remove session."
    }
  }
}
