export class Shape {

  constructor() {
    if (this.constructor == Shape) {
      throw new Error("Shape is an abstract class and cannot be instantiated");
    }
  }
}