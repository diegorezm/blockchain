import {JWTPayload, jwtVerify, SignJWT} from 'jose'

export class TokenService<T extends JWTPayload> {
  private secretKey: Uint8Array<ArrayBufferLike>;
  private algorithm = "HS256";
  private expiresIn = new Date(Date.now() + 1 + 60 * 60 * 1000);

  constructor() {
    const secretKeyENV = process.env.SECRET_KEY;
    if (secretKeyENV) {
      this.secretKey = new TextEncoder().encode(secretKeyENV);
    } else {
      throw new Error("SECRET_KEY environment variable not set.");
    }
  }


  async genToken(payload: T, expiresAt?: Date): Promise<{exp: Date, token: string}> {
    const exp = expiresAt || this.expiresIn;

    const token = await new SignJWT(payload)
      .setProtectedHeader({alg: this.algorithm})
      .setIssuedAt()
      .setExpirationTime(expiresAt || this.expiresIn)
      .sign(this.secretKey);
    return {
      exp,
      token
    };
  }

  async verifyToken(token: string): Promise<T | undefined> {
    try {
      const {payload} = await jwtVerify(token, this.secretKey, {
        algorithms: [this.algorithm]
      })
      return payload as T;
    } catch (error) {
      console.error(error)
      return;
    }
  }
}
