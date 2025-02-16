import { Shape } from "./Shape.mjs";

export class Tetromino extends Shape {

  static T_SHAPE = new Tetromino(['.T.','TTT','...']);
  static I_SHAPE = new Tetromino(['.....','.....','IIII.','.....','.....'],
                                 ['..I..','..I..','..I..','..I..','.....']
  );
  static O_SHAPE = new Tetromino(['.OO','.OO','...'],
                                 ['.OO','.OO','...']
);

  shapeString = [];
  altShapeString;

  constructor(shapeString, altShapeString) {
    super();
    this.shapeString = shapeString;
    this.altShapeString = altShapeString;
  }

  lines() {
    return this.shapeString;
  }

  altShape() {
    return new Tetromino(this.altShapeString, this.shapeString);
  }

  rotatedRow(oldColIdx, isRight) {
    let newRow = '';
    for (let oldRowIdx = 0; oldRowIdx < this.shapeString.length; oldRowIdx++) {
      if (isRight) {
        newRow = this.shapeString[oldRowIdx][oldColIdx] + newRow;
      } else {
        newRow = newRow + this.shapeString[oldRowIdx][oldColIdx];
      }
    }
    return newRow;
  }

  doRotate(isRight) {
    const newShape = Array.from(this.shapeString);
    for (let oldColIdx = 0; oldColIdx < this.shapeString.length; oldColIdx++) {
      let newRowIdx = oldColIdx;
      if (!isRight) {
        newRowIdx = this.shapeString.length - 1 - newRowIdx;
      }  
      newShape[newRowIdx] = this.rotatedRow(oldColIdx, isRight);
    }
    return new Tetromino(newShape);
  }

  rotateRight() {
    return this.rotate(true);
  }

  rotateLeft() {
    return this.rotate(false);
  }

  rotate(isRight) {
    if (this.altShapeString) {
      return this.altShape();
    } else {
      return this.doRotate(isRight);
    }
  }

  shapeHeight() {
    return 2;
  }
}