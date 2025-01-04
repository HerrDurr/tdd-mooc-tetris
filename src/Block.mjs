export class Block {
  character = "";
  pos = [-1, -1];

  constructor(character) {
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
}