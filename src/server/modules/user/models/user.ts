import { usersTable } from "@/server/db/schema";

export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;
export type UserSafe = Omit<User, "passwordHash">;
