import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import { Session } from "../models/session";
import { sessionsTable } from "@/server/db/schema";

export const SessionsRepository = {
  async create(session: Session): Promise<void> {
    await db.insert(sessionsTable).values(session);
  },

  async findById(sessionId: string): Promise<Session | null> {
    const result = await db
      .select()
      .from(sessionsTable)
      .where(eq(sessionsTable.id, sessionId));
    return result.length > 0 ? result[0] : null;
  },

  async deleteById(sessionId: string): Promise<void> {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
  },

  async updateExpiration(
    sessionId: string,
    newExpiration: Date,
  ): Promise<void> {
    await db
      .update(sessionsTable)
      .set({ expiresAt: newExpiration.toString() })
      .where(eq(sessionsTable.id, sessionId));
  },
};
