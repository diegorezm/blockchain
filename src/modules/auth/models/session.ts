import { sessionsTable } from "@/db/schema";

export type Session = typeof sessionsTable.$inferSelect
export type NewSession = typeof sessionsTable.$inferInsert
