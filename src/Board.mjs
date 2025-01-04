import { isNull } from "lodash";
import { Block } from "../src/Block.mjs";

export class Board {
  width;
  height;
  blocksAtBottom = [];
  fallingBlock = null;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const lineArray = Array.from({length: this.height}, (_, i) => this.line());
    if (this.hasFalling()) {
      lineArray[this.fallingBlock.top()] = this.line(this.fallingBlock.toString());
    }
    for (let iBlock = this.blocksAtBottom.length - 1; iBlock >= 0; iBlock--) {
      let iLine = this.lastRowIndex() - iBlock;
      lineArray[iLine] = this.line(this.blocksAtBottom[iBlock]);
    }
    return lineArray.join('');
  }

  line(block) {
    if (block) {
      return '.' + block + '.\n';
    } else {
      return new Array(this.width + 1).join('.') + '\n';
    }
  }

  drop(block) {
    if (this.hasFalling() === true) {
      throw new Error("already falling");
    } else {
      this.fallingBlock = new Block(block);
      this.fallingBlock.setPos( [Math.trunc(this.width / 2), 0] );
    }
  }

  tick() {
    if (this.fallingBlock.top() === this.lastFreeRowIndex()) {
      this.blocksAtBottom[this.blocksAtBottom.length] = this.fallingBlock.toString();
      this.fallingBlock = null;
    } else if (this.hasFalling() === true) {
      this.fallingBlock.setPos( [this.fallingBlock.left(), this.fallingBlock.top() + 1] );
    }
  }

  lastFreeRowIndex() {
    return this.lastRowIndex() - this.blocksAtBottom.length;
  }

  lastRowIndex() {
    return this.height - 1;
  }

  hasFalling() {
    return !isNull(this.fallingBlock);
  }
}
