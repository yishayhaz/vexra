// TODO: Re-think this file. might be unnecessary

import { line } from "./core/line.ts"
import { polygon } from "./core/polygon.ts"
import { triangle } from "./core/triangle.ts"
import type { Vec2 } from "./types.ts"

export class Board {
  matrix: number[][]

  get width() {
    return this.matrix[0].length
  }

  get height() {
    return this.matrix.length
  }

  constructor(width: number, height: number) {
    this.matrix = Array.from({ length: height }, () => Array(width).fill(0))
  }

  setPixel(x: number, y: number, value: number) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.matrix[y][x] = value
    }
  }

  verticesToMatrix(vertices: Vec2[], value: number) {
    for (const vertex of vertices) {
      this.setPixel(vertex.x, vertex.y, value)
    }
  }

  line(x1: number, y1: number, x2: number, y2: number, value: number) {
    this.verticesToMatrix(line({ x: x1, y: y1 }, { x: x2, y: y2 }), value)
  }

  polygon(x: number, y: number, radius: number, dots: number, value: number) {
    this.verticesToMatrix(polygon(x, y, radius, dots), value)
  }

  triangle(a: Vec2, b: Vec2, c: Vec2, value: number) {
    this.verticesToMatrix(triangle(a, b, c), value)
  }

  reset() {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.matrix[y][x] !== 0) {
          this.setPixel(x, y, 0)
        }
      }
    }
  }
}
