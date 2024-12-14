import {sessionsTable} from "@/db/schema";

export type Session = typeof sessionsTable.$inferSelect;
