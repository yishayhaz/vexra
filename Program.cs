public class Program
{
  [STAThread]
  public static void Main()
  {
    GraphicsWindow window = new GraphicsWindow(600, 600);

    window.Line(0, 0, 600, 600, Color.Red);

    window.Rectangle(300, 300, 100, 100, Color.Blue);

    window.Line(0, 600, 600, 0, Color.Red);

    window.Polygon(300, 300, 50, 50, Color.Purple);

    window.Paint();
  }
}