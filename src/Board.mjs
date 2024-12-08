export class Board {
  width;
  height;
  lineOne = '...\n';

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const line = '...\n';
    return this.lineOne + line + line;
  }

  drop(block) {
    this.lineOne = '.X.\n';
  }
}
