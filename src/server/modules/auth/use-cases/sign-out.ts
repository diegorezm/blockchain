import {SessionsRepository} from "../data-access/sessions-repository"

export const signOutUseCase = async (sessionId: string) => {
  await SessionsRepository.deleteById(sessionId)
}
