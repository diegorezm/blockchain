import { it, describe, expect, beforeEach } from "bun:test";
import { Blockchain } from "./blockchain";

describe("Blockchain", () => {
  let blockchain: Blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
  });

  it("Should have created the genesis block", () => {
    expect(blockchain.getChain().length).toBe(1);
    const genesis = blockchain.getLastBlock();

    expect(genesis.index).toBe(0);
    expect(genesis.data).toBe("genesis");
  });

  it("Should append the new block to the chain", () => {
    expect(blockchain.getChain().length).toBe(1);
    blockchain.appendBlock("testing");
    expect(blockchain.getChain().length).toBe(2);
    expect(blockchain.getLastBlock().data).toBe("testing");
  });
});
