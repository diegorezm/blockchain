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
  private chain: Block[];
  private difficulty: number = 2;

  constructor(chain?: Block[]) {
    if (chain) {
      this.chain = chain;
    } else {
      const genesis = this._generateGenesis();
      this.chain = [genesis];
    }
  }

  public appendBlock(data: string) {
    const prev = this.getLastBlock();
    const timestamp = Date.now();

    const newBlock: Block = {
      index: this.chain.length,
      data: data,
      hash: "",
      prevHash: prev.hash,
      nonce: 0,
      timestamp,
    };

    const { nonce, hash } = this._mine(newBlock);

    newBlock.nonce = nonce;
    newBlock.hash = hash;

    LOGGING.info(`The new block nonce is ${newBlock.nonce}`);

    this.chain.push(newBlock);

    if (!this._isChainValid()) {
      this.chain.pop();
    }
  }

  public getChain(): Block[] {
    return this.chain;
  }

  public getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  private _isChainValid() {
    let prevBlock = this.chain[0];
    let blockIdx = 1;

    while (blockIdx < this.chain.length) {
      const block = this.chain[blockIdx];

      const blockHash = this._hashBlock({
        data: block.data,
        index: block.index,
        prevHash: block.prevHash,
        nonce: block.nonce,
        timestamp: block.timestamp,
      });

      if (block.hash !== blockHash) {
        LOGGING.error(
          `The current hash: ${block.hash} is different from the generated hash: ${blockHash}`,
        );
        return false;
      }

      if (block.prevHash !== prevBlock.hash) {
        LOGGING.error(
          `The previous hash ${block.prevHash} does not match ${prevBlock.hash}`,
        );
        return false;
      }

      if (block.index !== prevBlock.index + 1) {
        LOGGING.error(
          `Previous index ${prevBlock.index} does not match new index ${block.index}`,
        );
        return false;
      }
      prevBlock = block;
      blockIdx++;
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
