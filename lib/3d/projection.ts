import { Matrix4x4 } from "./matrix4x4.ts"

type PerspectiveProjectionArgs = {
  /** Degrees */
  fov?: number
  /** Aspect Ratio w/h */
  a?: number
  /** Near plane */
  n?: number
  /** Far plane */
  f?: number
}

export const perspectiveProjectionMatrix = ({
  a = 1,
  fov = 90,
  n = 0.1,
  f = 1000,
}: PerspectiveProjectionArgs) => {
  const fovRad = 1 / Math.tan(((fov * 0.5) / 180) * Math.PI)

  const m = new Matrix4x4()

  m.m[0][0] = a * fovRad
  m.m[1][1] = fovRad
  m.m[2][2] = f / (f - n)
  m.m[2][3] = 1
  m.m[3][2] = (-f * n) / (f - n)

  return m
}
