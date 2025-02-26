import { sessionsTable } from "@/server/db/schema";

export type Session = typeof sessionsTable.$inferSelect;
export type NewSession = typeof sessionsTable.$inferInsert;
