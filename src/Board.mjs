import { isNull } from "lodash";
import { Block } from "../src/Block.mjs";

export class Board {
  width;
  height;
  linesWithStaticShapes = [];
  fallingShape = null;
  fallingPos = [-1,-1];

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  lines() {
    const lineArray = this.linesWithStaticShapes.slice();
    while (lineArray.length < this.height) {
      lineArray.unshift(this.line());
    }
    if (this.hasFalling()) {
      this.addFallingShapeToLines(lineArray);
    }
    return lineArray;
  }

  toString() {
    return this.lines().join('');
  }

  addFallingShapeToLines(lineArray) {
    const top = this.fallingPos[1];
    const left = this.fallingPos[0];
    const shapeLines = this.fallingShape.lines();
    for (let iShape = 0; iShape < shapeLines.length; iShape++) {
      if ( !this.isLineEmpty(shapeLines[iShape]) ) {
        lineArray[top + iShape] = this.line(shapeLines[iShape], left);
      }
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
    this.fallingPos[0] = Math.ceil(this.width / 2) - 1 - Math.trunc(this.fallingShape.width() / 2);
    this.fallingPos[1] = 0;
  }

  tick() {
    if (this.hasFalling() === true) {
      if (this.fallingShapeBottomIndex() === this.lastFreeRowIndex()) {
        this.setShapeToBottom();
      } else {
        this.fallingPos[1] = this.fallingPos[1] + 1;
      }
    }
  }

  fallingShapeBottomIndex() {
    return this.fallingPos[1] + this.fallingShape.shapeHeight() - 1;
  }

  setShapeToBottom() {
    this.linesWithStaticShapes = this.lines();
    while ( this.linesWithStaticShapes.length > 0 && this.isLineEmpty(this.linesWithStaticShapes[0]) ) {
      this.linesWithStaticShapes.shift();
    }
    this.fallingShape = null;
  }

  isLineEmpty(line) {
    const cleanedLine = line.replaceAll(".","").trim();
    return cleanedLine.length === 0;
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

  moveLeft() {
    this.fallingPos[0] = this.fallingPos[0] - 1;
  }

  moveRight() {
    this.fallingPos[0] = this.fallingPos[0] + 1;
  }

  moveDown() {
    this.fallingPos[1] = this.fallingPos[1] + 1;
  }
}
