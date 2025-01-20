import {UserRepository} from "../data-access/user-repository";
import {UserAlreadyExists} from "../errors/signup-errors";
import {NewUser} from "../models/user";
import {hash} from '@/src/utils/hashing'

export const signUpUseCase = async ({name, email, password}: NewUser) => {
  const findByUsername = await UserRepository.findByUsername(name)

  if (findByUsername) {
    throw new UserAlreadyExists("A user with this name already exists.")
  }

  const findByEmail = await UserRepository.findByEmail(name)

  if (findByEmail) {
    throw new UserAlreadyExists("A user with this email already exists.")
  }

  const passwordHash = hash(password)

  const request = {
    name,
    email,
    password: passwordHash
  }

  await UserRepository.create(request)
}
