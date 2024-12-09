import {sessionsTable, usersTable} from "@/db/schema";
import {createInsertSchema} from "drizzle-zod";
import {z} from "zod";

export const userInsertSchema = createInsertSchema(usersTable, {
  name: z.string().min(3),
  email: z.string().email(),
}).omit({
  id: true,
  createdAt: true,
  passwordHash: true,
}).extend({
  password: z.string().min(8)
});

export const sessionInsertSchema = createInsertSchema(sessionsTable);

export type Session = typeof sessionsTable.$inferSelect;
export type User = typeof usersTable.$inferSelect;
export type UserSafe = Omit<User, "passwordHash">;
export interface UserInsert extends z.infer<typeof userInsertSchema> {
  password: string;
}
