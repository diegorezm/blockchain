import {createUser, getAllUsers, getUserByEmail, getUserById} from "@/src/components/user/queries";
import {UserInsert, userInsertSchema, UserSafe} from "./model";
import {z} from "zod";

type ErrorResponse = {
  error: {
    message: string;
    fields: z.ZodFormattedError<UserInsert> | null;
  }
}

export async function createUserHandler(user: UserInsert): Promise<ErrorResponse | undefined> {
  const payload = userInsertSchema.safeParse(user);
  if (!payload.success) {
    const fieldErrors = payload.error.format();
    const response: ErrorResponse = {
      error: {
        message: "Error creating user.",
        fields: fieldErrors
      }
    }
    return response;
  }
  const result = await createUser(user);
  if (result !== undefined) {
    const response: ErrorResponse = {
      error: {
        message: result.error,
        fields: null
      }
    }
    return response;
  }
  return;
}

export async function getAllUsersHandler(): Promise<ErrorResponse | UserSafe[]> {
  const result = await getAllUsers();
  if (result !== undefined && 'error' in result) {
    const response: ErrorResponse = {
      error: {
        message: result.error,
        fields: null
      }
    }
    return response;
  }
  return result.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  }));
}


export async function getUserByIdHandler(id: string): Promise<ErrorResponse | UserSafe> {
  const result = await getUserById(id);
  if (result !== undefined && 'error' in result) {
    const response: ErrorResponse = {
      error: {
        message: result.error,
        fields: null
      }
    }
    return response;
  }
  return {
    id: result.id,
    email: result.email,
    name: result.name,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt
  };
}

export async function getUserByEmailHandler(email: string): Promise<ErrorResponse | UserSafe> {
  const result = await getUserByEmail(email);
  if (result !== undefined && 'error' in result) {
    const response: ErrorResponse = {
      error: {
        message: result.error,
        fields: null
      }
    }
    return response;
  }
  return {
    id: result.id,
    email: result.email,
    name: result.name,
    createdAt: result.createdAt,
    updatedAt: result.updatedAt
  };
}
