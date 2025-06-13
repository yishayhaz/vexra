import type { Vec3 } from "../types.ts"

type Matrix4x4M = [
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number],
  [number, number, number, number]
]

const defaultMatrix4x4 = (): Matrix4x4M => [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]

export class Matrix4x4 {
  m: Matrix4x4M

  constructor(value?: Matrix4x4M) {
    this.m = value ?? defaultMatrix4x4()
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

  multiplyMatrices(a: Matrix4x4M) {
    const result = defaultMatrix4x4()
    for (let x = 0; x < 4; x++) {
      for (let y = 0; y < 4; y++) {
        let v = 0
        for (let k = 0; k < 4; k++) {
          v += this.m[x][k] * a[k][y]
        }
        result[x][y] = v
      }
    }

    this.m = result

    return this
  }
}
