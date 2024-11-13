export class Board {
  matrix: number[][];

  get width() {
    return this.matrix[0].length;
  }

  get height() {
    return this.matrix.length;
  }

  constructor(width: number, height: number) {
    this.matrix = Array.from({ length: height }, () => Array(width).fill(0));
  }

  setPixel(x: number, y: number, value: number) {
    if (x < 0 || x >= this.width || y < 0 || y >= this.height)
      throw new Error(
        `Coordinates ${x}, ${y} are out of bounds for a bitmap of size ${this.width}x${this.height}`
      );

    this.matrix[y][x] = value;
  }

  line(x1: number, y1: number, x2: number, y2: number, value: number) {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);

    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;

    let d = dx - dy;

    let x = x1,
      y = y1;
    while (true) {
      this.setPixel(x, y, value);

      if (x === x2 && y === y2) break;

      const d2 = 2 * d;

      if (d2 > -dy) {
        d -= dy;
        x += sx;
      }
      if (d2 < dx) {
        d += dx;
        y += sy;
      }
    }
  }

  polygon(x: number, y: number, radius: number, dots: number, value: number) {
    if (dots < 3) return;

    const firstPoint = { x: x + radius, y };
    let point = firstPoint;

    for (let i = 0; i < dots; i++) {
      const angle = (2 * Math.PI * i) / dots;
      const vx = x + Math.round(radius * Math.cos(angle));
      const vy = y + Math.round(radius * Math.sin(angle));

      if (i >= 1) {
        this.line(point.x, point.y, vx, vy, value);
      }

      if (i === dots - 1) {
        this.line(firstPoint.x, firstPoint.y, vx, vy, value);
      }

      point = { x: vx, y: vy };
    }
  }

  print() {
    console.log(this.matrix);
  }
}
