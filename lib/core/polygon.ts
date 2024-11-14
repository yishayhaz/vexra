import { line } from "./line"
import type { Point } from "../types"

export const polygon = (
  x: number,
  y: number,
  radius: number,
  dots: number
): Point[] => {
  if (dots < 3) return []

  const vertices: Point[] = [{ x: x + radius, y }]

  for (let i = 0; i < dots; i++) {
    const angle = (2 * Math.PI * i) / dots
    const vx = x + Math.round(radius * Math.cos(angle))
    const vy = y + Math.round(radius * Math.sin(angle))

    if (i >= 1) {
      vertices.push(
        ...line(
          {
            x: vertices[vertices.length - 1].x,
            y: vertices[vertices.length - 1].y,
          },
          {
            x: vx,
            y: vy,
          }
        )
      )
    }

    if (i === dots - 1) {
      vertices.push(
        ...line(
          {
            x: vx,
            y: vy,
          },
          { x: vertices[0].x, y: vertices[0].y }
        )
      )
    }
  }

  return vertices
}
