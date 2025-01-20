import {expect, test, describe} from "bun:test";
import {hash, compare} from "./hashing";

describe("Hashing service", () => {
  test("testing hash", () => {
    try {
      const h = hash("this is a test key");
      expect(h).toBeString();
    } catch (e) {
      expect(e).toBeNil()
    }
  })

  test("testing compare", () => {
    try {
      const hashKey = "this is a test key";
      const h = hash(hashKey);
      expect(h).toBeString();
      expect(compare(hashKey, h)).toBeTrue();
    } catch (e) {
      expect(e).toBeNil()
    }
  })

  test("hash handles empty string", () => {
    const h = hash("");
    expect(h).toBeString();
  });

  test("hash throws on invalid input", () => {
    expect(() => hash(null as any)).toThrow();
    expect(() => hash(undefined as any)).toThrow();
  });

  test("hash handles very long strings", () => {
    const longKey = "a".repeat(10000);
    const h = hash(longKey);
    expect(h).toBeString();
  });
})

