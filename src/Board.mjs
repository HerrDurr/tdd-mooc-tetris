const emptyLine = '...\n';

export class Board {
  width;
  height;
  lines = [emptyLine, emptyLine, emptyLine];
  hasFallingBlock = true;

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
      this.lines[0] = '.X.\n';
    }
  }

  tick() {
    for (let i = 0; i < this.lines.length; i++) {
      if (this.lines[i] !== emptyLine) {
        if (i + 1 === this.lines.length) {
          this.hasFallingBlock = false;
        } else {
          this.lines[i] = emptyLine;
          this.lines[i+1] = '.X.\n';
          break;
        }
      }
    }
  }

  hasFalling() {
    return this.hasFallingBlock;
  }
}
