import {pbkdf2Sync} from "crypto";

export class HashingService {
  private salt: string;
  private algorithm = "sha512";
  private keylen = 64;
  private iterations = 1000;

  constructor() {
    const saltENV = process.env.SALT;
    if (saltENV) {
      this.salt = saltENV;
    } else {
      throw new Error("SALT environment variable not set.");
    }
  }

  hash(key: string): string {
    const hash = pbkdf2Sync(key, this.salt, this.iterations, this.keylen, this.algorithm).toString("hex");
    return hash;
  }

  compare(key: string, hash: string): boolean {
    const comparator = this.hash(key);
    return comparator === hash;
  }
}
