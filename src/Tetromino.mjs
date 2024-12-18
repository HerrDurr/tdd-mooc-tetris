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
    return new Tetromino(['.T.','.TT','.T.']);
  }

}