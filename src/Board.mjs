const emptyLine = '...\n';

export class Board {
  width;
  height;
  fallingBlockTop = -1;
  blocksAtBottom = [];
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
    if (this.blocksAtBottom.length > 0) {
      lineArray[this.lastRowIndex()] = this.line(this.blocksAtBottom[0]);
      if (this.blocksAtBottom.length === 2) {
        lineArray[this.lastRowIndex() - 1] = this.line(this.blocksAtBottom[1]);
      }
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
    if (this.fallingBlockTop === this.lastRowIndex() - this.blocksAtBottom.length) {
      this.fallingBlockTop = -1;
      this.blocksAtBottom[this.blocksAtBottom.length] = this.fallingBlock;
    } else if (this.hasFalling() === true) {
      this.fallingBlockTop += 1;
    }
  }

  lastRowIndex() {
    return this.height - 1;
  }

  hasFalling() {
    return this.fallingBlockTop >= 0;
  }
}
