import { Shape } from "./Shape.mjs";

export class Block extends Shape {
  character = "";
  pos = [-1, -1];

  constructor(character) {
    super();
    this.character = character;
  }

  toString() {
    return this.character;
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

  left() {
    return this.getPos()[0];
  }
}