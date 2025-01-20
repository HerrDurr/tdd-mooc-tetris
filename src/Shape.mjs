export class Shape {
  pos = [-1, -1];

  constructor() {
    if (this.constructor == Shape) {
      throw new Error("Shape is an abstract class and cannot be instantiated");
    }
  }

  setPos(pos) {
    this.pos = pos;
  }

  getPos() {
    return this.pos;
  }

  top() {
    return this.getPos()[1];
  }

}