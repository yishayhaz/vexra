import { Board, drawMesh, cubeMesh } from "./lib/index.ts"

const board = new Board(100, 100)

// board.triangle({ x: 0, y: 0 }, { x: 0, y: 4 }, { x: 4, y: 4 }, 1)
// board.triangle({ x: 0, y: 0 }, { x: 4, y: 0 }, { x: 4, y: 4 }, 1)

drawMesh(cubeMesh, board, 0)

console.log(board.matrix)
