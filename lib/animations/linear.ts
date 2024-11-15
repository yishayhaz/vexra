// WIP

import { line } from "../core/index.ts"
import type { Point } from "../types.ts"

export const linear = (
  from: Point,
  to: Point,
  time: number,
  frame: number,
  fps: number
): Point => {
  const deltaTimeInMs = (frame / fps) * 1000

  if (deltaTimeInMs >= time) return to

  const vertices = line(from, to)

  const index = Math.floor((vertices.length / time) * deltaTimeInMs)

  return vertices[index] ?? to
}
