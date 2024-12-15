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

  rotate(isRight) {
    const newShape = Array.from(this.shapeString);
    for (let oldColIdx = 0; oldColIdx < this.shapeString.length; oldColIdx++) {
      let newRowIdx = oldColIdx;
      if (!isRight) {
        newRowIdx = this.maxIndex() - newRowIdx;
      }  
      newShape[newRowIdx] = this.rotatedRow(oldColIdx, isRight);
    }
    return new RotatingShape(newShape);
  }

  rotateRight() {
    return this.rotate(true);
  }

  rotateLeft() {
    return this.rotate(false);
  }
}