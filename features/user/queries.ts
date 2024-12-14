import "server-only";

import {db} from "@/db";
import {usersTable} from "@/db/schema";
import {HashingService} from "@/services/hashing.service";
import {eq, count} from "drizzle-orm";
import {UserInsert} from "./model";

export async function createUser(user: UserInsert) {
  try {
    const hashingService = new HashingService();
    const hashedPassword = hashingService.hash(user.password);
    await db.insert(usersTable).values([{
      ...user,
      passwordHash: hashedPassword
    }]);
  } catch (error) {
    console.error(error);
    return {error: "Error creating user."};
  }
}

export async function getUserById(id: string) {
  try {
    const users = await db.select().from(usersTable).where(eq(usersTable.id, id));
    if (users.length === 0) {
      return {error: "User not found."};
    }
    return users[0];
  } catch (error) {
    console.error(error);
    return {error: "Error getting user."};
  }
}

export async function getUserByEmail(email: string) {
  try {
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));
    if (users.length === 0) {
      return {error: "User not found."};
    }
    return users[0];
  } catch (error) {
    console.error(error);
    return {error: "Error getting user."};
  }
}


export async function userExistsById(id: string) {
  try {
    const [userCount] = await db.select({count: count()}).from(usersTable).where(eq(usersTable.id, id));
    if (userCount.count === 0) {
      return false
    }
    return true
  } catch (error) {
    console.error(error);
    return {error: "Error getting user."};
  }
}

export async function userExistsByEmail(email: string) {
  try {
    const [userCount] = await db.select({count: count()}).from(usersTable).where(eq(usersTable.email, email));
    if (userCount.count === 0) {
      return false
    }
    return true
  } catch (error) {
    console.error(error);
    return {error: "Error getting user."};
  }
}

export async function getAllUsers() {
  try {
    const users = await db.select().from(usersTable);
    return users;
  } catch (error) {
    console.error(error);
    return {error: "Error getting users."};
  }
} 
