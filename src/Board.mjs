const emptyLine = '...\n';

export class Board {
  width;
  height;
  lines = [emptyLine, emptyLine, emptyLine];
  fallingBlockTop = -1;
  blockAtBottom = false;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const lineArray = [emptyLine, emptyLine, emptyLine];
    if (this.fallingBlockTop >= 0) {
      lineArray[this.fallingBlockTop] = '.X.\n';
    } else if (this.blockAtBottom) {
      lineArray[this.height - 1] = '.X.\n';
    }
    return lineArray.join('');
  }

  drop(block) {
    if (block === "Y") {
      throw new Error("already falling");
    } else {
      this.lines[0] = '.X.\n';
      this.fallingBlockTop = 0;
    }
  }

  tick() {
    for (let i = 0; i < this.lines.length; i++) {
      if (this.lines[i] !== emptyLine) {
        if (i + 1 === this.lines.length) {
          this.fallingBlockTop = -1;
          this.blockAtBottom = true;
        } else {
          this.lines[i] = emptyLine;
          this.lines[i+1] = '.X.\n';
          this.fallingBlockTop = i+1;
          break;
        }
      }
    }
  }

  hasFalling() {
    return this.fallingBlockTop >= 0;
  }
}
