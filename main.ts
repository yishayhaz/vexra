import { Board } from "./lib/index.ts"

const board = new Board(5, 5)

board.triangle({ x: 0, y: 0 }, { x: 0, y: 4 }, { x: 4, y: 4 }, 1)
board.triangle({ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, 1)

console.log(board.matrix)
