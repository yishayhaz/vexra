import { Board } from "./lib/index.ts"

const board = new Board(5, 5)

board.line(4, 3, 0, 0, 1)

console.log(board.matrix)
