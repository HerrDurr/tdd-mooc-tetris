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

  staticLines() {
    const lineArray = this.linesWithStaticShapes.slice();
    while (lineArray.length < this.height) {
      lineArray.unshift(this.line());
    }
    return lineArray;
  }

  lines() {
    const lineArray = this.staticLines();
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
    const shapeLines = this.fallingShape.lines();
    for (let iShape = 0; iShape < shapeLines.length; iShape++) {
      if ( !this.isLineEmpty(shapeLines[iShape]) ) {
        lineArray[top + iShape] = this.line( lineArray[top + iShape].trim(), shapeLines[iShape] );
      }
    }
  }

  line(originalLine, shapeLine) {
    const lineArray = this.baseLine(originalLine);
    if (shapeLine) {
      for (let iShapeLine = 0; iShapeLine < shapeLine.length; iShapeLine++) {
        const iLine = this.fallingPos[0] + iShapeLine;
        lineArray[iLine] = shapeLine[iShapeLine];
      }
    } 
    return lineArray.join('') + '\n';
  }

  baseLine(originalLine) {
    if (originalLine) {
      return Array.from(originalLine);
    } else {
      return Array.from({length: this.width}, (_, i) => '.');
    }
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
    this.moveDown();
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

  hasFalling() {
    return !isNull(this.fallingShape);
  }

  moveLeft() {
    if (this.fallingPos[0] > 0) {
      this.fallingPos[0] = this.fallingPos[0] - 1;
    }
  }

  moveRight() {
    if (this.fallingPos[0] < this.width - this.fallingShape.width()) {
      this.fallingPos[0] = this.fallingPos[0] + 1;
    }
  }

  moveDown() {
    if (this.hasFalling() === true) {
      if (this.isNextRowOccupied()) {
        this.setShapeToBottom();
      } else {
        this.fallingPos[1] = this.fallingPos[1] + 1;
      }
    }
  }

  isNextRowOccupied() {
    const y = this.fallingPos[1] + this.fallingShape.shapeHeight();
    if (y === this.height) {return true;}
    
    const staticLines = this.staticLines();
    for (let x = this.fallingPos[0]; x < this.fallingPos[0] + this.fallingShape.width(); x++) {
      if (staticLines[y][x] !== '.') {
        return true;
      }
    }
    return false;
  }
}
