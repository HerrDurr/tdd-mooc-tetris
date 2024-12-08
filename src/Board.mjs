const emptyLine = '...\n';

export class Board {
  width;
  height;
  lineOne = emptyLine;
  lineTwo = emptyLine;
  lineThree = emptyLine;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    return this.lineOne + this.lineTwo + this.lineThree;
  }

  drop(block) {
    if (block === "Y") {
      throw new Error("already falling");
    } else {
      this.lineOne = '.X.\n';
    }
  }

  tick() {
    if (this.lineTwo === emptyLine) {
      this.lineOne = emptyLine;
      this.lineTwo = '.X.\n';
    } else {
      this.lineTwo = emptyLine;
      this.lineThree = '.X.\n';
    }
  }
}
