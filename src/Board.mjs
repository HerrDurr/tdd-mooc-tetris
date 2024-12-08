export class Board {
  width;
  height;
  lineOne = '...\n';
  lineTwo = '...\n';

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const line = '...\n';
    return this.lineOne + this.lineTwo + line;
  }

  drop(block) {
    this.lineOne = '.X.\n';
  }

  tick() {
    this.lineOne = '...\n';
    this.lineTwo = '.X.\n';
  }
}
