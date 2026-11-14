import useAnimatedCanvas, { type CanvasDraw } from "@/hooks/use-animated-canvas";

// Hero background: a slow ribbon of fine sound-wave lines drawn on a canvas.
// No video or image files. The shared canvas loop keeps it light while scrolling.

const LINES = 80;

const draw: CanvasDraw = (ctx, width, height, t) => {
  ctx.globalCompositeOperation = "lighter";
  const mobile = width < 640;
  const cy = height * (mobile ? 0.42 : 0.46);
  const amp = height * (mobile ? 0.16 : 0.2);
  const step = Math.max(6, width / 200);
  ctx.lineWidth = 0.8;

  for (let i = 0; i < LINES; i++) {
    const p = i / (LINES - 1); // 0..1 across the ribbon
    const phase = p * Math.PI * 1.6;
    // Brighter in the middle of the ribbon, fading to the edges.
    const glow = Math.sin(p * Math.PI);
    const alpha = 0.042 + glow * 0.13;
    // Mostly white, with a faint green tint toward the centre lines.
    const g = Math.round(255 - glow * 20);
    const rb = Math.round(255 - glow * 70);
    ctx.strokeStyle = `rgba(${rb},${g},${rb},${alpha})`;
    ctx.beginPath();
    for (let x = -step; x <= width + step; x += step) {
      const u = x / width;
      // Envelope: quiet at the far left, swelling toward the right like a waveform.
      const env = 0.25 + 0.75 * Math.pow(Math.sin(Math.min(1, u * 1.05) * Math.PI * 0.92), 1.4);
      const y =
        cy +
        amp * env * Math.sin(u * 5.2 + t * 0.35 + phase) +
        amp * 0.35 * env * Math.sin(u * 11.5 - t * 0.22 + phase * 1.7) +
        (p - 0.5) * height * 0.07 * (1 - env * 0.6);
      if (x === -step) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  ctx.globalCompositeOperation = "source-over";
};

export default function WaveBackground({ className = "" }: { className?: string }) {
  const ref = useAnimatedCanvas(draw, { start: 7, speed: 0.72 });
  return <canvas ref={ref} aria-hidden="true" className={`absolute inset-0 h-full w-full ${className}`} />;
}
