import { Mesh } from "./mesh.ts"

export const cubeMesh = new Mesh(
  [
    { x: -1, y: -1, z: -1 }, // 0
    { x: 1, y: -1, z: -1 }, // 1
    { x: 1, y: 1, z: -1 }, // 2
    { x: -1, y: 1, z: -1 }, // 3
    { x: -1, y: -1, z: 1 }, // 4
    { x: 1, y: -1, z: 1 }, // 5
    { x: 1, y: 1, z: 1 }, // 6
    { x: -1, y: 1, z: 1 }, // 7
  ],
  [
    [0, 1, 2],
    [0, 2, 3], // back
    [4, 5, 6],
    [4, 6, 7], // front
    [0, 1, 5],
    [0, 5, 4], // bottom
    [2, 3, 7],
    [2, 7, 6], // top
    [1, 2, 6],
    [1, 6, 5], // right
    [0, 3, 7],
    [0, 7, 4], // left
  ]
)

export const pyramidMesh = new Mesh(
  [
    { x: -1, y: -1, z: -1 }, // 0 - base bottom-left
    { x: 1, y: -1, z: -1 }, // 1 - base bottom-right
    { x: 1, y: -1, z: 1 }, // 2 - base top-right
    { x: -1, y: -1, z: 1 }, // 3 - base top-left
    { x: 0, y: 1, z: 0 }, // 4 - apex
  ],
  [
    [0, 1, 2],
    [0, 2, 3], // base
    [0, 1, 4], // side 1
    [1, 2, 4], // side 2
    [2, 3, 4], // side 3
    [3, 0, 4], // side 4
  ]
)
