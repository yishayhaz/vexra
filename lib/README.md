# Vexra

**A minimal geometry engine for 2D/3D shapes, matrix transformations, rotations, and animations.**

Vexra is a lightweight, dependency-free TypeScript library for creating and manipulating shapes on a matrix-based board.

## Roadmap

- [x] <s>Line, polygon</s>
- [ ] 2D & 3D rotations
- [ ] Animations

## Showcase

_WIP_ — coming soon!

## Example

```ts
import { Board } from "vexra"

/* Initialize a 5x5 matrix */
const board = new Board(5, 5)

/* Draw a line from (0, 0) to (4, 3) */
board.line(4, 3, 0, 0, 1)

/* There are many ways to visualize the matrix — the simplest is just printing it */
console.log(board.matrix)
```

## Motivation

I created Vexra to sharpen my math skills and use it for fun side projects.
If you have your own use cases, ideas, or improvements, feel free to open an issue or a pull request.
