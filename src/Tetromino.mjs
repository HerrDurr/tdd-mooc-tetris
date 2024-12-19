export class Tetromino {

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
    this.shapeString = shapeString;
    this.altShapeString = altShapeString;
  }

  toString() {
    return this.shapeString.join('\n') + '\n';
  }

  altShape() {
    return new Tetromino(this.altShapeString, this.shapeString);
  }

  rotatedRow(oldColIdx) {
    let newRow = '';
    for (let oldRowIdx = 0; oldRowIdx < this.shapeString.length; oldRowIdx++) {
      newRow = this.shapeString[oldRowIdx][oldColIdx] + newRow;
    }
    return newRow;
  }

  rotateRight() {
    if (this.altShapeString) {
      return this.altShape();
    }
    const newShape = Array.from(this.shapeString);
    for (let oldColIdx = 0; oldColIdx < this.shapeString.length; oldColIdx++) {
      let newRowIdx = oldColIdx;
      for (let oldRowIdx = 0; oldRowIdx < this.shapeString.length; oldRowIdx++) {
        let newRow = this.rotatedRow(oldColIdx);
        newShape[newRowIdx] = newRow;
      }
    }
    return new Tetromino(newShape);
  }

  rotateLeft() {
    if (this.altShapeString) {
      return this.altShape();
    } else {
      const newShape = Array.from(this.shapeString);
      for (let oldColIdx = 0; oldColIdx < this.shapeString.length; oldColIdx++) {
        let newRowIdx = this.shapeString.length - 1 - oldColIdx;
        for (let oldRowIdx = 0; oldRowIdx < this.shapeString.length; oldRowIdx++) {
          let newColIdx = oldRowIdx;
          let newRow = newShape[newRowIdx].substring(0, newColIdx) + this.shapeString[oldRowIdx][oldColIdx] + newShape[newRowIdx].substring(newColIdx + 1);
          newShape[newRowIdx] = newRow;
        }
      }
      return new Tetromino(newShape);
    }
  }

}