public class Shapes
{
  public static void SetPixel(Bitmap canvas, int x, int y, Color color)
  {
    bool InBounds = x >= 0 && x < canvas.Size.Width && y >= 0 && y < canvas.Size.Height;

    if (InBounds) canvas.SetPixel(x, y, color);
  }

  public static void Line(Bitmap canvas, int x1, int y1, int x2, int y2, Color color)
  {
    int w = x2 - x1;
    int h = y2 - y1;

    int dx1 = 0, dy1 = 0, dx2 = 0, dy2 = 0;

    if (w < 0) dx1 = -1; else if (w > 0) dx1 = 1;
    if (h < 0) dy1 = -1; else if (h > 0) dy1 = 1;
    if (w < 0) dx2 = -1; else if (w > 0) dx2 = 1;

    int longest = Math.Abs(w), shortest = Math.Abs(h);

    if (longest <= shortest)
    {
      longest = Math.Abs(h); shortest = Math.Abs(w);

      dx2 = 0; if (h < 0) dy2 = -1; else if (h > 0) dy2 = 1;
    }

    int numerator = longest >> 1;

    for (int i = 0; i <= longest; i++)
    {
      SetPixel(canvas, x1, y1, color);
      numerator += shortest;
      if (!(numerator < longest))
      {
        numerator -= longest;
        x1 += dx1;
        y1 += dy1;
      }
      else
      {
        x1 += dx2;
        y1 += dy2;
      }
    }
  }

  public static void Rectangle(Bitmap canvas, int x, int y, int width, int height, Color color)
  {
    // t,l -> t,r
    Line(canvas, x, y, x + width, y, color);
    // t,l -> b,l
    Line(canvas, x + width, y, x + width, y + height, color);
    // b,l, -> b,r
    Line(canvas, x + width, y + height, x, y + height, color);
    // b,l, -> t,l
    Line(canvas, x, y + height, x, y, color);
  }

  public static void Polygon(Bitmap canvas, int x, int y, int radius, int dots, Color color)
  {
    if (dots < 3) return;

    x += radius;
    y += radius;

    Point[] points = new Point[dots];

    for (int i = 0; i < dots; i++)
    {
      double angle = 2 * Math.PI * i / dots;

      int px = x + (int)(radius * Math.Cos(angle));
      int py = y + (int)(radius * Math.Sin(angle));

      points[i] = new Point(px, py);

      if (i > 0)
      {
        Point fromP = points[i - 1];
        Line(canvas, fromP.X, fromP.Y, px, py, color);
      }
    }

    Point p1 = points[0];
    Point p2 = points[points.Length - 1];
    Line(canvas, p1.X, p1.Y, p2.X, p2.Y, color);
  }
}