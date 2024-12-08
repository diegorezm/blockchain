import {pgTable, uuid, varchar, timestamp} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", {
    mode: "date",
  }).defaultNow(),
  updatedAt: timestamp("updated_at", {
    mode: "date"
  }).defaultNow(),
}

export const usersTable = pgTable("users", {
  id: uuid().defaultRandom().primaryKey(),
  name: varchar("name", {length: 255}),
  email: varchar("email", {length: 255}),
  passwordHash: varchar("password_hash", {length: 255}),
  ...timestamps
})

export const sessionsTable = pgTable("sessions", {
  userId: uuid().references(() => usersTable.id),
  token: varchar("token", {length: 255}).primaryKey(),
  expiresAt: timestamp("expires_at", {
    mode: "date"
  })
})
