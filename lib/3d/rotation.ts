import { Matrix4x4 } from "./matrix4x4.ts"

type RotationMatrixArgs = {
  /** Degrees */
  theta: number
}

export const xRotationMatrix = ({ theta }: RotationMatrixArgs) => {
  const m = new Matrix4x4()

  m.m[0][0] = 1
  m.m[1][1] = Math.cos(theta * 0.5)
  m.m[1][2] = Math.sin(theta * 0.5)
  m.m[2][1] = -Math.sin(theta * 0.5)
  m.m[2][2] = Math.cos(theta * 0.5)
  m.m[3][3] = 1

  return m
}

export const zRotationMatrix = ({ theta }: RotationMatrixArgs) => {
  const m = new Matrix4x4()

  m.m[0][0] = Math.cos(theta)
  m.m[0][1] = Math.sin(theta)
  m.m[1][0] = -Math.sin(theta)
  m.m[1][1] = Math.cos(theta)
  m.m[2][2] = 1
  m.m[3][3] = 1

  return m
}
