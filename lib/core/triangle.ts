import { Vec2 } from "../types.ts"
import { line } from "./line.ts"

export const triangle = (a: Vec2, b: Vec2, c: Vec2) => {
  return [...line(a, b), ...line(b, c), ...line(c, a)]
}
