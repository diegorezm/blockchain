import { PublicError } from "@/server/types/errors";

export class UserAlreadyExists extends PublicError {
  constructor(message: string) {
    super(message);
    this.name = "UserAlreadyExists";
  }
}
