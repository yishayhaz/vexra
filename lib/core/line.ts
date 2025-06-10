import type { Vec2 } from "../types.ts"

export const line = (
  { x: x1, y: y1 }: Vec2,
  { x: x2, y: y2 }: Vec2
): Vec2[] => {
  const points: Vec2[] = []

  const sx = x1 < x2 ? 1 : -1
  const sy = y1 < y2 ? 1 : -1

  const dx = (x2 - x1) * sx
  const dy = (y2 - y1) * sy

  let d = dy - dx

  let x = x1,
    y = y1

  while (true) {
    points.push({ x, y })

    if (x === x2 && y === y2) break

    const d2 = 2 * d

    if (d2 < dy) {
      d += dy
      x += sx
    }
    if (d2 > -dx) {
      d -= dx
      y += sy
    }
  }

  return points
}
