import {pgTable, uuid, varchar, timestamp, text} from "drizzle-orm/pg-core";

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
  name: varchar("name", {length: 255}).notNull(),
  email: varchar("email", {length: 255}).notNull(),
  imgUrl: text('img_url'),
  password: varchar("password", {length: 255}).notNull(),
  ...timestamps
})

export const sessionsTable = pgTable("sessions", {
  userId: uuid().references(() => usersTable.id).notNull(),
  id: varchar("id", {length: 255}).primaryKey(),
  expiresAt: timestamp("expires_at", {
    mode: "date"
  }).notNull()
})
