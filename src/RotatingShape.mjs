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

  rotateRight() {
    const newShape = Array.from(this.shapeString);
    for (let oldColIdx = 0; oldColIdx < this.shapeString.length; oldColIdx++) {
      let newRowIdx = oldColIdx;
      for (let oldRowIdx = 0; oldRowIdx < this.shapeString.length; oldRowIdx++) {
        let newColIdx = this.maxIndex() - oldRowIdx;
        let newRow = newShape[newRowIdx].substring(0, newColIdx) + this.shapeString[oldRowIdx][oldColIdx] + newShape[newRowIdx].substring(newColIdx + 1);
        newShape[newRowIdx] = newRow;
      }
    }
    return new RotatingShape(newShape);
  }

  rotateLeft() {
    const newShape = Array.from(this.shapeString);
    for (let oldColIdx = 0; oldColIdx < this.shapeString.length; oldColIdx++) {
      let newRowIdx = this.maxIndex() - oldColIdx;
      for (let oldRowIdx = 0; oldRowIdx < this.shapeString.length; oldRowIdx++) {
        let newColIdx = oldRowIdx;
        let newRow = newShape[newRowIdx].substring(0, newColIdx) + this.shapeString[oldRowIdx][oldColIdx] + newShape[newRowIdx].substring(newColIdx + 1);
        newShape[newRowIdx] = newRow;
      }
    }
    return new RotatingShape(newShape);
  }
}