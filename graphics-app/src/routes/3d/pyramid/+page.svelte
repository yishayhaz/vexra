<script lang="ts">
  import { Board, drawMesh, pyramidMesh, xRotationMatrix, yRotationMatrix, zRotationMatrix } from '../../../vexra';
  import { onMount } from 'svelte'

  const WIDTH = 600;
  const HEIGHT = 600;

  const board = new Board(WIDTH, HEIGHT);

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get 2d context');
    }

    let counter = 0

    setInterval(() => {
      board.reset()
      counter+=0.02
      drawMesh(pyramidMesh, board, (a, b, c) => {
        const xRotationMat = xRotationMatrix(counter)
        const yRotationMat = yRotationMatrix(counter)
        const zRotationMat = zRotationMatrix(counter)

        return [
          yRotationMat.multiplyVec3(xRotationMat.multiplyVec3(zRotationMat.multiplyVec3(a))),
          yRotationMat.multiplyVec3(xRotationMat.multiplyVec3(zRotationMat.multiplyVec3(b))),
          yRotationMat.multiplyVec3(xRotationMat.multiplyVec3(zRotationMat.multiplyVec3(c)))
        ]
      })

      ctx.clearRect(0, 0, canvas?.width, canvas?.height)

      for (let y = 0; y<HEIGHT; y++) {
        for (let x = 0; x<WIDTH; x++) {
          if (board.matrix[y][x] === 1) {
            ctx.fillStyle = 'black';
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }
    }, 10)
  })
</script>

<title>vexra | 3D Pyramid</title>
<canvas width={WIDTH} height={HEIGHT} bind:this={canvas}></canvas>