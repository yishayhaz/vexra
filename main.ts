import { Board } from "./lib/index.ts";

const board = new Board(5, 5);

board.polygon(2, 1, 1, 4, 1);
board.line(2, 3, 2, 4, 1);

board.print();
