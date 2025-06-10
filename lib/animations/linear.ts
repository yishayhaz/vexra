// WIP

import { line } from "../core/index.ts"
import type { Vec2 } from "../types.ts"

export const linear = (
  from: Vec2,
  to: Vec2,
  time: number,
  frame: number,
  fps: number
): Vec2 => {
  const deltaTimeInMs = (frame / fps) * 1000

  if (deltaTimeInMs >= time) return to

  const vertices = line(from, to)

  const index = Math.floor((vertices.length / time) * deltaTimeInMs)

  return vertices[index] ?? to
}
