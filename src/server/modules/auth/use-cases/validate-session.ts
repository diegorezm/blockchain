import { SessionsRepository } from "../data-access/sessions-repository";
import {
  SessionExpiredError,
  SessionNotFoundError,
} from "../errors/session-errors";

export async function validateSessionTokenUseCase(sessionId: string) {
  const session = await SessionsRepository.findById(sessionId);
  if (!session) {
    throw new SessionNotFoundError();
  }
  const userId = session.userId;
  const expiresAt = new Date(session.expiresAt);

  if (Date.now() >= expiresAt.getTime()) {
    await SessionsRepository.deleteById(sessionId);
    throw new SessionExpiredError();
  }

  if (Date.now() >= expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
    const newExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
    await SessionsRepository.updateExpiration(sessionId, newExpiration);
  }
  return { session, userId };
}
