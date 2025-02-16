export class Shape {
  pos = [-1, -1];

  constructor() {
    if (this.constructor == Shape) {
      throw new Error("Shape is an abstract class and cannot be instantiated");
    }
  }

  toString() {
    return this.lines().join('\n') + '\n';
  }

  lines() {
    throw new Error("Unimplemented method lines()!");
  }

  setPos(pos) {
    this.pos = pos;
  }

  getPos() {
    return this.pos;
  }



  width() {
    return this.lines()[0].length;
  }

  shapeHeight() {
    throw new Error("Unimplemented method shapeHeight()!");
  }
}