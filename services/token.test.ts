import {expect, test, describe} from "bun:test";
import {TokenService} from "./token.service";

describe("Test token service", () => {
  type TokenTestPayload = {
    amIhere: boolean;
  }

  const tokenService = new TokenService<TokenTestPayload>();

  test("test genToken", async () => {
    try {
      const token = await tokenService.genToken({
        amIhere: true
      });
      expect(token.token).toBeString();
    } catch (e) {
      expect(e).toBeNil()
    }
  })

  test("test verifyToken", async () => {
    try {
      const token = await tokenService.genToken({
        amIhere: true
      });
      expect(token.token).toBeString();
      const verifiedToken = await tokenService.verifyToken(token.token)
      expect(verifiedToken).not.toBeNil();
    } catch (e) {
      expect(e).toBeNil()
    }
  })

  test("test verifyToken if expired", async () => {
    try {
      const tokenTimeout = 1000;

      const token = await tokenService.genToken({
        amIhere: true
      }, new Date(Date.now() + tokenTimeout));

      expect(token.token).toBeString();

      setTimeout(async () => {
        const verifiedToken = await tokenService.verifyToken(token.token)
        console.log(verifiedToken)
        expect(verifiedToken).toBeNil();
      }, tokenTimeout)
    } catch (e) {
      expect(e).toBeNil()
    }
  })
})
