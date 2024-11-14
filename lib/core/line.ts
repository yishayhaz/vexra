import type { Point } from "../types"

export const line = (
  { x: x1, y: y1 }: Point,
  { x: x2, y: y2 }: Point
): Point[] => {
  const points: Point[] = []

  const dx = Math.abs(x2 - x1)
  const dy = Math.abs(y2 - y1)

  const sx = x1 < x2 ? 1 : -1
  const sy = y1 < y2 ? 1 : -1

  let d = dx - dy

  let x = x1,
    y = y1

  while (true) {
    points.push({ x, y })

    if (x === x2 && y === y2) break

    const d2 = 2 * d

    if (d2 > -dy) {
      d -= dy
      x += sx
    }
    if (d2 < dx) {
      d += dx
      y += sy
    }
  }

  return points
}
