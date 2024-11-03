using System.Reflection.Metadata;

public class Program
{
  private static System.Windows.Forms.Timer timer;
  private static int frame = 0;
  private static int fps = 1000 / 60;

  private static Form form;
  static Bitmap canvas;

  public static void Main()
  {
    Application.EnableVisualStyles();
    Application.SetCompatibleTextRenderingDefault(false);

    // Create the form
    form = new Form
    {
      Width = 400,
      Height = 200,
      BackColor = Color.White
    };

    canvas = new Bitmap(form.Width, form.Height);

    form.Paint += Paint;

    timer = new System.Windows.Forms.Timer();
    timer.Interval = fps;
    timer.Tick += Tick;
    timer.Start();

    // Run the application
    Application.Run(form);
  }

  private static void Tick(object sender, EventArgs e)
  {
    frame++;
    form.Invalidate();
  }

  private static void Paint(object sender, PaintEventArgs e)
  {
    if (form.Width > frame + 50 * 2)
    {
      Shapes.Polygon(canvas, frame - 1, 0, 50, 50, Color.White);
      Shapes.Polygon(canvas, frame, 0, 50, 50, Color.Black);
    }
    e.Graphics.DrawImage(canvas, 0, 0);
  }
}