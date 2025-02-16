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

  toString() {
    return this.shapeString.join('\n') + '\n';
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

  rotate(isRight) {
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
    if (this.altShapeString) {
      return this.altShape();
    }
    return this.rotate(true);
  }

  rotateLeft() {
    if (this.altShapeString) {
      return this.altShape();
    } else {
      return this.rotate(false);
    }
  }

  width() {
    return this.shapeString.length;
  }

  shapeBottomIndexOnBoard() {
    return this.top() + this.shapeHeight() - 1;
  }

  shapeHeight() {
    return 2;
  }
}