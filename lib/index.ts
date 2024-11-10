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
    console.log(`Drawing line from ${x1},${y1} to ${x2},${y2}`);

    const w = x2 - x1;
    const h = y2 - y1;

    let dx1 = 0,
      dy1 = 0,
      dx2 = 0,
      dy2 = 0;

    if (w < 0) dx1 = -1;
    else if (w > 0) dx1 = 1;
    if (h < 0) dy1 = -1;
    else if (h > 0) dy1 = 1;
    if (w < 0) dx2 = -1;
    else if (w > 0) dx2 = 1;

    let longest = Math.abs(w),
      shortest = Math.abs(h);

    if (longest <= shortest) {
      longest = Math.abs(h);
      shortest = Math.abs(w);

      dx2 = 0;
      if (h < 0) dy2 = -1;
      else if (h > 0) dy2 = 1;
    }

    let numerator = longest >> 1;

    for (let i = 0; i <= longest; i++) {
      this.setPixel(x1, y1, value);
      numerator += shortest;
      if (!(numerator < longest)) {
        numerator -= longest;
        x1 += dx1;
        y1 += dy1;
      } else {
        x1 += dx2;
        y1 += dy2;
      }
    }
  }

  polygon(x: number, y: number, radius: number, dots: number, value: number) {
    if (dots < 3) return;

    x += radius;
    y += radius;

    const points: [number, number][] = [];

    for (let i = 0; i < dots; i++) {
      const angle = (2 * Math.PI * i) / dots;

      const px = x + Math.trunc(radius * Math.cos(angle));
      const py = y + Math.trunc(radius * Math.sin(angle));

      points[i] = [px, py];

      if (i > 0) {
        const fromP = points[i - 1];
        this.line(fromP[0], fromP[1], px, py, value);
      }
    }

    const p1 = points[0];
    const p2 = points[points.length - 1];
    this.line(p1[0], p1[1], p2[0], p2[1], value);
  }

  print() {
    for (const row of this.matrix) {
      console.log(row.join(" ").replaceAll("1", "·").replaceAll("0", " "));
    }
  }
}
