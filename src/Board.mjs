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
    for (let iBlock = this.blocksAtBottom.length - 1; iBlock >= 0; iBlock--) {
      let iLine = this.lastRowIndex() - iBlock;
      lineArray[iLine] = this.line(this.blocksAtBottom[iBlock]);
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
    if (this.fallingBlockTop === this.lastFreeRowIndex()) {
      this.fallingBlockTop = -1;
      this.blocksAtBottom[this.blocksAtBottom.length] = this.fallingBlock;
    } else if (this.hasFalling() === true) {
      this.fallingBlockTop += 1;
    }
  }

  lastFreeRowIndex() {
    return this.lastRowIndex() - this.blocksAtBottom.length;
  }

  lastRowIndex() {
    return this.height - 1;
  }

  hasFalling() {
    return this.fallingBlockTop >= 0;
  }
}
