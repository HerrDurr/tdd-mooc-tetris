import { Shape } from "./Shape.mjs";

export class Block extends Shape {
  character = "";

  constructor(character) {
    super();
    this.character = character;
  }

  lines() {
    return [this.character];
  }

  shapeHeight() {
    return 1;
  }
}