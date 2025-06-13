export * from "./board.ts"
export * from "./mesh.ts"
export * from "./projection.ts"
export * from "./rotation.ts"
export * from "./shapes.ts"

// The next block of code is hard-coded and a temporary proof of concept

import { Board } from "../board.ts"
import { type Vec3 } from "../types.ts"
import { Mesh } from "./mesh.ts"
import { perspectiveProjectionMatrix } from "./projection.ts"

export const drawMesh = (
  mesh: Mesh,
  board: Board,
  transform: (a: Vec3, b: Vec3, c: Vec3) => [Vec3, Vec3, Vec3]
) => {
  const projectionMatrix = perspectiveProjectionMatrix({
    a: board.width / board.height,
  })

  for (const face of mesh.faces) {
    let [a, b, c] = transform(
      mesh.vertices[face[0]],
      mesh.vertices[face[1]],
      mesh.vertices[face[2]]
    )

    a.z += 5
    b.z += 5
    c.z += 5

    a = projectionMatrix.multiplyVec3(a)
    b = projectionMatrix.multiplyVec3(b)
    c = projectionMatrix.multiplyVec3(c)

    a.x += 1
    a.y += 1
    b.x += 1
    b.y += 1
    c.x += 1
    c.y += 1

    a.x = Math.round(a.x * (0.5 * board.width))
    a.y = Math.round(a.y * (0.5 * board.height))
    b.x = Math.round(b.x * (0.5 * board.width))
    b.y = Math.round(b.y * (0.5 * board.height))
    c.x = Math.round(c.x * (0.5 * board.width))
    c.y = Math.round(c.y * (0.5 * board.height))

    board.triangle(a, b, c, 1)
  }
}
