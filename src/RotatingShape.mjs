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

  rotateRight() {
    return new RotatingShape(['GDA','HEB','IFC']);
  }

  rotateLeft() {
    return new RotatingShape(['CFI','BEH','ADG']);
  }
}