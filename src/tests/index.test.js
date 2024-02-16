/* eslint-disable no-undef */
// eslint-disable-next-line no-unused-vars
const player = require('../modules/player');

//===========================SHIP TESTS======================================

import Ship from "../modules/ship";
test("createShip creates objects with correct properties", () => {
  const battleShip = new Ship(3);

  // eslint-disable-next-line no-undef
  expect(battleShip).toEqual({
    size: 3,
    hitcount: 0,
    sunken: false,
    cord: []
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
    cord: []
  });
});
    
//=========================BOARD TESTS============================================

import Board from "../modules/board";
test("create blank map with set size", () => {
  let newgame = new Board(8)
  expect(newgame).toEqual({
        size: 8,
        hits: [],
        ships: [],
        miss: []
  });
});

test("create blank map with set size (2)", () => {
  let newgame = new Board(90)
  expect(newgame).toEqual({
        size: 90,
        hits: [],
        ships: [],
        miss: []
  });
});

test("Add ship to blank map", () => {
  let newgame = new Board(8)
  newgame.addship(3,[0,0], 'S')
  expect(newgame.ships).toEqual([{size: 3, hitcount: 0, sunken: false, cord: [[0,0],[0,1],[0,2]]}])

})

test("Add ship to blank map (2)", () => {
  let newgame = new Board(8)
  newgame.addship(1,[0,0], 'S')
  expect(newgame.ships).toEqual([{size: 1, hitcount: 0, sunken: false, cord: [[0,0]]}])

})

test("Add 3 ship to blank map", () => {
  let newgame = new Board(8)
  newgame.addship(3, [0,0], 'S')
  newgame.addship(1,[2,4], 'S')
  newgame.addship(4,[4,2], 'E')

  expect(newgame.ships).toEqual([
  {size: 3, hitcount: 0, sunken: false, cord: [[0,0],[0,1],[0,2]]}, 
  {size: 1, hitcount: 0, sunken: false, cord: [[2,4]]}, 
  {size: 4, hitcount: 0, sunken: false, cord: [[4,2],[5,2],[6,2],[7,2]]}])
})

test("Checking out of bounds detection", () => {
  let newgame = new Board(8)
  expect(() => newgame.processcoordiates(3,[0,0], 'N')).toThrow("Coordinates are out of bounds")
})

test("Checking out of bounds detection (2)", () => {
  let newgame = new Board(8) 
  expect(() => newgame.processcoordiates(3,[newgame.size , newgame.size], 'S')).toThrow("Coordinates are out of bounds")
})

test("Checking out of bounds detection (3)", () => {
  let newgame = new Board(8) 
  expect(() => newgame.processcoordiates(3,[10,  11], 'S')).toThrow("Coordinates are out of bounds")
})

test("Checking used coordinate detection", () => {
  let newgame = new Board(8)
  newgame.addship(3,[7,5], 'S')
  expect(() => newgame.processcoordiates(4,[5, 5], 'E')).toThrow("A ship already exists at these coordinates")
})

test("Checking used coordinate detection (2)", () => {
  let newgame = new Board(9)
  newgame.addship(3,[4,4], 'S')
  expect(() => newgame.processcoordiates(3,[5,5], 'W')).toThrow("A ship already exists at these coordinates")
})

test("Checking used coordinate detection (3)", () => {

  let newgame = new Board(9)
  newgame.addship(3,[4,4], 'S')
  expect(() => newgame.processcoordiates(3,[4,4], 'S')).toThrow("A ship already exists at these coordinates")
})

test("Testing hit function (1)", () => {
  let newgame = new Board(8)
  newgame.addship(3,[5,5], 'S')
  newgame.receiveattack([5,6])
  expect(newgame.ships).toEqual([{size: 3, hitcount: 1, sunken: false, cord: [[5,5],[5,6],[5,7]]}])
})

test("Testing hit function (2)", () => {
  let newgame = new Board(8)
  newgame.addship(3,[0,0], 'S')
  newgame.receiveattack([0,0])
  expect(newgame.ships).toEqual([{size: 3, hitcount: 1, sunken: false, cord: [[0,0],[0,1],[0,2]]}])
})

test("Testing hit function (3)", () => {
  let newgame = new Board(8)
  newgame.addship(3,[0,0], 'S')
  newgame.receiveattack([5,5])
  expect(newgame.ships).toEqual([{size: 3, hitcount: 0, sunken: false, cord: [[0,0],[0,1],[0,2]]}])
})

test("Testing hit then sunk ship detection", () => {
  let newgame = new Board(8)
  newgame.addship(1,[0,0], 'S')
  newgame.receiveattack([0,0])
  expect(newgame.ships).toEqual([{size: 1, hitcount: 1, sunken: true, cord: [[0,0]]}])
})

test("Testing all sunk detection", () => {
  let newgame = new Board(8)
  newgame.addship(1,[0,0], 'S')
  newgame.receiveattack([0,0])
  expect(newgame.allsunk()).toEqual(true)
})

test("Testing all sunk detection (2)", () => {
  let newgame = new Board(8)
  newgame.addship(1,[0,0], 'S')
  newgame.receiveattack([3,0])
 expect(newgame.allsunk()).toEqual(false)
})

test("Testing collision function", () => {
  let newgame = new Board(8)
  newgame.addship(3,[0,0], 'S')
  newgame.receiveattack([5,5])
  expect(() => newgame.receiveattack([5,5])).toThrow("A miss already exists at these coordinates")
})

test("Testing collision function (2)", () => {
  let newgame = new Board(8)
  newgame.addship(3,[0,0], 'S')
  newgame.receiveattack([3,4])
  expect(() => newgame.receiveattack([3,4])).toThrow("A miss already exists at these coordinates")
})

test("Testing collision function (3)", () => {
  let newgame = new Board(8)
  newgame.addship(3,[0,0], 'S')
  newgame.receiveattack([0,0])
  expect(() => newgame.receiveattack([0,0])).toThrow("A hit already exists at these coordinates")
})
test("Testing collision function (4)", () => {
  let newgame = new Board(8)
  newgame.addship(3,[5,5], 'S')
  newgame.receiveattack([5,6])
  expect(() => newgame.receiveattack([5,6])).toThrow("A hit already exists at these coordinates")
})