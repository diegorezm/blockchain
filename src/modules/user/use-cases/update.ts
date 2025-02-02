import {UserRepository} from "../data-access/user-repository";
import {type UserSafe} from "../models/user";

export const updateUserUseCase = async (id: string, user: Partial<Omit<UserSafe, "id">>) => {
  await UserRepository.update(id, user)
}
