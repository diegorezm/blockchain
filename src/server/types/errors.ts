export class PublicError extends Error {
  constructor(message: string) {
    super(message);
  }
}

export class AuthenticationError extends PublicError {
  constructor() {
    super("You must be logged in to view this content");
    this.name = "AuthenticationError";
  }
}

export class NotFoundError extends PublicError {
  constructor(message?: string) {
    super(message ?? "Resource not found");
    this.name = "NotFoundError";
  }

}
