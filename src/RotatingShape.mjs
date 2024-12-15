export class RotatingShape {
  shapeString = [];

  constructor(shapeString) {
    this.shapeString = shapeString;
  }

  static fromString(shapeString) {
    return new RotatingShape(shapeString.replaceAll(" ", "").trim().split("\n"));
  }

  toString() {
    return this.shapeString.join('\n') + '\n';
  }

  maxIndex() {
    return this.shapeString.length - 1;
  }

  replaceCharAtIndex(originalString, char, index) {
    return originalString.substring(0, index) + char + originalString.substring(index + 1);
  }

  rotatedRow(oldColIdx, isRight) {
    let newRow = '';
    for (let oldRowIdx = 0; oldRowIdx < this.shapeString.length; oldRowIdx++) {
      if (isRight) {
        newRow = this.shapeString[oldRowIdx][oldColIdx] + newRow;
      } else {
        newRow = newRow + this.shapeString[oldRowIdx][oldColIdx];
      }
    }
    return newRow;
  }

  rotateRight() {
    const newShape = Array.from(this.shapeString);
    for (let oldColIdx = 0; oldColIdx < this.shapeString.length; oldColIdx++) {
      let newRowIdx = oldColIdx;
      newShape[newRowIdx] = this.rotatedRow(oldColIdx, true);
    }
    return new RotatingShape(newShape);
  }

  rotateLeft() {
    const newShape = Array.from(this.shapeString);
    for (let oldColIdx = 0; oldColIdx < this.shapeString.length; oldColIdx++) {
      let newRowIdx = this.maxIndex() - oldColIdx;
      newShape[newRowIdx] = this.rotatedRow(oldColIdx, false);
    }
    return new RotatingShape(newShape);
  }
}