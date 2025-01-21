import {db} from "@/db";
import {NewUser, UserSafe} from "../models/user";
import {usersTable} from "@/db/schema";
import {eq} from "drizzle-orm";

export const UserRepository = {
  async create(user: NewUser) {
    await db.insert(usersTable).values(user)
  },

  async update(id: string, user: Partial<Omit<UserSafe, "id">>) {
    await db.update(usersTable).set({
      ...user,
      updatedAt: new Date(Date.now())
    }).where(eq(usersTable.id, id))
  },

  async findById(id: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.id, id))
    return result.length > 0 ? result[0] : null
  },

  async findByEmail(email: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.email, email))
    return result.length > 0 ? result[0] : null
  },

  async findByUsername(username: string) {
    const result = await db.select().from(usersTable).where(eq(usersTable.name, username))
    return result.length > 0 ? result[0] : null
  }
}
