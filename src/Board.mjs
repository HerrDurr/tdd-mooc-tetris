import { isNull } from "lodash";
import { Block } from "../src/Block.mjs";

export class Board {
  width;
  height;
  linesWithStaticShapes = [];
  fallingShape = null;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  lines() {
    const lineArray = this.linesWithStaticShapes;
    while (lineArray.length < this.height) {
      lineArray.unshift(this.line());
    }
    if (this.hasFalling()) {
      this.addShapeToLines(lineArray);
    }
    return lineArray;
  }

  toString() {
    return this.lines().join('');
  }

  addShapeToLines(lineArray) {
    const top = this.fallingShape.top();
    const left = this.fallingShape.left();
    const shapeLines = this.fallingShape.toString().split('\n');
    for (let iShape = 0; iShape < shapeLines.length; iShape++) {
      lineArray[top + iShape] = this.line(shapeLines[iShape], left);
    }
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
    this.fallingShape.setPos( [Math.ceil(this.width / 2) - 1 - Math.trunc(this.fallingShape.width() / 2), 0] );
  }

  tick() {
    if (this.hasFalling() === true) {
      if (this.fallingShape.shapeBottomIndexOnBoard() === this.lastFreeRowIndex()) {
        this.setShapeToBottom();
      } else {
        this.fallingShape.setPos( [this.fallingShape.left(), this.fallingShape.top() + 1] );
      }
    }
  }

  setShapeToBottom() {
    this.linesWithStaticShapes = this.lines();
    while (this.linesWithStaticShapes.length > 0 && this.linesWithStaticShapes[0].replaceAll(".", "").trim().length === 0) {
      this.linesWithStaticShapes.shift();
    }
    this.fallingShape = null;
  }

  lastFreeRowIndex() {
    return this.lastRowIndex() - this.linesWithStaticShapes.length;
  }

  lastRowIndex() {
    return this.height - 1;
  }

  hasFalling() {
    return !isNull(this.fallingShape);
  }
}
