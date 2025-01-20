import { Shape } from "./Shape.mjs";

export class Block extends Shape {
  character = "";

  constructor(character) {
    super();
    this.character = character;
  }

  toString() {
    return this.character;
  }

  top() {
    return this.getPos()[1];
  }

  left() {
    return this.getPos()[0];
  }
}