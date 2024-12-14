import {sessionsTable, usersTable} from "@/db/schema";
import {createInsertSchema} from "drizzle-zod";
import {z} from "zod";

export const userInsertSchema = createInsertSchema(usersTable, {
  name: z.string().min(3, {
    message: "Name must be at least 3 characters long."
  }),
  email: z.string().email(
    {message: "Email is not valid."}
  ),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
  passwordHash: true,
}).extend({
  password: z.string().min(8,
    {
      message: "Password must be at least 8 characters long."
    }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters long."
  }),
}).superRefine(({confirmPassword, password}, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

export const userLoginSchema = z.object({
  email: z.string().email(
    {message: "Email is not valid."}
  ),
  password: z.string().min(8,
    {
      message: "Password must be at least 8 characters long."
    }),
})

export const sessionInsertSchema = createInsertSchema(sessionsTable);

export type Session = typeof sessionsTable.$inferSelect;

export type User = typeof usersTable.$inferSelect;
export type UserSafe = Omit<User, "passwordHash">;

export interface UserInsert extends z.infer<typeof userInsertSchema> {
  password: string;
}
