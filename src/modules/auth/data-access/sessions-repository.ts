import {db} from "@/db";
import {sessionsTable} from "@/db/schema";
import {eq} from "drizzle-orm";
import {type Session} from "@/src/modules/auth/models/session";

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

  async updateExpiration(sessionId: string, newExpiration: Date): Promise<void> {
    await db
      .update(sessionsTable)
      .set({expiresAt: newExpiration})
      .where(eq(sessionsTable.id, sessionId));
  },
};
