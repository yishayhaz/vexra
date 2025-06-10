import { line } from "./line.ts"
import type { Vec2 } from "../types.ts"

export const polygon = (
  x: number,
  y: number,
  radius: number,
  dots: number
): Vec2[] => {
  if (dots < 3) return []

  const points: Vec2[] = [{ x: x + radius, y }]

  for (let i = 0; i < dots; i++) {
    const angle = (2 * Math.PI * i) / dots
    const vx = x + Math.round(radius * Math.cos(angle))
    const vy = y + Math.round(radius * Math.sin(angle))

    if (i >= 1) {
      points.push(
        ...line(
          {
            x: points[points.length - 1].x,
            y: points[points.length - 1].y,
          },
          {
            x: vx,
            y: vy,
          }
        )
      )
    }

    if (i === dots - 1) {
      points.push(
        ...line(
          {
            x: vx,
            y: vy,
          },
          { x: points[0].x, y: points[0].y }
        )
      )
    }
  }

  return points
}
