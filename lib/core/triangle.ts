import { Point } from "../types.ts"
import { line } from "./line.ts"

export const triangle = (a: Point, b: Point, c: Point) => {
  return [...line(a, b), ...line(b, c), ...line(c, a)]
}
