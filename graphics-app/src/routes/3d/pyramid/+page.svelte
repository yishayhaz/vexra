<script lang="ts">
  import { Board, drawMesh, pyramidMesh } from '../../../vexra';
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

    let c = 0

    setInterval(() => {
      board.reset()
      drawMesh(pyramidMesh, board, c+=0.02)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

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