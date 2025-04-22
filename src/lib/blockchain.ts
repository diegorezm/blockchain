import { LOGGING } from "@/utils/logging";
import { createHash } from "node:crypto";

export type Block = {
  index: number; // The position of this block in the chain
  hash: string; // The hash of the current block
  nonce: number; // The random number miners must guess (used in Proof of Work)
  data: string; // The data contained in the block
  prevHash: string | null; // The hash of the previous block (null for the genesis block)
  timestamp: number; // The timestamp of when the block was created
};

export class Blockchain {
  private difficulty: number = 2;
  private chain: Block[];

  constructor() {
    const genesis = this._generateGenesis();
    this.chain = [genesis];
  }

  public appendBlock(data: string) {
    const prev = this.getLastBlock();

    const newBlock: Block = {
      index: this.chain.length,
      data: data,
      hash: "",
      prevHash: prev.hash,
      nonce: 0,
      timestamp: Date.now(),
    };

    const { nonce, hash } = this._mine(newBlock);

    newBlock.nonce = nonce;
    newBlock.hash = hash;

    this.chain.push(newBlock);

    if (!this._isTransactionValid(prev, newBlock)) {
      this.chain.pop();
    }
  }

  public getChain(): Block[] {
    return this.chain;
  }

  public getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public isChainValid() {
    let prevBlock = this.chain[0];
    let idx = 1;
    while (idx < this.chain.length - 1) {
      const currentBlock = this.chain[idx];
      if (!this._isTransactionValid(prevBlock, currentBlock)) {
        return false;
      }
      prevBlock = currentBlock;
      idx++;
    }
    return true;
  }

  private _isTransactionValid(prevBlock: Block, nextBlock: Block) {
    const blockHash = this._hashBlock({
      data: nextBlock.data,
      index: nextBlock.index,
      prevHash: nextBlock.prevHash,
      nonce: nextBlock.nonce,
      timestamp: nextBlock.timestamp,
    });

    if (nextBlock.hash !== blockHash) {
      LOGGING.error(
        `The current hash: ${nextBlock.hash} is different from the generated hash: ${blockHash}`,
      );
      return false;
    }

    if (nextBlock.prevHash !== prevBlock.hash) {
      LOGGING.error(
        `The previous hash ${nextBlock.prevHash} does not match ${prevBlock.hash}`,
      );
      return false;
    }

    if (nextBlock.index !== prevBlock.index + 1) {
      LOGGING.error(
        `Previous index ${prevBlock.index} does not match new index ${nextBlock.index}`,
      );
      return false;
    }
    return true;
  }

  private _mine(block: Omit<Block, "hash">): { nonce: number; hash: string } {
    let nonce = 0;
    let hash: string;

    while (true) {
      const temp = { ...block, nonce };
      hash = this._hashBlock(temp);
      if (hash.startsWith("0".repeat(this.difficulty))) {
        break;
      } else {
        nonce++;
      }
    }

    return { nonce, hash };
  }

  private _generateGenesis(): Block {
    const genesis = {
      index: 0,
      data: "genesis",
      hash: "",
      prevHash: null,
      timestamp: Date.now(),
      nonce: 0,
    };

    const h = this._hashBlock(genesis);
    genesis.hash = h;

    return genesis;
  }

  private _hashBlock(block: Omit<Block, "hash">) {
    const blockData = JSON.stringify({
      index: block.index,
      data: block.data,
      prevHash: block.prevHash,
      nonce: block.nonce,
      timestamp: block.timestamp,
    });
    const hash = createHash("sha256").update(blockData).digest("hex");
    return hash;
  }
}
