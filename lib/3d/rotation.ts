import type { Vec3 } from "../types.ts"
import { Matrix4x4 } from "./matrix4x4.ts"

export const rotationMatrix = ({ x, y, z }: Vec3) =>
  new Matrix4x4(xRotationMatrix(x).m)
    .multiplyMatrices(yRotationMatrix(y).m)
    .multiplyMatrices(zRotationMatrix(z).m)

export const xRotationMatrix = (x: number) => {
  const m = new Matrix4x4()

  m.m[0][0] = 1
  m.m[1][1] = Math.cos(x)
  m.m[1][2] = Math.sin(x)
  m.m[2][1] = -Math.sin(x)
  m.m[2][2] = Math.cos(x)
  m.m[3][3] = 1

  return m
}

export const yRotationMatrix = (y: number) => {
  const m = new Matrix4x4()

  m.m[0][0] = Math.cos(y)
  m.m[0][2] = Math.sin(y)
  m.m[2][0] = -Math.sin(y)
  m.m[2][2] = Math.cos(y)
  m.m[1][1] = 1
  m.m[3][3] = 1

  return m
}

export const zRotationMatrix = (z: number) => {
  const m = new Matrix4x4()

  m.m[0][0] = Math.cos(z)
  m.m[0][1] = Math.sin(z)
  m.m[1][0] = -Math.sin(z)
  m.m[1][1] = Math.cos(z)
  m.m[2][2] = 1
  m.m[3][3] = 1

  return m
}
