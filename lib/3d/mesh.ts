import type { Face, Vec3 } from "../types.ts"

export class Mesh {
  vertices: Vec3[]
  faces: Face[]

  constructor(vertices: Vec3[], faces: Face[]) {
    this.vertices = vertices
    this.faces = faces
  }
}
