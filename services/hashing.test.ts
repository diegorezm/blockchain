import {expect, test, describe} from "bun:test";
import {HashingService} from "./hashing.service";

describe("Hashing service", () => {
  test("testing hash", () => {
    try {
      const hashingService = new HashingService();
      const hash = hashingService.hash("this is a test key");
      expect(hash).toBeString();
    } catch (e) {
      expect(e).toBeNil()
    }
  })

  test("testing compare", () => {
    try {
      const hashKey = "this is a test key";
      const hashingService = new HashingService();
      const hash = hashingService.hash(hashKey);
      expect(hash).toBeString();
      expect(hashingService.compare(hashKey, hash)).toBeTrue();
    } catch (e) {
      expect(e).toBeNil()
    }
  })
})
