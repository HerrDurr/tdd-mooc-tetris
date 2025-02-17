import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("A falling tetromino", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
  });

  test("can be moved left", () => {
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can be moved right", () => {
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("can be moved down", () => {
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved left beyond the board", () => {
    for (let i = 0; i < 10; i++) {
      board.moveLeft();
    }
    expect(board.toString()).to.equalShape(
      `.T........
       TTT.......
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved right beyond the board", () => {
    for (let i = 0; i < 10; i++) {
      board.moveRight();
    }
    expect(board.toString()).to.equalShape(
      `........T.
       .......TTT
       ..........
       ..........
       ..........
       ..........`
    );
  });

  test("cannot be moved down beyond the board (will stop falling)", () => {
    for (let i = 0; i < 10; i++) {
      board.moveDown();
    }
    expect(board.hasFalling()).to.be.false;
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });
});

describe("A falling tetromino", () => {
  let board;

  beforeEach(() => {    
    board = new Board(10, 6);
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.tick();
    }
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
  });

  test.skip("can fall past other blocks", () => {
    board.moveRight();
    board.moveRight();
    board.tick();

    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......T...
       ....TTTT..
       ...TTT....`
    );
  });

  test.skip("cannot be moved left through other blocks", () => {
    board.moveRight();
    board.moveRight();
    board.tick();

    board.moveLeft();
    console.log(board.toString());
    
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......T...
       ....TTTT..
       ...TTT....`
    );
  });
});
// it cannot be moved left through other blocks
// it cannot be moved right through other blocks
// it cannot be moved down through other blocks (will stop falling)