# GraphicsWindow

## new GraphicsWindow

```cs
  GraphicsWindow window = new GraphicsWindow(width, height);
```

## Paint

After finishing drawing, you need to call the Paint method to display the drawing on the screen.

```cs
  window.Paint();
```

## Line

Display a line on the screen.

```cs
  window.Line(x1, y1, x2, y2, color);
```

## Square

Display a square on the screen.
Basically displaying 4 lines.

x and y are the center of the square.

```cs
  window.Square(x, y, size, color);
```

## Polygon

Display a polygon on the screen.
x and y are the center of the polygon.

```cs
  window.Polygon(x, y, size, dots, color);
```
