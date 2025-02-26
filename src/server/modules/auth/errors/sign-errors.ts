import { PublicError } from "@/server/types/errors";

export class SignInError extends PublicError {
  constructor() {
    super("Invalid email or password.");
    this.name = "SignInError";
  }
}
