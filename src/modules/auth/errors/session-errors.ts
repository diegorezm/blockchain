export class SessionExpiredError extends Error {
  constructor() {
    super("Session has expired.");
    this.name = "SessionExpiredError";
  }
}

export class SessionNotFoundError extends Error {
  constructor() {
    super("Session not found.");
    this.name = "SessionNotFoundError";
  }
}
