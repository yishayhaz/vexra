import { Vec3 } from "../../types.ts"

type Matrix4x4M = [
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number]
]

export class Matrix4x4 {
  m: Matrix4x4M

  constructor(value?: Matrix4x4M) {
    this.m = value ?? [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
  }

  multiplyVec3(i: Vec3): Vec3 {
    const v: Vec3 = {
      x:
        i.x * this.m[0][0] +
        i.y * this.m[1][0] +
        i.z * this.m[2][0] +
        this.m[3][0],
      y:
        i.x * this.m[0][1] +
        i.y * this.m[1][1] +
        i.z * this.m[2][1] +
        this.m[3][1],
      z:
        i.x * this.m[0][2] +
        i.y * this.m[1][2] +
        i.z * this.m[2][2] +
        this.m[3][2],
    }

    const w =
      i.x * this.m[0][3] +
      i.y * this.m[1][3] +
      i.z * this.m[2][3] +
      this.m[3][3]

    if (w != 0) {
      v.x /= w
      v.y /= w
      v.z /= w
    }

    return v
  }
}
