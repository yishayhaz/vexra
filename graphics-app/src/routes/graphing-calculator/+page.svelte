<script lang="ts">
  import { Board } from 'vexra';
  import { onMount } from "svelte"

  const WIDTH = 600
  const HEIGHT = 600

  const board = new Board(WIDTH, HEIGHT)

  let canvas: HTMLCanvasElement
  let input: HTMLInputElement

  const handleSubmit = () => {
    drawBoard(input.value)
  }

  const drawBoard = (funcStr = "x**2") => {
    // lol x*0 is here so the bundler won't remove x
    const f = (x: number) => x*0 + eval(funcStr)

    board.reset()

    // cross
    board.line(WIDTH / 2, 0, WIDTH / 2, HEIGHT, 1)
    board.line(0, HEIGHT / 2, WIDTH, HEIGHT / 2, 1)

    // calculate points & lines
    let lastPoint: Vec2 = { x: Infinity, y: Infinity }

    for (let x = 0; x < WIDTH; x++) {
      for (let y = 0; y < HEIGHT; y++) {
        const tX = x - WIDTH / 2
        const tY = HEIGHT - y - HEIGHT / 2
        if (f(tX) === tY) {
          if (lastPoint.x !== Infinity) {
            board.line(lastPoint.x, lastPoint.y, x, y, 2)
          }
          lastPoint = { x, y }
        }
      }
    }

    const ctx = canvas.getContext("2d")

    if (!ctx) {
      throw new Error("Could not get 2d context")
    }

    // paint canvas
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (board.matrix[y][x] > 0) {
          ctx.fillStyle = `rgb(0,${(board.matrix[y][x] - 1) * 200},0)`
          ctx.fillRect(x, y, 1, 1)
        }
      }
    }
  }

  onMount(drawBoard)
</script>

<title>Vexra | Graphing Calculator</title>
<div
  style="display: flex; flex-direction: column; align-items: center; gap: 10px;"
>
  <form on:submit|preventDefault={handleSubmit}>
    <span
    >(x) => <input
      placeholder="x**2"
      autoFocus
      bind:this={input}
    /></span
  >
  </form>
  <canvas width={WIDTH} height={HEIGHT} bind:this={canvas}></canvas>
</div>
