<script lang="ts">
  import { Board } from '$lib';
  import { onMount } from 'svelte'

  const WIDTH = 800;
  const HEIGHT = 600;

  const board = new Board(WIDTH, HEIGHT);

  let canvas: HTMLCanvasElement;

  onMount(() => {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get 2d context');
    }
    
    // This is bobby. be nice to bobby

    // head
    board.polygon(WIDTH / 2, HEIGHT / 4, 100, 64, 1);

    // eyes
    board.polygon(WIDTH / 2 - 40, HEIGHT / 4, 10, 64, 1);
    board.polygon(WIDTH / 2 + 40, HEIGHT / 4, 10, 64, 1);

    // mouth
    board.line(WIDTH / 2 - 40, HEIGHT / 4 + 40, WIDTH / 2 + 40, HEIGHT / 4 + 40, 1);

    // body
    board.line(WIDTH / 2, HEIGHT / 4 + 100, WIDTH / 2, HEIGHT - HEIGHT / 4, 1);

    // arms
    board.line(WIDTH / 2, HEIGHT / 4 + 150, WIDTH / 2 + 100,  HEIGHT / 4 + 150, 1);
    board.line(WIDTH / 2, HEIGHT / 4 + 150, WIDTH / 2 - 100,  HEIGHT / 4 + 150, 1);

    // legs
    board.line(WIDTH / 2, HEIGHT - HEIGHT / 4, WIDTH / 2 + 75,  HEIGHT - HEIGHT / 4 + 75, 1);
    board.line(WIDTH / 2, HEIGHT - HEIGHT / 4, WIDTH / 2 - 75,  HEIGHT - HEIGHT / 4 + 75, 1);

    for (let y = 0; y<=HEIGHT; y++) {
      for (let x = 0; x<=WIDTH; x++) {
        if (board.matrix[y][x] === 1) {
          ctx.fillStyle = 'black';
          ctx.fillRect(x, y, 1, 1);
        }
      }
    }
  })

  
</script>

<canvas width={WIDTH} height={HEIGHT} bind:this={canvas}></canvas>