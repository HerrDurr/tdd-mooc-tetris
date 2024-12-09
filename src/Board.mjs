const emptyLine = '...\n';

export class Board {
  width;
  height;
  fallingBlockTop = -1;
  blockAtBottom;
  fallingBlock;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    const lineArray = [this.line(), this.line(), this.line()];
    if (this.fallingBlockTop >= 0) {
      lineArray[this.fallingBlockTop] = this.line(this.fallingBlock);
    }
    if (this.blockAtBottom) {
      lineArray[this.height - 1] = this.line(this.blockAtBottom);
    }
    return lineArray.join('');
  }

  line(block) {
    if (block) {
      return '.' + block + '.\n';
    } else {
      return emptyLine;
    }
  }

  drop(block) {
    if (this.hasFalling() === true) {
      throw new Error("already falling");
    } else {
      this.fallingBlockTop = 0;
      this.fallingBlock = block;
    }
  }

  tick() {
    if (this.fallingBlockTop === this.height - 1) {
      this.fallingBlockTop = -1;
      this.blockAtBottom = this.fallingBlock;
    } else if (this.hasFalling() === true) {
      this.fallingBlockTop += 1;
    }
  }

  hasFalling() {
    return this.fallingBlockTop >= 0;
  }
}
