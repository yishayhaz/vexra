export * from "./mesh.ts"
export * from "./board.ts"
export * from "./shapes.ts"

// The next block of code is hard-coded and a temporary proof of concept

import { Board } from "../../board.ts"
import { Matrix4x4 } from "./matrix4x4.ts"
import { Mesh } from "./mesh.ts"

const mat4x4 = new Matrix4x4()
const matRotX = new Matrix4x4()
const matRotZ = new Matrix4x4()

export const drawMesh = (mesh: Mesh, board: Board, theta = 0) => {
  const near = 0.1
  const far = 1000
  const a = board.width / board.height
  const fov = 90 // 90deg
  const fovRad = 1 / Math.tan(((fov * 0.5) / 180.0) * Math.PI)

  mat4x4.m[0][0] = a * fovRad
  mat4x4.m[1][1] = fovRad
  mat4x4.m[2][2] = far / (far - near)
  mat4x4.m[2][3] = 1
  mat4x4.m[3][2] = (-far * near) / (far - near)

  // Rotation Z
  matRotZ.m[0][0] = Math.cos(theta)
  matRotZ.m[0][1] = Math.sin(theta)
  matRotZ.m[1][0] = -Math.sin(theta)
  matRotZ.m[1][1] = Math.cos(theta)
  matRotZ.m[2][2] = 1
  matRotZ.m[3][3] = 1

  // Rotation X
  matRotX.m[0][0] = 1
  matRotX.m[1][1] = Math.cos(theta * 0.5)
  matRotX.m[1][2] = Math.sin(theta * 0.5)
  matRotX.m[2][1] = -Math.sin(theta * 0.5)
  matRotX.m[2][2] = Math.cos(theta * 0.5)
  matRotX.m[3][3] = 1

  for (const face of mesh.faces) {
    let a = matRotZ.multiplyVec3(mesh.vertices[face[0]])
    let b = matRotZ.multiplyVec3(mesh.vertices[face[1]])
    let c = matRotZ.multiplyVec3(mesh.vertices[face[2]])

    a = matRotX.multiplyVec3(a)
    b = matRotX.multiplyVec3(b)
    c = matRotX.multiplyVec3(c)

    a.z += 5
    b.z += 5
    c.z += 5

    a = mat4x4.multiplyVec3(a)
    b = mat4x4.multiplyVec3(b)
    c = mat4x4.multiplyVec3(c)

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
