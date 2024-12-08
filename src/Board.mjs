const emptyLine = '...\n';

export class Board {
  width;
  height;
  lines = [emptyLine, emptyLine, emptyLine];
  lineOne = emptyLine;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    return this.lines.join('');
  }

  drop(block) {
    if (block === "Y") {
      throw new Error("already falling");
    } else {
      this.lineOne = '.X.\n';
      this.lines[0] = '.X.\n';
    }
  }

  tick() {
    if (this.lines[1] === emptyLine) {
      this.lineOne = emptyLine;
      this.lines[0] = emptyLine;
      this.lines[1] = '.X.\n';
    } else {
      this.lines[1] = emptyLine;
      this.lines[2] = '.X.\n';
    }
  }
}
