import { Board } from "./lib/index.ts";

const board = new Board(20, 20);

board.line(5, 5, 10, 10, 1);

board.print();
