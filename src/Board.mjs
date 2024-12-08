const emptyLine = '...\n';

export class Board {
  width;
  height;
  lineOne = emptyLine;
  lineTwo = emptyLine;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const line = emptyLine;
    return this.lineOne + this.lineTwo + line;
  }

  drop(block) {
    this.lineOne = '.X.\n';
  }

  tick() {
    this.lineOne = emptyLine;
    this.lineTwo = '.X.\n';
  }
}
