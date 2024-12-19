export class Tetromino {

  static T_SHAPE = new Tetromino(['.T.','TTT','...']);
  static I_SHAPE = new Tetromino(['.....','.....','IIII.','.....','.....']);

  shapeString = [];

  constructor(shapeString) {
    this.shapeString = shapeString;
  }

  toString() {
    return this.shapeString.join('\n') + '\n';
  }

  rotateRight() {
    if (this.shapeString.length === 5) {
      return this.rotateLeft();
    }
    const newShape = Array.from(this.shapeString);
    for (let oldColIdx = 0; oldColIdx < this.shapeString.length; oldColIdx++) {
      let newRowIdx = oldColIdx;
      for (let oldRowIdx = 0; oldRowIdx < this.shapeString.length; oldRowIdx++) {
        let newColIdx = this.shapeString.length - 1 - oldRowIdx;
        let newRow = newShape[newRowIdx].substring(0, newColIdx) + this.shapeString[oldRowIdx][oldColIdx] + newShape[newRowIdx].substring(newColIdx + 1);
        newShape[newRowIdx] = newRow;
      }
    }
    return new Tetromino(newShape);
  }

  rotateLeft() {
    if (this.shapeString.length === 3) {
      return new Tetromino(['.T.','TT.','.T.']);
    } else if (this.shapeString[2] === 'IIII.') {
      return new Tetromino(['..I..','..I..','..I..','..I..','.....']);
    } else {
      return new Tetromino(['.....','.....','IIII.','.....','.....']);
    }
  }

}