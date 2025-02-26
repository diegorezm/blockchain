import { sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: text("created_at").default(Date.now().toString()),
  updatedAt: text("updated_at", {
    mode: "text",
  }).default(Date.now().toString()),
};

export const usersTable = sqliteTable("users_table", {
  id: text("id", { length: 36 }).primaryKey(),
  name: text("name", { length: 255 }).notNull(),
  email: text("email", { length: 255 }).notNull(),
  password: text("password", { length: 255 }).notNull(),
  ...timestamps,
});

export const sessionsTable = sqliteTable("sessions", {
  userId: text("user_id")
    .references(() => usersTable.id)
    .notNull(),
  id: text("id", { length: 255 }).primaryKey(),
  expiresAt: text("expires_at").notNull(),
});
