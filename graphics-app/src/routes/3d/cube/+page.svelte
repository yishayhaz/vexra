<script lang="ts">
  import { slide } from 'svelte/transition'
import { Board, drawMesh, cubeMesh, rotationMatrix, type Vec3 } from '../../../vexra';
  import { onMount } from 'svelte'

  const WIDTH = 600;
  const HEIGHT = 600;

  const board = new Board(WIDTH, HEIGHT);

  let canvas: HTMLCanvasElement;

  let rot = $state<Vec3>({ x: 0, y: 0, z: 0 });
  let animate = $state<boolean>(true);

  onMount(() => {
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Could not get 2d context');
    }

    let counter = 0

    setInterval(() => {
      board.reset()
      counter+=0.02
      if (counter > Math.PI * 2) counter = 0;
      drawMesh(cubeMesh, board, (a, b, c) => {
        if (animate) {
          rot = { x: counter , y: counter , z: counter  };
        }

        const rotationMat = rotationMatrix(rot)

        return [
          rotationMat.multiplyVec3(a),
          rotationMat.multiplyVec3(b),
          rotationMat.multiplyVec3(c)
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

  const handleRangeChange = (e: Event, axis: keyof Vec3) => {
    const input = e.target as HTMLInputElement;
    const value = parseFloat(input.value);
    rot = { ...rot, [axis]: value } as Vec3;
  }
</script>

<title>Vexra | 3D Cube</title>
<div>
  <div>
    <label for="x">X</label>
    <input type="range" min="0" max={Math.PI * 2} step="0.01" value={rot.x} oninput={e => handleRangeChange(e, 'x')} />
  </div>
  <div>
    <label for="y">Y</label>
    <input type="range" min="0" max={Math.PI * 2} step="0.01" value={rot.y} oninput={e => handleRangeChange(e, 'y')} />
  </div>
  <div>
    <label for="z">Z</label>
    <input type="range" min="0" max={Math.PI * 2} step="0.01" value={rot.z} oninput={e => handleRangeChange(e, 'z')} />
  </div>
  <button onclick={() => animate = !animate}>Toggle Animation</button>
</div>
<canvas width={WIDTH} height={HEIGHT} bind:this={canvas}></canvas>