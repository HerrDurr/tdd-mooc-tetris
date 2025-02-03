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

  width() {
    return 1;
  }
}