
;
const player = require('../modules/player');


//=================================================================

import Ship from "../modules/ship";
test("createShip creates objects with correct properties", () => {
  const battleShip = new Ship(3);

  expect(battleShip).toEqual({
    size: 3,
    hitcount: 0,
    sunken: false,
  });
});

test("correctly marks ship as sunk after said hits", () => {
  const battleShip = new Ship(3);
  battleShip.hit()
  battleShip.hit()
  battleShip.hit()

  expect(battleShip).toEqual({
    size: 3,
    hitcount: 3,
    sunken: true,
  });
});
    
//=====================================================================

import Board from "../modules/board";

test("creates board with correct properties", () => {
  const gameboard = new Board(7);

  expect(gameboard).toEqual({
    size: 7,
  });
});

test("ships cannot be placed in same space", () => {
  const gameboard = new Board(7);
  gameboard.placeship(3, [[1,1],[1,2],[1,3]])

  expect(gameboard.placeship(3, [[1,1],[1,2],[1,3]])).toEqual(false)
});

test("game board detects hits on ships", () => {
  const gameboard = new Board(7);
  gameboard.placeship(3, [[1,1],[1,2],[1,3]])

  expect(gameboard.takehit(1,1)).toEqual(true)
});