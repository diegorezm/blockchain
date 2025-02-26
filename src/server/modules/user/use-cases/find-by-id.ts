import { UserRepository } from "../data-access/user-repository";

export const findUserByIdUseCase = async (id: string) => {
  return await UserRepository.findById(id);
};
