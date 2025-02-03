import { isNull } from "lodash";
import { Block } from "../src/Block.mjs";

export class Board {
  width;
  height;
  staticBottom = [];
  fallingShape = null;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const lineArray = Array.from({length: this.height}, (_, i) => this.line());
    if (this.hasFalling()) {
      this.addShapeToLines(lineArray);
    }
    for (let iBlock = this.staticBottom.length - 1; iBlock >= 0; iBlock--) {
      let iLine = this.lastRowIndex() - iBlock;
      lineArray[iLine] = this.line(this.staticBottom[iBlock], 1);
    }
    return lineArray.join('');
  }

  addShapeToLines(lineArray) {
    const top = this.fallingShape.top();
    const left = this.fallingShape.left();
    const shapeLines = this.fallingShape.toString().split('\n');
    lineArray[top] = this.line(shapeLines[0], left);
  }

  line(shapeLine, left) {
    const lineArray = Array.from({length: this.width}, (_, i) => '.');
    if (shapeLine&&left) {
      for (let iShapeLine = 0; iShapeLine < shapeLine.length; iShapeLine++) {
        const iLine = left + iShapeLine;
        lineArray[iLine] = shapeLine[iShapeLine];
      }
    } 
    return lineArray.join('') + '\n';
  }

  drop(block) {
    if (this.hasFalling() === true) {
      throw new Error("already falling");
    } else if (typeof block === 'string') {
      this.fallingShape = new Block(block);
    } else {
      this.fallingShape = block;
    }
    this.fallingShape.setPos( [Math.trunc(this.width / 2), 0] );
  }

  tick() {
    if (this.fallingShape.top() === this.lastFreeRowIndex()) {
      this.setShapeToBottom();
    } else if (this.hasFalling() === true) {
      this.fallingShape.setPos( [this.fallingShape.left(), this.fallingShape.top() + 1] );
    }
  }

  setShapeToBottom() {
    this.staticBottom[this.staticBottom.length] = this.fallingShape.toString();
    this.fallingShape = null;
  }

  lastFreeRowIndex() {
    return this.lastRowIndex() - this.staticBottom.length;
  }

  lastRowIndex() {
    return this.height - 1;
  }

  hasFalling() {
    return !isNull(this.fallingShape);
  }
}
