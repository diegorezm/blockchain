import { UserRepository } from "../../user/data-access/user-repository";
import { SignInError } from "../errors/sign-errors";
import { encodeHexLowerCase } from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import { generateSessionToken } from "..";
import { type Session } from "../models/session";
import { SessionsRepository } from "../data-access/sessions-repository";
import { compare } from "@/server/utils/hashing";

type SignInUseCaseProps = {
  email: string;
  password: string;
};

export const signInUseCase = async ({
  password,
  email,
}: SignInUseCaseProps) => {
  const findByEmail = await UserRepository.findByEmail(email);

  if (!findByEmail) throw new SignInError();

  const user = findByEmail;

  const matchPassword = compare(password, user.password);

  if (!matchPassword) throw new SignInError();

  const token = generateSessionToken();

  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
  const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toString();
  const session: Session = {
    id: sessionId,
    userId: user.id,
    expiresAt,
  };

  await SessionsRepository.create(session);

  return session;
};
