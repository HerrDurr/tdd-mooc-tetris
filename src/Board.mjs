import { isNull } from "lodash";
import { Block } from "../src/Block.mjs";

export class Board {
  width;
  height;
  staticBottom = [];
  fallingBlock = null;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const lineArray = Array.from({length: this.height}, (_, i) => this.line());
    if (this.hasFalling()) {
      lineArray[this.fallingBlock.top()] = this.line(this.fallingBlock.toString(), this.fallingBlock.left());
    }
    for (let iBlock = this.staticBottom.length - 1; iBlock >= 0; iBlock--) {
      let iLine = this.lastRowIndex() - iBlock;
      lineArray[iLine] = this.line(this.staticBottom[iBlock], 1);
    }
    return lineArray.join('');
  }

  line(block, blockLeft) {
    const lineArray = Array.from({length: this.height}, (_, i) => '.');
    if (block) {
      lineArray[blockLeft] = block;
    } 
    return lineArray.join('') + '\n';
  }

  drop(block) {
    if (this.hasFalling() === true) {
      throw new Error("already falling");
    } else if (typeof block === 'string') {
      this.fallingBlock = new Block(block);
    } else {
      this.fallingBlock = block;
    }
    this.fallingBlock.setPos( [Math.trunc(this.width / 2), 0] );
  }

  tick() {
    if (this.fallingBlock.top() === this.lastFreeRowIndex()) {
      this.setShapeToBottom();
    } else if (this.hasFalling() === true) {
      this.fallingBlock.setPos( [this.fallingBlock.left(), this.fallingBlock.top() + 1] );
    }
  }

  setShapeToBottom() {
    this.staticBottom[this.staticBottom.length] = this.fallingBlock.toString();
    this.fallingBlock = null;
  }

  lastFreeRowIndex() {
    return this.lastRowIndex() - this.staticBottom.length;
  }

  lastRowIndex() {
    return this.height - 1;
  }

  hasFalling() {
    return !isNull(this.fallingBlock);
  }
}
