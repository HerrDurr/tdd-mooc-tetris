export class Tetromino {

  static T_SHAPE = new Tetromino(['.T.','TTT','...']);

  shapeString = [];

  constructor(shapeString) {
    this.shapeString = shapeString;
  }

  toString() {
    return this.shapeString.join('\n') + '\n';
  }

  rotateRight() {
    if (this.shapeString[2] === '...') {
      return new Tetromino(['.T.','.TT','.T.']);
    } else {
      return new Tetromino(['...','TTT','.T.']);
    }
  }

  rotateLeft() {
    return new Tetromino(['.T.','TT.','.T.']);
  }

}