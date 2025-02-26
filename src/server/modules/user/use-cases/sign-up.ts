import { hash } from "@/server/utils/hashing";
import { UserRepository } from "../data-access/user-repository";
import { UserAlreadyExists } from "../errors/signup-errors";
import { randomUUID } from "node:crypto";

type Props = {
  name: string;
  email: string;
  password: string;
};

export const signUpUseCase = async ({ name, email, password }: Props) => {
  const findByUsername = await UserRepository.findByUsername(name);

  if (findByUsername) {
    throw new UserAlreadyExists("A user with this name already exists.");
  }

  const findByEmail = await UserRepository.findByEmail(name);

  if (findByEmail) {
    throw new UserAlreadyExists("A user with this email already exists.");
  }

  const passwordHash = hash(password);

  const id = randomUUID();

  const request = {
    id,
    name,
    email,
    password: passwordHash,
  };

  await UserRepository.create(request);
};
